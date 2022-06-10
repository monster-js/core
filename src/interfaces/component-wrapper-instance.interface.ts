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
    isMonsterComponent: boolean;
    addHookWatcher(type: HooksEnum, callback: Function): void;
    pipe(selector: string, value: any, args: any[]): string;
    getElement(): HTMLElement;
    getShadowRoot(): ShadowRoot;
}