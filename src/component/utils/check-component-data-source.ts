import { ComponentInterface } from "../../interfaces/component-interface";

/**
 * check if dataSource is present
 * if not, then create the dataSource
 * 
 * @param target the component
 */
export function checkComponentDataSource(target: ComponentInterface) {
    if (!target.dataSource) {
        target.dataSource = {
            data: new Map(),
            name: target.name
        };
    }
}
