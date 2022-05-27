import { ComponentInterface } from "../interfaces/component-interface";

export function CustomElement(superClass: CustomElementConstructor, localName: string) {
    return function(target: ComponentInterface) {
        target.superClass = superClass;
        target.extendsLocalName = localName;
    }
}
