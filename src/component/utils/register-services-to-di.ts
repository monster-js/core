import { Container } from "../../dependency-injection/container";
import { ServiceWithConfigInterface } from "../../interfaces/service-with-config.interface";
import { ServiceInterface } from "../../interfaces/service.interface";
import { registerService } from "../../service/utils/register-service";

export function registerServicesToDI(services: (ServiceInterface | ServiceWithConfigInterface)[], di: Container) {
    services.forEach(service => {
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
