import { ComponentWrapperInstanceInterface } from "../../interfaces/component-wrapper-instance.interface";
import { HyperscriptInterface } from "../../interfaces/hyperscript.interface";
import { createConditionWatcher } from "../../utils/create-condition-watcher";
import { ViewEngine } from "../view-engine";

export function applyIf(hs: HyperscriptInterface, wrapper: ComponentWrapperInstanceInterface): DocumentFragment {
    const viewEngine = new ViewEngine(wrapper);
    const fragment = document.createDocumentFragment();
    const comment = document.createComment(' IF ');
    let element: HTMLElement = null!;
    const valueCaller = () => !!hs.valueCaller!();
    fragment.appendChild(comment);

    const update = (newValue: boolean) => {
        if (newValue && !element) {
            element = viewEngine.doBuildElement(hs.elementCaller!())
            comment.after(element);
        } else if (!newValue && element) {
            element.remove();
            element = null!;
        }
    }

    update(valueCaller());
    createConditionWatcher(() => valueCaller(), comment as any, viewEngine.componentWrapperInstance, newValue => update(newValue));
    return fragment;
}
