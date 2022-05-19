import { ComponentInterface } from "../interfaces/component-interface";
import { DirectiveInterface } from "../interfaces/directive.interface";
import { removeDuplicates } from "../utils/remove-duplicates";

export function Directives(...directives: DirectiveInterface[]) {
    return function(target: ComponentInterface) {
        if (!target.directives) {
            target.directives = {};
        }
        directives.forEach(directive => {
            if (directive.namespace && !target.directives![directive.namespace]) {
                target.directives![directive.namespace] = [];
            }
            target.directives![directive.namespace!].push(directive);
        });

        // clean duplicate directives
        for (const key in target.directives) {
            target.directives[key] = removeDuplicates(target.directives[key]);
        }
    }
}
