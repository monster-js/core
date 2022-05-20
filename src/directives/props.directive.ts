import { AllDirectivesArgInterface } from "../interfaces/all-directives-arg.interface";
import { AllDirectivesImpl } from "../interfaces/impls/all-directives.impl";
import { ObjectInterface } from "../interfaces/object.interface";
import { kebabToCamel } from "../utils/kebab-to-camel";
import { randomString } from "../utils/random-string";
import { watch } from "../utils/watch";
import { Directive } from "./directive.decorator";
import { updateProps } from "./utils/update-props";
import { watchDirective } from "./utils/watch-directive";

@Directive('prop')
export class PropsDirective implements AllDirectivesImpl {

    private oldProps: ObjectInterface = {};

    allDirectives(param: AllDirectivesArgInterface): void {
        let value = randomString();
        const directive = param.directives;
        const valueCaller = () => {
            let hasChanges: boolean = false;
            for (const key in directive) {
                const newVal = directive[key].get!();
                if (this.oldProps[kebabToCamel(key)] !== newVal) {
                    hasChanges = true;
                }
                this.oldProps[kebabToCamel(key)] = newVal;
            }
            if (hasChanges) {
                value = randomString();
            }
            return value;
        }


        valueCaller();
        updateProps(param.element as any, this.oldProps);
        watch(() => valueCaller(), param.element, param.component, () => updateProps(param.element as any, this.oldProps, true))
    }
}