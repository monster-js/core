export class Parent<T = any> {
    protected parent: T = null!;
    protected onReceiveParent(parent: any): void {
        this.parent = parent;
    }
}