import { ComponentInstanceInterface } from "./component-instance.interface";
import { DataSourceInterface } from "./data-source.interface";
import { DirectiveInterface } from "./directive.interface";
import { ObjectInterface } from "./object.interface";
import { PipeInterface } from "./pipe.interface";
import { ServiceWithConfigInterface } from "./service-with-config.interface";
import { ServiceInterface } from "./service.interface";

export interface ComponentInterface {
    new (...args: any[]): ComponentInstanceInterface;
    shadowMode?: ShadowRootMode;
    shadowStyle?: string;
    isMonsterComponent?: boolean;
    selector?: string;
    superClass?: CustomElementConstructor;
    directives?: ObjectInterface<DirectiveInterface[]>;
    pipes?: ObjectInterface<PipeInterface>;
    dataSource?: DataSourceInterface;
    services?: (ServiceInterface | ServiceWithConfigInterface)[];
    observedAttributesObject?: ObjectInterface;
    observedAttributesArray?: string[];
    definedComponents?: {
        name: string;
        components: ObjectInterface<boolean>;
    }
}

