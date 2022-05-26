import { AttributeTypeEnum } from "../../enums/attribute-type.enum";
import { camelToKebab } from "../../utils/camel-to-kebab";

export function processAttr(target: any, propKey: string, type: AttributeTypeEnum) {
    const constructor = target.constructor;
    if (!constructor.observedAttributesObject) {
        constructor.observedAttributesArray = [];
        constructor.observedAttributesObject = {};
    }
    constructor.observedAttributesArray.push(camelToKebab(propKey));
    constructor.observedAttributesObject[camelToKebab(propKey)] = type;
}
