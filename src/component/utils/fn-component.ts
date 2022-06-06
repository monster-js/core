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
import { ShadowStyle } from "../shadow-style.decorator";

interface HooksComponentConfigInterface<T> {
    inject?: T;
    directives?: DirectiveInterface[];
    pipes?: PipeInterface[];
    services?: (ServiceInterface | ServiceWithConfigInterface)[];
    shadowMode?: ShadowRootMode;
    shadowStyle?: string;
    customElement?: {
        superClass: CustomElementConstructor;
        extends: string
    };
}

export function fnComponent<T = ObjectInterface>(
    selector: string,
    component: (injections?: T) => any,
    config: HooksComponentConfigInterface<T> = {}
): ComponentInterface {

    const target = (component as unknown as ComponentInterface);

    Component(selector)(target);
    Services(...(config.services || []))(target);
    Directives(...(config.directives || []))(target);
    Pipes(...(config.pipes || []))(target);
    target.inject = config.inject || {};

    target.shadowMode = config.shadowMode;
    target.superClass = config?.customElement?.superClass;
    target.extendsLocalName = config?.customElement?.extends;

    if (target.shadowMode) {
        ShadowStyle(config.shadowStyle!)(target);
    }

    return target;
}
