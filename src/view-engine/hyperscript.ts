import { HyperscriptInterface } from "../interfaces/hyperscript.interface";
import { ObjectInterface } from "../interfaces/object.interface";
import { ViewDirectiveType } from "../types/view-directive.type";

export function hyperscript(
    name: string,
    attributes: ObjectInterface<string | (() => any)>,
    children: (HyperscriptInterface | string | (() => any))[],
    directives: ViewDirectiveType
): HyperscriptInterface {
    return {
        name,
        attributes,
        children,
        directives
    }
}
