import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";

export function elementToWrapper(element: HTMLElement): ComponentWrapperInstanceInterface {
    return element as any;
}