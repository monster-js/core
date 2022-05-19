import { ObjectInterface } from "../interfaces/object.interface";

export function getMethodNames(obj: ObjectInterface) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter(name => typeof obj[name] === 'function');
}
