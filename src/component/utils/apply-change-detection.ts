import { ComponentWrapperInstanceInterface } from "../../interfaces/component-wrapper-instance.interface";
import { ObjectInterface } from "../../interfaces/object.interface";
import { getMethodNames } from "../../utils/get-method-names";

export function applyChangeDetection(iComponent: ObjectInterface, iWrapper: ComponentWrapperInstanceInterface) {
    const exceptMethods: ObjectInterface = {
        onChangeDetection: true
    };
    getMethodNames(iComponent).forEach(key => {

        if (exceptMethods[key]) {
            return;
        }

        const originalMethod = iComponent[key];

        if (originalMethod.isAsync) {
            iComponent[key] = async function() {
                iWrapper.changeDetectionTracker++;
                const response = (originalMethod as any).apply(this, arguments);
                iWrapper.changeDetection.detectChanges();
                const response2 = await response;
                if (iWrapper.changeDetectionTracker === 1) {
                    iWrapper.changeDetection.detectChanges();
                }
                iWrapper.changeDetectionTracker--;
                return response2;
            }
        } else {
            iComponent[key] = function() {
                iWrapper.changeDetectionTracker++;
                const response = originalMethod.apply(this, arguments);
                if (iWrapper.changeDetectionTracker === 1) {
                    iWrapper.changeDetection.detectChanges();
                }
                iWrapper.changeDetectionTracker--;
                return response;
            }
        }
    });
}
