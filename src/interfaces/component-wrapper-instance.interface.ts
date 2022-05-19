import { ChangeDetection } from "../change-detection/change-detection";
import { HooksEnum } from "../enums/hooks.enum";
import { ComponentInstanceInterface } from "./component-instance.interface";
import { ComponentInterface } from "./component-interface";

export interface ComponentWrapperInstanceInterface extends HTMLElement {
    componentInstance: ComponentInstanceInterface;
    component: ComponentInterface;
    hooksCaller(type: HooksEnum): void;
    changeDetectionTracker: number;
    changeDetection: ChangeDetection;
    isMunsterComponent: boolean;
    addHookWatcher(type: HooksEnum, callback: Function): void;
}