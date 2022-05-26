import { ComponentInterface } from "../interfaces/component-interface";
import { ServiceWithConfigInterface } from "../interfaces/service-with-config.interface";
import { ServiceInterface } from "../interfaces/service.interface";

export function Services(...services: (ServiceInterface | ServiceWithConfigInterface)[]) {
    return function(target: ComponentInterface) {
        if (!target.services) {
            target.services = [];
        }
        target.services = [
            ...target.services,
            ...services
        ];
    }
}
