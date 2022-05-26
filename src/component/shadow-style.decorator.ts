import { ComponentInterface } from "../interfaces/component-interface";

export function ShadowStyle(style: string) {
    return function(target: ComponentInterface) {
        target.shadowStyle = style;
    }
}
