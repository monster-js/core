import { ComponentInterface } from "../interfaces/component-interface";
import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";
import { ObjectInterface } from "../interfaces/object.interface";
import { getSelector } from "../utils/get-selector";

export class BaseComponent {
    public $definedComponents: {
        name: string;
        components: ObjectInterface<boolean>;
    } = {
        name: this.constructor.name,
        components: {}
    }

    public $fakeDefineComponent(component: ComponentInterface) {
        this.$definedComponents.components[getSelector(component)] = true;
    }

    public get $wrapper(): ComponentWrapperInstanceInterface {
        return null!;
    }

    public $detectChanges() {
        this.$wrapper.changeDetection.detectChanges();
    }
}
