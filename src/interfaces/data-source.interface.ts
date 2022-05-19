import { DataSourceDataInterface } from "./data-source-data.interface";

export interface DataSourceInterface {
    data: Map<any, DataSourceDataInterface>;
    name: string;
}
