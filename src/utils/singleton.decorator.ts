export const SINGLETON_KEY = Symbol();

export function Singleton(target: { new(...args: any[]): any; }) {
    return new Proxy(target, {
        // this will hijack the constructor
        construct(targetCls: any, argsList, newTarget) {
            // we should skip the proxy for children of our targetCls class
            if (targetCls.prototype !== newTarget.prototype) {
                return Reflect.construct(targetCls, argsList, newTarget);
            }
            // if our targetCls class does not have an instance, create it
            if (!targetCls[SINGLETON_KEY]) {
                targetCls[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
            }
            // return the instance we created!
            return targetCls[SINGLETON_KEY];
        }
    });
}