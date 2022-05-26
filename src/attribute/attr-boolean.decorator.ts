import { AttributeTypeEnum } from "../enums/attribute-type.enum";
import { processAttr } from "./utils/process-attr";

export function AttrBoolean(target: any, propertyKey: string) {
    processAttr(target, propertyKey, AttributeTypeEnum.boolean);
}
