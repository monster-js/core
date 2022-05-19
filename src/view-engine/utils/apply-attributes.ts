import { ComponentWrapperInstanceInterface } from "../../interfaces/component-wrapper-instance.interface";
import { ObjectInterface } from "../../interfaces/object.interface";
import { createWatcher } from "../../utils/create-watcher";

export function applyAttributes(
    element: HTMLElement,
    attributes: ObjectInterface<string | (() => any)>,
    iComponentWrapper: ComponentWrapperInstanceInterface
) {
    for(const key in attributes) {
        const attribute = attributes[key];
        if (typeof attribute === 'string') {
            element.setAttribute(key, attribute);
        } else {
            let value = attribute();
            element.setAttribute(key, value);
            createWatcher(() => attribute(), element, iComponentWrapper, newValue => element.setAttribute(key, newValue));
        }
    }
}
