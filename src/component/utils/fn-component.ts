import { Directives } from "../../directives/directives.decorator";
import { ComponentInterface } from "../../interfaces/component-interface";
import { DirectiveInterface } from "../../interfaces/directive.interface";
import { ObjectInterface } from "../../interfaces/object.interface";
import { PipeInterface } from "../../interfaces/pipe.interface";
import { ServiceWithConfigInterface } from "../../interfaces/service-with-config.interface";
import { ServiceInterface } from "../../interfaces/service.interface";
import { Pipes } from "../../pipes/pipes.decorator";
import { Services } from "../../service/services.decorator";
import { Component } from "../component.decorator";

interface HooksComponentConfigInterface<T> {
    inject?: T;
    directives?: DirectiveInterface[];
    pipes?: PipeInterface[];
    services?: (ServiceInterface | ServiceWithConfigInterface)[];
}

export function fnComponent<T = ObjectInterface>(selector: string, component: (injections?: T) => any, config: HooksComponentConfigInterface<T> = {}): ComponentInterface {

    Component(selector)(component as any);
    Services(...(config.services || []))(component as any);
    Directives(...(config.directives || []))(component as any);
    Pipes(...(config.pipes || []))(component as any);
    (component as unknown as ComponentInterface).inject = config.inject || {};

    return component as any;
}
