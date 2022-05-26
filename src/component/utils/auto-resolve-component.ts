import { Container } from "../../dependency-injection/container";
import { ComponentInterface } from "../../interfaces/component-interface";
import { ServiceInterface } from "../../interfaces/service.interface";
import { registerService } from "../../service/utils/register-service";

function registerDirectivesToDI(component: ComponentInterface, di: Container) {
    for (const key in component.directives) {
        component.directives[key].forEach(directive => di.register(directive, {
            target: directive,
            instance: null,
            singleton: false
        }));
    }
}

function registerServicesToDI(component: ComponentInterface, di: Container) {
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
}

function registerPipesToDI(component: ComponentInterface, di: Container) {
    for (const key in component.pipes) {
        const pipe = component.pipes[key];
        di.register(pipe, {
            target: pipe,
            singleton: false
        });
    }
}

export function autoResolveComponent(component: ComponentInterface) {

    /**
     * Register component to di
     */
    const di = new Container(component.dataSource!);
    di.register(component, { target: component, singleton: false, instance: null });


    registerDirectivesToDI(component, di);
    registerServicesToDI(component, di);
    registerPipesToDI(component, di);

    return di.resolve(component);
}