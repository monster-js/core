import { componentFactory } from "../component/component-factory";
import { ComponentInterface } from "../interfaces/component-interface";
import { hyperscript } from "../view-engine/hyperscript";
import { monsterAsync } from "./monster-async";


/**
 * Setup globals
 */
declare const globalThis: any;
globalThis.v = hyperscript;
globalThis.monsterAsync = monsterAsync;


/**
 * Polyfill customElements.define method
 */
const originalDefine = customElements.define;
customElements.define = function(name: string, constructor: CustomElementConstructor | any, options?: ElementDefinitionOptions) {
    const monster: ComponentInterface = constructor;
    if (monster.isMonsterComponent) {
        constructor = componentFactory(constructor);
    }
    originalDefine.apply(this, [name, constructor, options]);
}