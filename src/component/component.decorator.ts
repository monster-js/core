import { Directives } from "../directives/directives.decorator";
import { EventDirective } from "../directives/event.directive";
import { PreventEventDirective } from "../directives/prevent-event.directive";
import { PropsDirective } from "../directives/props.directive";
import { ViewDirective } from "../directives/view.directive";
import { ComponentInterface } from "../interfaces/component-interface";

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
        target.dataSource = {
            data: new Map(),
            name: target.name
        };
        target.definedComponents = {
            name: target.name,
            components: {}
        };
        target.isMonsterComponent = true;

        // Apply default directives
        Directives(...defaults.directives)(target);
    }
}
