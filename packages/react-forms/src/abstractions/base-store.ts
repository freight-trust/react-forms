import { ActionEmitter } from "action-emitter";
import { EventSubscription } from "fbemitter";
import { ListenerFunction } from "action-emitter/@types/action-emitter";

import { HydratableStore } from "../contracts/store";
import { StoreStateChanged } from "../actions/store-actions";

export type StoreSetStateHandler<TState> = (state: TState) => TState;

export abstract class BaseStore<TState, THydrate> implements HydratableStore<THydrate> {
    //#region Emitter
    private emitter: ActionEmitter = new ActionEmitter();

    protected getEmitter(): ActionEmitter {
        return this.emitter;
    }

    /**
     * Register a specific callback to be called on a particular action event.
     * A subscription is returned that can be called to remove the listener.
     *
     * @param actionClass Action class function.
     * @param listener Listener callback function.
     */
    public addListener<TAction>(actionClass: Function, listener: ListenerFunction<TAction>): EventSubscription {
        return this.emitter.addListener(actionClass, listener);
    }
    //#endregion

    //#region State
    /**
     * State object is private so it's only being updated through `setState` method.
     */
    private state: TState = this.getInitialState();

    /**
     * Constructs the initial state for this store.
     * This is called once during construction of the store.
     */
    protected abstract getInitialState(): TState;

    /**
     * Updates store state and emits given action and `StoreStateChanged` action.
     * @param action Given action that will be emitted.
     * @param handler State update handler.
     */
    protected setState(handler: StoreSetStateHandler<TState>, ...actions: any[]): void {
        const nextState = handler(this.state);
        if (nextState === this.state) {
            return;
        }
        this.state = nextState;

        for (const action of actions) {
            this.emitter.emit(action);
        }
        this.emitter.emit(new StoreStateChanged());
    }

    protected getState(): TState {
        return this.state;
    }

    public abstract hydrate(data: THydrate): void;
    public abstract dehydrate(): THydrate;
    //#endregion
}