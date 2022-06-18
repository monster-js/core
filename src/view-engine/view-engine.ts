import { BaseComponent } from "../component/base-component";
import { GlobalComponents } from "../component/global-components";
import { HyperscriptTypeEnum } from "../enums/hyperscript-type.enum";
import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";
import { HyperscriptInterface } from "../interfaces/hyperscript.interface";
import { applyAttributes } from "./utils/apply-attributes";
import { applyChildren } from "./utils/apply-children";
import { applyDirectives } from "./utils/apply-directives";
import { applyFor } from "./utils/apply-for";
import { applyIf } from "./utils/apply-if";

export class ViewEngine {

    public componentWrapperInstance: ComponentWrapperInstanceInterface;
    private applyDirectiveCallbacks: Function[] = [];

    constructor(componentWrapperInstance: ComponentWrapperInstanceInterface) {
        this.componentWrapperInstance = componentWrapperInstance;
    }

    public doBuildElement(hs: HyperscriptInterface) {
        const element = this.buildElement(hs);
        this.applyDirectiveCallbacks.forEach(item => item());
        return element;
    }

    public buildElement(hs: HyperscriptInterface): HTMLElement {

        let element: HTMLElement = null!;

        if (hs.type === HyperscriptTypeEnum.if) {
            element = applyIf(hs, this.componentWrapperInstance) as unknown as HTMLElement;
        }

        if (hs.type === HyperscriptTypeEnum.for) {
            element = applyFor(hs, this.componentWrapperInstance) as unknown as HTMLElement;
        }

        if (hs.name) {
            if (hs.name.indexOf('-') > 0) {
                // TODO : improve code readability
                const { definedComponents } = this.componentWrapperInstance.component;
                const componentInstance: BaseComponent = this.componentWrapperInstance.componentInstance as any;
                if (!definedComponents!.components[hs.name] && !(componentInstance.$definedComponents?.components || {})[hs.name]) {
                    const global = new GlobalComponents();
                    if (!global.get(hs.name)) {
                        throw `The component '${hs.name}' is not defined in ${definedComponents!.name} and is not defined as a global component.`;
                    }
                }
            }
            if (hs.name === 'fragment') {
                element = document.createDocumentFragment() as unknown as HTMLElement;
                applyChildren(element, hs.children || [], this);
            } else {
                const attributes = hs.attributes || {};
                if (attributes.is) {
                    element = document.createElement(hs.name, { is: attributes.is as any });
                } else {
                    element = document.createElement(hs.name);
                }
                applyAttributes(element, attributes, this.componentWrapperInstance);
                applyChildren(element, hs.children || [], this);
                this.applyDirectiveCallbacks.push(() => applyDirectives(element, hs.directives || {}, this));
            }
            return element;
        }

        return element;
    }
}
