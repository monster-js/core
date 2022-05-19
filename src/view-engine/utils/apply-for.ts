import { ComponentWrapperInstanceInterface } from "../../interfaces/component-wrapper-instance.interface";
import { HyperscriptInterface } from "../../interfaces/hyperscript.interface";
import { createWatcher } from "../../utils/create-watcher";
import { ViewEngine } from "../view-engine";

export function applyFor(hs: HyperscriptInterface, wrapper: ComponentWrapperInstanceInterface): DocumentFragment {
    const viewEngine = new ViewEngine(wrapper);
    const fragment = document.createDocumentFragment();
    const comment = document.createComment(' For ');
    let oldValue: any[] = [];
    let elements: HTMLElement[] = [];
    const valueCaller = hs.valueCaller!;

    fragment.appendChild(comment);

    const update = () => {
        const newValue: any = valueCaller();
        for (let i = 0; i < Math.max(oldValue.length, newValue.length); i++) {
            if (oldValue[i] === undefined) {
                const newElement = viewEngine.doBuildElement(hs.elementCaller!(i));
                const elementsLength = elements.length;
                if (elementsLength === 0) {
                    comment.after(newElement);
                } else {
                    elements[elementsLength - 1].after(newElement);
                }
                elements[i] = newElement as any;
            }
            if (newValue[i] === undefined) {
                elements[i].remove();
                elements[i] = null!;
            }
        }
        elements = elements.filter(item => !!item);
        oldValue = newValue;
    }
    update();

    createWatcher(() => valueCaller().length, comment as unknown as HTMLElement, viewEngine.componentWrapperInstance, () => {
        update();
        if (hs.updateEvent) {
            hs.updateEvent().bind(wrapper.component)();
        }
    });

    return fragment;
}
