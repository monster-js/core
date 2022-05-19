import { ChangeDetection } from "../change-detection/change-detection";
import { AttributeTypeEnum } from "../enums/attribute-type.enum";
import { HooksEnum } from "../enums/hooks.enum";
import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";
import { ComponentInterface } from "../interfaces/component-interface";
import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";
import { ObjectInterface } from "../interfaces/object.interface";
import { PipeInterface } from "../interfaces/pipe.interface";
import { kebabToCamel } from "../utils/kebab-to-camel";
import { setGetterProp } from "../utils/set-getter-prop";
import { ViewEngine } from "../view-engine/view-engine";
import { applyChangeDetection } from "./utils/apply-change-detection";
import { autoResolveComponent } from "./utils/auto-resolve-component";

export function componentFactory(component: ComponentInterface) {
    return class extends (component.superClass || HTMLElement) implements ComponentWrapperInstanceInterface {

        public componentInstance: ComponentInstanceInterface = null!;
        public component: ComponentInterface = component;
        public changeDetectionTracker: number = 0;
        public changeDetection: ChangeDetection = new ChangeDetection(this);
        public isMonsterComponent: boolean = true;

        public runningHooks: ObjectInterface<boolean> = {};
        public hooksWatchers: ObjectInterface<Function[]> = {};

        constructor() {
            super();
        }

        public pipe(selector: string, value: any, args: any[]) {
            const pipes: ObjectInterface<PipeInterface> = this.component.pipes!;
            const pipe = pipes[selector];
            const instance = new pipe();
            return instance.transform(value, args);
        }

        public addHookWatcher(type: HooksEnum, callback: Function): void {
            if (!this.hooksWatchers[type]) {
                this.hooksWatchers[type] = [];
            }
            this.hooksWatchers[type].push(callback);
        }

        public buildComponent() {
            const viewEngine = new ViewEngine(this);
            this.componentInstance = autoResolveComponent(this.component);
            applyChangeDetection(this.componentInstance, this);
            setGetterProp(this.componentInstance, '$wrapper', () => this);
            this.hooksCaller(HooksEnum.onInit);
            this.hooksCaller(HooksEnum.beforeViewInit);
            this.appendChild(viewEngine.doBuildElement(this.componentInstance.render()));
            this.hooksCaller(HooksEnum.afterViewInit);
            this.changeDetection.connected();
        }

        static get observedAttributes() {
            return component.observedAttributesArray || [];
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
            const observedAttributesObject: {[key: string]: AttributeTypeEnum} = component.observedAttributesObject || {};
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

            const instance: ObjectInterface = this.component;
            instance[camelCaseName] = convertedNewValue;
            this.hooksCaller(HooksEnum.attributeChangedCallback, [name, convertedOldValue, convertedNewValue, camelCaseName]);
        }
    }
}