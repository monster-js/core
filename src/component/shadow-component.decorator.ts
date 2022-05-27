import { ComponentInterface } from "../interfaces/component-interface";
import { Component } from "./component.decorator";

export function ShadowComponent(selector: string, mode: ShadowRootMode = 'open') {
    return function(target: ComponentInterface) {
        target.shadowMode = mode;
        Component(selector)(target);
    }
}
