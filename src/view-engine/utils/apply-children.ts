import { HyperscriptInterface } from "../../interfaces/hyperscript.interface";
import { createWatcher } from "../../utils/create-watcher";
import { ViewEngine } from "../view-engine";
import { buildTextNode } from "./build-text-node";

export function applyChildren(element: HTMLElement, children: (HyperscriptInterface | string | (() => any))[], viewEngine: ViewEngine) {
    children.forEach(child => {
        switch(typeof child) {
            case 'string':
                element.appendChild(buildTextNode(child));
            break;
            case 'function':
                const value = child();
                const textNode = buildTextNode(value);
                element.appendChild(textNode);
                createWatcher(() => child(), element, viewEngine.componentWrapperInstance, newValue => textNode.nodeValue = newValue);
            break;
            case 'object':
                element.appendChild(viewEngine.buildElement(child));
            break;
        }
    });
}
