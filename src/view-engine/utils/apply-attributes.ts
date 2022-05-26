import { ComponentWrapperInstanceInterface } from "../../interfaces/component-wrapper-instance.interface";
import { ObjectInterface } from "../../interfaces/object.interface";
import { camelToKebab } from "../../utils/camel-to-kebab";
import { createWatcher } from "../../utils/create-watcher";

export function applyAttributes(
    element: HTMLElement,
    attributes: ObjectInterface<string | (() => any)>,
    iComponentWrapper: ComponentWrapperInstanceInterface
) {
    for(const originalKey in attributes) {
        const attribute = attributes[originalKey];
        // TODO : find a way to set this kebab and camel during transformation
        const key = camelToKebab(originalKey);
        if (typeof attribute === 'string') {
            element.setAttribute(key, attribute);
        } else {
            let value = attribute();
            element.setAttribute(key, value);
            createWatcher(() => attribute(), element, iComponentWrapper, newValue => element.setAttribute(key, newValue));
        }
    }
}
