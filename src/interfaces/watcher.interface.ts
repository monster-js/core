export interface WatcherInterface {
    isConnected(): boolean;
    update(value: any): void;
    isUpdated(): boolean;
    getValue(): any;
}