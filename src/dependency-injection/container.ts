import { DataSourceDataInterface } from "../interfaces/data-source-data.interface";
import { DataSourceInterface } from "../interfaces/data-source.interface";
import { DIConfigInterface } from "../interfaces/di-config.interface";
import { errorHandler } from "../utils/error-handler";
import { GlobalDataSource } from "./global-data-source";

export class Container {

    private dataSource: DataSourceInterface;

    constructor(dataSource: DataSourceInterface) {
        this.dataSource = dataSource;
    }

    public getSource<T>(target: T): DataSourceDataInterface {
        return this.dataSource.data.get(target)!;
    }

    public update(target: new (...args: any[]) => any, config: DataSourceDataInterface) {
        this.dataSource.data.set(target, config);
    }

    public register(target: any, config: DIConfigInterface) {
        this.dataSource.data.set(target, { target, config });
    }

    public resolve<T>(target: new () => T): T {
        let sourceData: DataSourceDataInterface = this.dataSource.data.get(target)!;


        /**
         * Check if class is registered in the container
         */
        if (!sourceData) {

            const globalSource = new GlobalDataSource();
            if (globalSource === this.dataSource) {
                errorHandler(`${target.name} is not registered in global dependency injection container.`);
                return null!;
            }

            const di = new Container(globalSource);
            sourceData = di.getSource(target);

            if (!sourceData) {
                errorHandler(`${target.name} is not registered in ${this.dataSource.name} and in global dependency injection container.`);
                return null!;
            }
        }


        /**
         * If singleton and has already an instance return the instance
         */
        if (sourceData.config.singleton && sourceData.config.instance) {
            return sourceData.config.instance;
        }


        const params: any[] = Reflect.getMetadata('design:paramtypes', sourceData.target) || [];
        const paramsInstances: any[] = params.map(item => this.resolve(item));
        const instance = new sourceData.target(...paramsInstances);


        /**
         * injected dependency will receive the parent instance
         */
        paramsInstances.forEach(item => {
            if (item.onReceiveParent && typeof item.onReceiveParent === 'function') {
                item.onReceiveParent(instance);
            }
        });


        /**
         * Set instance config if there is a config data
         */
        if (sourceData.config && instance.onReceiveConfig && typeof instance.onReceiveConfig === 'function') {
            instance.onReceiveConfig(sourceData.config.config, this);
        }


        /**
         * If singleton update instance in the data source
         */
        if (sourceData.config.singleton) {
            sourceData.config.instance = instance;
            this.dataSource.data.set(target, sourceData);
        }

        return instance;
    }
}