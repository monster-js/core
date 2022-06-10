import { Container } from "../../dependency-injection/container";
import { ComponentInterface } from "../../interfaces/component-interface";

export function autoResolveComponent(component: ComponentInterface) {

    /**
     * Register component to di
     */
    const di = new Container(component.dataSource!);
    di.register(component, { target: component, singleton: false, instance: null });


    return di.resolve(component);
}
