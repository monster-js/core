export function setGetterProp(obj: any, prop: string, getter: Function) {
    Object.defineProperty(obj, prop, {
        get: getter.bind(obj)
    })
}