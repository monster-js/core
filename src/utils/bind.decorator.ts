export function Bind(target: any, key: string, descriptor: PropertyDescriptor) {
    let fn = descriptor.value;

    return {
        configurable: true,

        get() {
            let boundFn = fn.bind(this);
            Reflect.defineProperty(this, key, {
                value: boundFn,
                configurable: true,
                writable: true
            });

            return function() {
                // @ts-ignore
                return boundFn.apply(this, arguments)
            };
        }
    };
}