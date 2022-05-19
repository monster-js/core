import { ComponentInstanceInterface } from "./component-instance.interface";
import { ComponentWrapperInstanceInterface } from "./component-wrapper-instance.interface";

export interface DirectiveArgInterface {
    directive: { get: () => any, set?: (val?: any) => void; };
    element: HTMLElement;
    component: ComponentInstanceInterface;
    componentWrapper: ComponentWrapperInstanceInterface;
}