export class GlobalDataSource {

    private static instance: GlobalDataSource;

    public data: Map<any, any> = new Map();
    public name: string = this.constructor.name;

    constructor() {
        if (GlobalDataSource.instance) {
            return GlobalDataSource.instance;
        }
        GlobalDataSource.instance = this;
    }
}