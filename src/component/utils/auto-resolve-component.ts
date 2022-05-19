import { Container } from "../../dependency-injection/container";
import { ComponentInterface } from "../../interfaces/component-interface";
import { ServiceInterface } from "../../interfaces/service.interface";
import { registerService } from "../../service/utils/register-service";

export function autoResolveComponent(component: ComponentInterface) {
    const di = new Container(component.dataSource!);
    di.register(component, { target: component, singleton: false, instance: null });

    for (const key in component.directives) {
        component.directives[key].forEach(directive => di.register(directive, {
            target: directive,
            instance: null,
            singleton: false
        }));
    }

    component.services?.forEach(service => {
        let target: ServiceInterface;
        let config = null;
        if (typeof service === 'object') {
            target = service.service;
            config = service.config;
        } else {
            target = service;
        }
        registerService(target, di, config)
    });

    return di.resolve(component);
}