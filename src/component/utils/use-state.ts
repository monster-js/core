import { ComponentInstanceInterface } from "../../interfaces/component-instance.interface";

export function useState<T = any>(component: ComponentInstanceInterface, initialValue: T): [() => T, (value: T) => void] {
    let val = initialValue;
    const getter = () => val;
    const setter = (value: T) => {
        val = value;
        component.$wrapper?.changeDetection.detectChanges();
    };
    return [getter, setter];
}
