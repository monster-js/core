import { detectChanges } from "../component/detect-changes";
import { DirectiveArgInterface } from "../interfaces/directive-arg.interface";
import { createWatcher } from "../utils/create-watcher";
import { watch } from "../utils/watch";
import { Directive } from "./directive.decorator";
import { watchDirective } from "./utils/watch-directive";

@Directive('v')
export class ViewDirective {
    $ref(param: DirectiveArgInterface) {
        param.directive.set!(param.element);
    }

    $model(param: DirectiveArgInterface) {
        const { localName } = param.element;
        switch(localName) {
            case 'input':
            case 'textarea':
                this.inputModel(param);
                break;
            case 'select':
                this.selectModel(param);
                break;
        }
    }

    $class(param: DirectiveArgInterface) {
        const cls = param.directive.get;
        const value = cls();

        watch(() => {
            const newVal = cls();
            return Object.keys(newVal).map(key => newVal[key]).join();
        }, param.element, param.component, () => this.updateClassList(cls(), param.element));

        this.updateClassList(value, param.element);
    }

    private updateClassList(clsObject: {[key: string]: any}, element: HTMLElement): void {
        Object.keys(clsObject).forEach(key => {
            const value = !!clsObject[key];
            if (value) {
                element.classList.add(key);
            } else {
                element.classList.remove(key);
            }
        });
    }

    private inputModel(param: DirectiveArgInterface) {
        this.processInputAndSelect(param, 'input');
    }

    private selectModel(param: DirectiveArgInterface) {
        this.processInputAndSelect(param, 'change');
    }

    private processInputAndSelect(param: DirectiveArgInterface, eventType: string) {
        const valueCaller = param.directive.get;
        const valueSetter = param.directive.set!;
        param.element.addEventListener(eventType, event => {
            valueSetter((event.target as any).value);
            detectChanges(param.component);
        });
        watchDirective(param, newValue => {
            (param.element as any).value = newValue;
        });
        // watch(() => valueCaller(), param.element, param.component, newValue => {
        //     (param.element as any).value = newValue;
        // });
        (param.element as any).value = valueCaller();
    }
}