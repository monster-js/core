import { Container } from "../../dependency-injection/container";
import { ServiceInterface } from "../../interfaces/service.interface";

export function registerService(service: ServiceInterface, di: Container, config?: any) {
    di.register(service, {
        singleton: service.singleton!,
        target: service,
        config: config || null
    });
}
