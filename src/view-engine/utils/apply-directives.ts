import { Container } from "../../dependency-injection/container";
import { HooksEnum } from "../../enums/hooks.enum";
import { ObjectInterface } from "../../interfaces/object.interface";
import { ViewDirectiveType } from "../../types/view-directive.type";
import { ViewEngine } from "../view-engine";
import { allDirectiveMethodCaller } from "./all-directive-method-caller";
import { directiveMethodCaller } from "./directive-method-caller";
import { registerDirectiveHook } from "./register-directive-hook";

export function applyDirectives(element: HTMLElement, viewDirective: ViewDirectiveType, viewEngine: ViewEngine) {
    const wrapper = viewEngine.componentWrapperInstance;
    const directives: ObjectInterface<({ new(): any })[]> = viewEngine.componentWrapperInstance.component.directives || {};
    const di = new Container(viewEngine.componentWrapperInstance.component.dataSource!);
    for (const key in viewDirective) {
        const selectedDirectives = directives[key];
        const selectedViewDirective = viewDirective[key];
        if (!selectedDirectives) {
            throw `Directive '${key}' is not registered in ${viewEngine.componentWrapperInstance.component.dataSource!.name}`;
        }
        selectedDirectives.forEach(directive => {
            const instance = di.resolve(directive);
            for (const key in HooksEnum) {
                registerDirectiveHook((HooksEnum as any)[key], wrapper, instance);
            }
            allDirectiveMethodCaller(selectedViewDirective, instance, viewEngine, element);
            for (const key2 in selectedViewDirective) {
                directiveMethodCaller(key2, selectedViewDirective[key2], instance, viewEngine, element);
            }
        });
    }
}