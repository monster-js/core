import { ComponentInstanceInterface } from "./component-instance.interface";
import { DataSourceInterface } from "./data-source.interface";
import { ObjectInterface } from "./object.interface";
import { ServiceWithConfigInterface } from "./service-with-config.interface";
import { ServiceInterface } from "./service.interface";

export interface ComponentInterface {
    new (...args: any[]): ComponentInstanceInterface;
    isMonsterComponent?: boolean;
    selector?: string;
    superClass?: CustomElementConstructor;
    directives?: ObjectInterface<({ new(...args: any[]): any })[]>;
    dataSource?: DataSourceInterface;
    services?: (ServiceInterface | ServiceWithConfigInterface)[];
    observedAttributesObject?: ObjectInterface;
    observedAttributesArray?: string[];
    definedComponents?: {
        name: string;
        components: ObjectInterface<boolean>;
    }
}

