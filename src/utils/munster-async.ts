export function munsterAsync(target: any, propertyKey: string) {
    target[propertyKey].isAsync = true;
}
