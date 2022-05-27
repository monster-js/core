import 'reflect-metadata';

/**
 * is attribute
 * slots
 * react hooks like component
 */

export { Component } from './component/component.decorator';
export { ShadowComponent } from './component/shadow-component.decorator';
export { ShadowStyle } from './component/shadow-style.decorator';
export { componentFactory } from './component/component-factory';
export { BaseComponent } from './component/base-component';
export { GlobalComponents } from './component/global-components';
export { CustomElement } from './component/custom-element.decorator';
export { defineComponent } from './component/define-component';

export { Attr } from './attribute/attr.decorator';
export { AttrBoolean } from './attribute/attr-boolean.decorator';
export { AttrNumber } from './attribute/attr-number.decorator';

export { Service } from './service/service.decorator';
export { Services } from './service/services.decorator';
export { PropsService } from './service/props.service';
export { Parent } from './service/parent';
export { registerService } from './service/utils/register-service';

export { Directives } from './directives/directives.decorator';
export { Directive } from './directives/directive.decorator';
export { watchDirective } from './directives/utils/watch-directive';

export { Pipe } from './pipes/pipe.decorator';
export { Pipes } from './pipes/pipes.decorator';

export { AdoptedCallbackImpl } from './interfaces/impls/adopted-callback.impl';
export { AfterViewInitImpl } from './interfaces/impls/after-view-init.impl';
export { AllDirectivesImpl } from './interfaces/impls/all-directives.impl';
export { AttributeChangeCallbackImpl } from './interfaces/impls/attribute-change-callback.impl';
export { BeforeViewInitImpl } from './interfaces/impls/before-view-init.impl';
export { ConnectedCallbackImpl } from './interfaces/impls/connected-callback.impl';
export { DisconnectedCallbackImpl } from './interfaces/impls/disconnected-callback.impl';
export { OnChangeDetectionImpl } from './interfaces/impls/on-change-detection.impl';
export { OnDestroyImpl } from './interfaces/impls/on-destroy.impl';
export { OnInitImpl } from './interfaces/impls/on-init.impl';
export { OnPropsChangeImpl } from './interfaces/impls/on-props-change.impl';
export { OnReceiveConfigImpl } from './interfaces/impls/on-receive-config.impl';
export { OnViewChangeImpl } from './interfaces/impls/on-view-change.impl';
export { OnReceiveParentImpl } from './interfaces/impls/on-receive-parent.impl';

export { ObjectInterface } from './interfaces/object.interface';
export { ServiceInterface } from './interfaces/service.interface';
export { ServiceWithConfigInterface } from './interfaces/service-with-config.interface';
export { DirectiveInterface } from './interfaces/directive.interface';
export { ComponentInterface } from './interfaces/component-interface';
export { DataSourceInterface } from './interfaces/data-source.interface';
export { ObservableInterface } from './interfaces/observable.interface';
export { SubscriptionInterface } from './interfaces/subscription.interface';
export { AllDirectivesArgInterface } from './interfaces/all-directives-arg.interface';
export { DirectiveArgInterface } from './interfaces/directive-arg.interface';

export { Container } from './dependency-injection/container';
export { GlobalDataSource } from './dependency-injection/global-data-source';

export { getSelector } from './utils/get-selector';
export { removeDuplicates } from './utils/remove-duplicates';
export { Singleton } from './utils/singleton.decorator';
export { errorHandler } from './utils/error-handler';
export { createWatcher } from './utils/create-watcher';
export { watch } from './utils/watch';
export { createConditionWatcher } from './utils/create-condition-watcher';
export { Bind } from './utils/bind.decorator';
export { EventEmitter } from './utils/event-emitter';
export { monsterAsync } from './utils/monster-async';

export { hyperscript } from './view-engine/hyperscript';