import { ChangeDetection } from "../change-detection/change-detection";
import { Container } from "../dependency-injection/container";
import { AttributeTypeEnum } from "../enums/attribute-type.enum";
import { HooksEnum } from "../enums/hooks.enum";
import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";
import { ComponentInterface } from "../interfaces/component-interface";
import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";
import { ObjectInterface } from "../interfaces/object.interface";
import { PipeInterface } from "../interfaces/pipe.interface";
import { errorHandler } from "../utils/error-handler";
import { kebabToCamel } from "../utils/kebab-to-camel";
import { setGetterProp } from "../utils/set-getter-prop";
import { ViewEngine } from "../view-engine/view-engine";
import { applyChangeDetection } from "./utils/apply-change-detection";
import { autoResolveComponent } from "./utils/auto-resolve-component";

export function componentFactory(component: ComponentInterface) {

    let isHooksComponent: boolean = false;
    let formattedComponent: ComponentInterface;
    if (!component.prototype.render) {
        isHooksComponent = true;
        formattedComponent = class {
            public static inject = component.inject;
            public static shadowMode = component.shadowMode;
            public static shadowStyle = component.shadowStyle;
            public static isMonsterComponent = component.isMonsterComponent;
            public static selector = component.selector;
            public static superClass = component.superClass;
            public static directives = component.directives;
            public static pipes = component.pipes;
            public static dataSource = component.dataSource;
            public static services = component.services;
            public static observedAttributesArray = component.observedAttributesArray;
            public static observedAttributesObject = component.observedAttributesObject;
            public static definedComponents = component.definedComponents;
            render = component as any;
        };
    } else {
        formattedComponent = component;
    }

    return class extends (formattedComponent.superClass || HTMLElement) implements ComponentWrapperInstanceInterface {

        public componentInstance: ComponentInstanceInterface = null!;
        public component: ComponentInterface = formattedComponent;
        public changeDetectionTracker: number = 0;
        public changeDetection: ChangeDetection = new ChangeDetection(this);
        public isMonsterComponent: boolean = true;

        public runningHooks: ObjectInterface<boolean> = {};
        public hooksWatchers: ObjectInterface<Function[]> = {};

        public initialObservedAttributeValue: ObjectInterface = {};

        constructor() {
            super();
        }

        public pipe(selector: string, value: any, args: any[]) {
            const pipes: ObjectInterface<PipeInterface> = this.component.pipes!;
            const pipe = pipes[selector];
            if (!pipe) {
                errorHandler(`The pipe ${selector} is not found in ${this.component.name} component. Register the pipe in the component or in module before you can use it.`);
            }
            const di = new Container(this.component.dataSource!);
            return di.resolve(pipe).transform(value, args);
        }

        public addHookWatcher(type: HooksEnum, callback: Function): void {
            if (!this.hooksWatchers[type]) {
                this.hooksWatchers[type] = [];
            }
            this.hooksWatchers[type].push(callback);
        }

        /**
         * Resolve injections for functional components
         */
        public resolveInjections(): ObjectInterface {
            const injections: ObjectInterface = {};
            const di = new Container(formattedComponent.dataSource!);
            for (const key in formattedComponent.inject) {
                injections[key] = di.resolve(formattedComponent.inject[key], this.componentInstance);
            }
            return injections;
        }

        public buildComponent() {
            let renderedData;
            const viewEngine = new ViewEngine(this);
            this.setupComponent();

            if (isHooksComponent) {
                renderedData = this.componentInstance.render(this.resolveInjections());
            }

            this.hooksCaller(HooksEnum.onInit);
            this.hooksCaller(HooksEnum.beforeViewInit);
            this.appendElement(viewEngine.doBuildElement(renderedData || this.componentInstance.render()));
            this.hooksCaller(HooksEnum.afterViewInit);
            this.changeDetection.connected();
        }

        public appendElement(element: HTMLElement) {
            let root: HTMLElement | ShadowRoot = this;
            if (this.component.shadowMode) {
                root = this.attachShadow({ mode: this.component.shadowMode });
                this.applyShadowStyle(root);
            }
            root.appendChild(element);
        }

        public applyShadowStyle(root: ShadowRoot) {
            if (this.component.shadowStyle) {
                const style = document.createElement('style');
                style.innerHTML = this.component.shadowStyle;
                root.appendChild(style);
            }
        }

        public setupComponent() {
            this.componentInstance = autoResolveComponent(this.component);
            this.applyInitialObservedAttributeValue();
            applyChangeDetection(this.componentInstance, this);
            setGetterProp(this.componentInstance, '$wrapper', () => this);
        }

        static get observedAttributes() {
            return formattedComponent.observedAttributesArray || [];
        }

        public hooksCaller(type: HooksEnum, args: any[] = []) {
            if (this.runningHooks[type]) {
                return;
            }
            this.runningHooks[type] = true;

            const instance: ObjectInterface = this.componentInstance;
            if (instance[type]) {
                instance[type]?.bind(instance)(...args);
            }

            (this.hooksWatchers[type] || []).forEach(item => item());

            this.runningHooks[type] = false;
        }

        connectedCallback() {
            this.buildComponent();
            this.hooksCaller(HooksEnum.connectedCallback);
        }

        disconnectedCallback() {
            this.hooksCaller(HooksEnum.onDestroy);
            this.hooksCaller(HooksEnum.disconnectedCallback);
        }

        adoptedCallback() {
            this.hooksCaller(HooksEnum.adoptedCallback);
        }

        attributeChangedCallback(name: string, oldValue: any, newValue: any): void {
            const observedAttributesObject: {[key: string]: AttributeTypeEnum} = formattedComponent.observedAttributesObject || {};
            const camelCaseName = kebabToCamel(name);
            let convertedNewValue: any;
            let convertedOldValue: any;

            switch(observedAttributesObject[name]) {
                case AttributeTypeEnum.normal: {
                    convertedNewValue = newValue;
                    convertedOldValue = oldValue;
                    break;
                }
                case AttributeTypeEnum.boolean: {
                    convertedNewValue = Boolean(JSON.parse(newValue));
                    convertedOldValue = Boolean(JSON.parse(oldValue));
                    break;
                }
                case AttributeTypeEnum.number: {
                    convertedNewValue = Number(newValue);
                    convertedOldValue = Number(oldValue);
                    break;
                }
            }

            if (this.componentInstance) {
                const instance: ObjectInterface = this.componentInstance;
                instance[camelCaseName] = convertedNewValue;
                this.hooksCaller(HooksEnum.attributeChangedCallback, [name, convertedOldValue, convertedNewValue, camelCaseName]);
            } else {
                this.initialObservedAttributeValue[camelCaseName] = convertedNewValue;
            }
        }

        public applyInitialObservedAttributeValue() {
            const instance: ObjectInterface = this.componentInstance;
            for (const key in this.initialObservedAttributeValue) {
                instance[key] = this.initialObservedAttributeValue[key];
            }
        }
    }
}