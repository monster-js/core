import { DirectiveArgInterface } from "../../interfaces/directive-arg.interface";
import { kebabToCamel } from "../../utils/kebab-to-camel";
import { ViewEngine } from "../view-engine";

export function directiveMethodCaller(
    key: string,
    directive: { get: () => any, set?: (val?: any) => void; },
    instance: any,
    viewEngine: ViewEngine,
    element: HTMLElement
) {
    const param: DirectiveArgInterface = {
        element,
        directive,
        component: viewEngine.componentWrapperInstance.componentInstance
    };
    const method = `$${kebabToCamel(key)}`;
    if (instance[method] && typeof instance[method] === 'function') {
        instance[method](param);
    }
}