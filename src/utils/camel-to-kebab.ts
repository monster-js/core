export function camelToKebab(value: string): string {
    return value.split('').map((letter, idx) => {
        return letter.toUpperCase() === letter && isNaN(letter as any)
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter;
    }).join('');
}
