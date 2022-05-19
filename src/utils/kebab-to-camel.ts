export function kebabToCamel(str: string): string {
    return str.replace(/-./g, x=>x[1].toUpperCase());
}