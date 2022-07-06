import { fromEvent } from "rxjs";
import { AllDirectivesArgInterface } from "../interfaces/all-directives-arg.interface";
import { AllDirectivesImpl } from "../interfaces/impls/all-directives.impl";
import { Directive } from "./directive.decorator";

@Directive('on')
export class EventDirective implements AllDirectivesImpl {
    allDirectives(param: AllDirectivesArgInterface) {
        for (const key in param.directives) {
            this.addEventListener(key, param.directives[key], param);
        }
    }

    private addEventListener(key: string, directive: { get?: () => any, set?: (val?: any) => void; }, param: AllDirectivesArgInterface) {
        const bind = directive.get!().bind(param.component);
        const event = fromEvent(param.element, key);
        event.subscribe(bind);
    }
}