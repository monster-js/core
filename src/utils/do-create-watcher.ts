import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";

export function doCreateWatcher(
    valueCaller: () => any,
    element: HTMLElement,
    iComponentWrapper: ComponentWrapperInstanceInterface,
    updateCallback: (value: any) => void,
    isConditionWatcher: boolean = false
) {
    let value = valueCaller();
    iComponentWrapper.changeDetection.addWatcher({
        isConnected: () => element.isConnected,
        getValue: () => value,
        isUpdated: () => {
            const newValue = valueCaller();
            let updated = value !== newValue;
            value = newValue;
            return updated;
        },
        update: (newValue: any) => updateCallback(newValue)
    }, isConditionWatcher);
}
