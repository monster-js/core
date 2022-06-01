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

interface HooksComponentConfigInterface {
    inject?: ObjectInterface;
    directives?: DirectiveInterface[];
    pipes?: PipeInterface[];
    services?: (ServiceInterface | ServiceWithConfigInterface)[];
}

export function fnComponent(selector: string, component: Function, config: HooksComponentConfigInterface = {}): ComponentInterface {

    Component(selector)(component as any);
    Services(...(config.services || []))(component as any);
    Directives(...(config.directives || []))(component as any);
    Pipes(...(config.pipes || []))(component as any);
    (component as ComponentInterface).inject = config.inject || {};

    return component as any;
}
