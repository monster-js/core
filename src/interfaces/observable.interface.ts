import { SubscriptionInterface } from "./subscription.interface";

export interface ObservableInterface<T = any> {
    subscribe: (callback: (value?: T) => void) => SubscriptionInterface;
}
