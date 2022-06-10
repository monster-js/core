import { Directives } from "../directives/directives.decorator";
import { EventDirective } from "../directives/event.directive";
import { PreventEventDirective } from "../directives/prevent-event.directive";
import { PropsDirective } from "../directives/props.directive";
import { ViewDirective } from "../directives/view.directive";
import { ComponentInterface } from "../interfaces/component-interface";
import { checkComponentDataSource } from "./utils/check-component-data-source";

const defaults = {
    directives: [
        PropsDirective,
        EventDirective,
        PreventEventDirective,
        ViewDirective
    ]
};

export function Component(selector: string) {
    return function(target: ComponentInterface) {
        target.selector = selector;

        checkComponentDataSource(target);

        target.definedComponents = {
            name: target.name,
            components: {}
        };
        target.isMonsterComponent = true;

        // Apply default directives
        Directives(...defaults.directives)(target);
    }
}
