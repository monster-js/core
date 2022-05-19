import { HyperscriptTypeEnum } from "../enums/hyperscript-type.enum";
import { ViewDirectiveType } from "../types/view-directive.type";
import { ObjectInterface } from "./object.interface";

export interface HyperscriptInterface {
    type?: HyperscriptTypeEnum;
    valueCaller?: () => any;
    updateEvent?: () => any;
    elementCaller?: (index?: number) => HyperscriptInterface;
    name?: string;
    attributes?: ObjectInterface<string | (() => any)>;
    children?: (HyperscriptInterface | string | (() => any))[];
    directives?: ViewDirectiveType;
}