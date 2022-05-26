import { ObjectInterface } from "../interfaces/object.interface";

export class GlobalComponents {
    private static instance: GlobalComponents;

    public components: ObjectInterface = {};

    constructor() {
        if (GlobalComponents.instance) {
            return GlobalComponents.instance;
        }

        GlobalComponents.instance = this;
    }

    public add(selector: string) {
        this.components[selector] = true;
    }

    public get(selector: string) {
        return this.components[selector];
    }
}