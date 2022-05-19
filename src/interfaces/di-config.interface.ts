import { ObjectInterface } from "./object.interface";

export interface DIConfigInterface<T = any, TT = ObjectInterface> {
    target: T;
    instance?: any;
    singleton: boolean;
    config?: TT;
}
