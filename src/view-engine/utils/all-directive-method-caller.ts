import { AllDirectivesArgInterface } from "../../interfaces/all-directives-arg.interface";
import { ObjectInterface } from "../../interfaces/object.interface";
import { ViewEngine } from "../view-engine";

export function allDirectiveMethodCaller(
    directive: ObjectInterface<{ get: () => any, set?: (val?: any) => void; }>,
    instance: any,
    viewEngine: ViewEngine,
    element: HTMLElement
) {
    const param: AllDirectivesArgInterface = {
        element,
        directives: directive,
        component: viewEngine.componentWrapperInstance.componentInstance
    };
    const method = `allDirectives`;
    if (instance[method] && typeof instance[method] === 'function') {
        instance[method](param);
    }
}