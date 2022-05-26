import { ComponentInterface } from "../interfaces/component-interface";

export function getSelector(component: ComponentInterface): string {
    return component.selector || '';
}
