import { ComponentInstanceInterface } from "../../interfaces/component-instance.interface";

type UseStateReturnType = (component: ComponentInstanceInterface, initialValue: any) => [() => any, (value: any) => void];

export const useState: UseStateReturnType = (component: ComponentInstanceInterface, initialValue: any) => {
    let val = initialValue;
    const getter = () => val;
    const setter = (value: any) => {
        val = value;
        component.$wrapper?.changeDetection.detectChanges();
    };
    return [getter, setter];
}
