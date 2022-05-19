import { componentFactory } from "../component/component-factory";
import { ComponentInterface } from "../interfaces/component-interface";
import { hyperscript } from "../view-engine/hyperscript";
import { munsterAsync } from "./munster-async";

declare const globalThis: any;
globalThis.v = hyperscript;
globalThis.munsterAsync = munsterAsync;

const originalDefine = customElements.define;
customElements.define = function(name: string, constructor: CustomElementConstructor | any, options?: ElementDefinitionOptions) {
    const munster: ComponentInterface = constructor;
    if (munster.isMunsterComponent) {
        constructor = componentFactory(constructor);
    }
    originalDefine.apply(this, [name, constructor, options]);
}