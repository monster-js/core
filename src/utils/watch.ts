import { ComponentInstanceInterface } from "../interfaces/component-instance.interface";
import { doCreateWatcher } from "./do-create-watcher";

export function watch(
    valueCaller: () => any,
    element: HTMLElement,
    component: ComponentInstanceInterface,
    updateCallback: (value: any) => void
) {
    doCreateWatcher(valueCaller, element, component.$wrapper!, updateCallback, false);
}