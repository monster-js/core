import { DataSourceDataInterface } from "../interfaces/data-source-data.interface";
import { DataSourceInterface } from "../interfaces/data-source.interface";
import { DIConfigInterface } from "../interfaces/di-config.interface";
import { GlobalDataSource } from "./global-data-source";

export class Container {

    private dataSource: DataSourceInterface;

    constructor(dataSource: DataSourceInterface) {
        this.dataSource = dataSource;
    }

    public mock(target: new (...args: any[]) => any, mock: any) {
        const data = this.getSource(target);
        data.mock = mock;
        this.update(target, data);
    }

    public getSource<T>(target: T): DataSourceDataInterface {
        return this.dataSource.data.get(target)!;
    }

    public update(target: new (...args: any[]) => any, config: DataSourceDataInterface) {
        this.dataSource.data.set(target, config);
    }

    public register(target: new (...args: any[]) => any, config: DIConfigInterface) {
        /**
         * If condition is to prevent overriding single data
         */
        if (config.singleton) {
            const source = this.getSource(target);
            if (!source) {
                this.dataSource.data.set(target, { target, config });
            }
        } else {
            this.dataSource.data.set(target, { target, config });
        }
    }

    public resolve<T = any>(target: new (...args: any[]) => T, customParent?: any): T {
        let sourceData: DataSourceDataInterface = this.dataSource.data.get(target)!;


        /**
         * If there is a mock data
         * then, return the mock data
         */
        if (sourceData?.mock) {
            return sourceData.mock;
        }


        /**
         * Check if class is registered in the container
         */
        if (!sourceData) {

            const globalSource = new GlobalDataSource();
            if (globalSource === this.dataSource) {
                throw `${target.name} is not registered in global dependency injection container.`;
            }

            const di = new Container(globalSource);
            sourceData = di.getSource(target);

            if (!sourceData) {
                throw `${target.name} is not registered in ${this.dataSource.name} and in global dependency injection container.`;
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
         * instance will receive the custom parent if there is a custom parent
         * and the instance has onReceiveParent hook
         */
        if (instance.onReceiveParent && typeof instance.onReceiveParent === 'function') {
            instance.onReceiveParent(customParent);
        }


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
            this.dataSource.data.set(target, {
                ...sourceData,
                config: {
                    ...sourceData.config,
                    instance: instance
                }
            });
        }

        return instance;
    }
}