import { ComponentInterface } from "../interfaces/component-interface";
import { Component } from "./component.decorator";

export function ShadowComponent(selector: string, mode: ShadowRootMode = 'open', superClass: CustomElementConstructor = HTMLElement) {
    return function(target: ComponentInterface) {
        target.shadowMode = mode;
        Component(selector, superClass)(target);
    }
}