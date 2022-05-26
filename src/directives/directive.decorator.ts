import { DirectiveInterface } from "../interfaces/directive.interface";

export function Directive(namespace: string) {
    return function(target: DirectiveInterface) {
        target.namespace = namespace;
    }
}
