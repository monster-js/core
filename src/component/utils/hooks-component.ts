import { Directives } from "../../directives/directives.decorator";
import { ComponentInterface } from "../../interfaces/component-interface";
import { DirectiveInterface } from "../../interfaces/directive.interface";
import { PipeInterface } from "../../interfaces/pipe.interface";
import { ServiceWithConfigInterface } from "../../interfaces/service-with-config.interface";
import { ServiceInterface } from "../../interfaces/service.interface";
import { Pipes } from "../../pipes/pipes.decorator";
import { Services } from "../../service/services.decorator";
import { Component } from "../component.decorator";

interface HooksComponentConfigInterface {
    selector: string;
    directives?: DirectiveInterface[];
    pipes?: PipeInterface[];
    services?: (ServiceInterface | ServiceWithConfigInterface)[];
}

export function hooksComponent(component: any, config: HooksComponentConfigInterface): ComponentInterface {

    Component(config.selector)(component);
    Services(...(config.services || []))(component);
    Directives(...(config.directives || []))(component);
    Pipes(...(config.pipes || []))(component);

    return component;
}