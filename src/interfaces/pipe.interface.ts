export interface PipeInterface {
    new(...args: any[]): {
        transform(value?: any, args?: any[]): string;
    };
    selector?: string;
}
