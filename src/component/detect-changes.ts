import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";
import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";

export function detectChanges(component: ComponentInstanceInterface) {
    const wrapper: ComponentWrapperInstanceInterface = component.$wrapper!;
    wrapper.changeDetection.detectChanges();
}