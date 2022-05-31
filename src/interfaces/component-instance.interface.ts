import { ComponentWrapperInstanceInterface } from "./component-wrapper-instance.interface";
import { AdoptedCallbackImpl } from "./impls/adopted-callback.impl";
import { AfterViewInitImpl } from "./impls/after-view-init.impl";
import { AttributeChangeCallbackImpl } from "./impls/attribute-change-callback.impl";
import { BeforeViewInitImpl } from "./impls/before-view-init.impl";
import { ConnectedCallbackImpl } from "./impls/connected-callback.impl";
import { DisconnectedCallbackImpl } from "./impls/disconnected-callback.impl";
import { OnChangeDetectionImpl } from "./impls/on-change-detection.impl";
import { OnDestroyImpl } from "./impls/on-destroy.impl";
import { OnInitImpl } from "./impls/on-init.impl";
import { OnPropsChangeImpl } from "./impls/on-props-change.impl";
import { OnViewChangeImpl } from "./impls/on-view-change.impl";

export interface ComponentInstanceInterface
    extends
    Partial<ConnectedCallbackImpl>,
    Partial<OnInitImpl>,
    Partial<DisconnectedCallbackImpl>,
    Partial<OnPropsChangeImpl>,
    Partial<OnDestroyImpl>,
    Partial<OnViewChangeImpl>,
    Partial<BeforeViewInitImpl>,
    Partial<AfterViewInitImpl>,
    Partial<AttributeChangeCallbackImpl>,
    Partial<AdoptedCallbackImpl>,
    Partial<OnChangeDetectionImpl>
{
    $wrapper?: ComponentWrapperInstanceInterface;
    render(): any;
}