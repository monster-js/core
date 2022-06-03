import { HooksEnum } from "../../enums/hooks.enum";
import { ComponentInstanceInterface } from "../../interfaces/component-instance.interface";

export function useEffect(component: ComponentInstanceInterface, hookName: HooksEnum, callback: () => any) {
    component[hookName] = callback;
}
