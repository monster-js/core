import { HooksEnum } from "../../enums/hooks.enum";
import { ComponentWrapperInstanceInterface } from "../../interfaces/component-wrapper-instance.interface";
import { ObjectInterface } from "../../interfaces/object.interface";

export function updateProps(wrapper: ComponentWrapperInstanceInterface, oldProps: ObjectInterface, isUpdate: boolean = false) {

    if (!wrapper.isMonsterComponent) {
        throw `The component '${wrapper.localName}' cannot use the prop directive. The component is not defined or not a MonsterJS component.`;
    }

    (wrapper as any).$propsData = { ...oldProps };
    if (isUpdate) {
        wrapper.hooksCaller(HooksEnum.onPropsChange);
    }
    wrapper.changeDetection.detectChanges();
}
