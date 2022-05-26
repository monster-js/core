import { DirectiveArgInterface } from "../../interfaces/directive-arg.interface";
import { watch } from "../../utils/watch";

export function watchDirective(arg: DirectiveArgInterface, callback: (newValue?: any) => void) {
    watch(() => arg.directive.get(), arg.element, arg.component, callback);
}