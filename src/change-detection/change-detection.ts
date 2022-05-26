import { HooksEnum } from "../enums/hooks.enum";
import { ComponentWrapperInstanceInterface } from "../interfaces/component-wrapper-instance.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";

export class ChangeDetection {
    private watchers: WatcherInterface[] = [];
    private conditionWatchers: WatcherInterface[] = [];
    private isConnected: boolean = false;
    private wrapper: ComponentWrapperInstanceInterface;

    constructor(componentWrapper: ComponentWrapperInstanceInterface) {
        this.wrapper = componentWrapper;
    }

    public connected() {
        this.isConnected = true;
    }

    public addWatcher(watcher: WatcherInterface, isConditionWatcher: boolean = false) {
        if (isConditionWatcher) {
            this.conditionWatchers.push(watcher);
        } else {
            this.watchers.push(watcher);
        }
    }

    public detectChanges(): void {
        if (!this.isConnected) {
            return;
        }

        let hasViewChanges: boolean = false;
        this.wrapper.hooksCaller(HooksEnum.onChangeDetection);

        this.conditionWatchers.forEach(watcher => {
            if (watcher.isConnected() && watcher.isUpdated()) {
                hasViewChanges = true;
                watcher.update(watcher.getValue());
            }
        });

        this.watchers.forEach(watcher => {
            if (watcher.isConnected() && watcher.isUpdated()) {
                hasViewChanges = true;
                watcher.update(watcher.getValue());
            }
        });

        this.watchers = this.watchers.filter(watcher => watcher.isConnected());
        this.conditionWatchers = this.conditionWatchers.filter(watcher => watcher.isConnected());

        if (hasViewChanges) {
            this.wrapper.hooksCaller(HooksEnum.onViewChange);
        }

    }
}
