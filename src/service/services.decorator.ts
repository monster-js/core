import { checkComponentDataSource } from "../component/utils/check-component-data-source";
import { registerServicesToDI } from "../component/utils/register-services-to-di";
import { Container } from "../dependency-injection/container";
import { ComponentInterface } from "../interfaces/component-interface";
import { ServiceWithConfigInterface } from "../interfaces/service-with-config.interface";
import { ServiceInterface } from "../interfaces/service.interface";

export function Services(...services: (ServiceInterface | ServiceWithConfigInterface)[]) {
    return function(target: ComponentInterface) {

        checkComponentDataSource(target);

        const di = new Container(target.dataSource!);

        if (!target.services) {
            target.services = [];
        }
        target.services = [
            ...target.services,
            ...services
        ];


        registerServicesToDI(target.services, di);
    }
}
