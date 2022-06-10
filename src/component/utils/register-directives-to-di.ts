import { Container } from "../../dependency-injection/container";
import { DirectiveInterface } from "../../interfaces/directive.interface";
import { ObjectInterface } from "../../interfaces/object.interface";

export function registerDirectivesToDI(directives: ObjectInterface<DirectiveInterface[]>, di: Container) {
    for (const key in directives) {
        directives[key].forEach(directive => di.register(directive, {
            target: directive,
            instance: null,
            singleton: false
        }));
    }
}