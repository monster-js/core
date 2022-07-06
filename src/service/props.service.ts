import { Parent } from "./parent";
import { Service } from "./service.decorator";

@Service()
export class PropsService<T = any> extends Parent {

    public get<T>(): T;
    public get<K extends keyof T>(key?: K): T[K] {
        if (!this.parent?.$wrapper?.$propsData) {
            return {} as any;
        }
        return (key ? this.parent.$wrapper.$propsData[key] : this.parent.$wrapper.$propsData) as any;
    }

}
