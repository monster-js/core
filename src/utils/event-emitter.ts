import { EventEmitter as OriginalEventEmitter } from 'events';
import { ObservableInterface } from '../interfaces/observable.interface';
import { SubscriptionInterface } from '../interfaces/subscription.interface';
import { Service } from "../service/service.decorator";

interface SelectInterface<T> extends ObservableInterface<T> {
    emit: (value?: T) => void;
}

@Service()
export class EventEmitter {

	private readonly eventEmitter: OriginalEventEmitter;
    private readonly event: string = 'ALL_EVENTS';
    private selectedEvent: string = null!;

	constructor() {
        this.eventEmitter = new OriginalEventEmitter();
	}

    public emit(value: any = null): void {
        this.eventEmitter.emit(this.event, value);
    }

    public subscribe(callback: (event: any) => void): SubscriptionInterface {
		this.eventEmitter.on(this.event, callback);
        return {
            unsubscribe: () => {
            	this.eventEmitter.on(this.event, callback);	
            }
        };
    }

    private selectedEmit(value: any = null): void {
        this.eventEmitter.emit(this.selectedEvent, value);
    }

    private selectedSubscribe(callback: (event: any) => void): SubscriptionInterface {
        const key = this.selectedEvent;
		this.eventEmitter.on(key, callback);
        return {
            unsubscribe: () => {
            	this.eventEmitter.on(key, callback);	
            }
        };
    }

    public select<T>(key: string): SelectInterface<T> {
        this.selectedEvent = key;
        return {
            subscribe: this.selectedSubscribe.bind(this),
            emit: this.selectedEmit.bind(this)
        }
    }
}
