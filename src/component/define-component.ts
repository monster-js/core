import { ComponentInterface } from "../interfaces/component-interface";
import { getSelector } from "../utils/get-selector";

export function defineComponent(component: ComponentInterface) {
    const options = component.extendsLocalName ? { extends: component.extendsLocalName }  : {};
    customElements.define(getSelector(component), component as any, options)
}
