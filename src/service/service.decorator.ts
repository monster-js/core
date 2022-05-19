import { ServiceConfigInterface } from "../interfaces/service-config.interface";
import { ServiceInterface } from "../interfaces/service.interface";

export function Service(config?: ServiceConfigInterface) {
    return function(target: ServiceInterface) {
        target.singleton = !!config?.singleton;
    }
}