import { HooksEnum } from "../../enums/hooks.enum";
import { ComponentWrapperInstanceInterface } from "../../interfaces/component-wrapper-instance.interface";

export function registerDirectiveHook(type: HooksEnum, wrapper: ComponentWrapperInstanceInterface, instance: any) {
    if (instance[type] && typeof instance[type] === 'function') {
        wrapper.addHookWatcher(type, instance[type].bind(instance));
    }
}
