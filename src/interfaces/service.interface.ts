export interface ServiceInterface {
    new(...args: any[]): any;
    singleton?: boolean;
}