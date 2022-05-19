import { ComponentWrapperInstanceInterface } from "./component-wrapper-instance.interface";

export interface ComponentInstanceInterface
    // extends
    // Partial<ConnectedCallbackImpl>,
    // Partial<OnInitImpl>,
    // Partial<DisconnectedCallbackImpl>,
    // Partial<OnPropsChangeImpl>
{
    $wrapper?: ComponentWrapperInstanceInterface;
    render(): any;
}