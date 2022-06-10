import { checkComponentDataSource } from "../component/utils/check-component-data-source";
import { registerDirectivesToDI } from "../component/utils/register-directives-to-di";
import { Container } from "../dependency-injection/container";
import { ComponentInterface } from "../interfaces/component-interface";
import { DirectiveInterface } from "../interfaces/directive.interface";
import { removeDuplicates } from "../utils/remove-duplicates";

export function Directives(...directives: DirectiveInterface[]) {
    return function(target: ComponentInterface) {

        checkComponentDataSource(target);

        const di = new Container(target.dataSource!);

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

        registerDirectivesToDI(target.directives, di);
    }
}
