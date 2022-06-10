import { DIConfigInterface } from "./di-config.interface";

export interface DataSourceDataInterface {
    target: any;
    config: DIConfigInterface;
    mock?: any;
}
