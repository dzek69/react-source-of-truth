import { remove } from "bottom-line-utils";
import iassign from "immutable-assign";

type Listener<S> = (s: S) => void;

// @TODO freeze state on dev
class Truth<State> {
    private readonly _listeners: Listener<State>[];

    private _state: State;

    public constructor(initialState: State) {
        this._listeners = [];
        this._state = initialState;

        iassign.setOption({ ignoreIfNoChange: true });
    }

    public addChangeListener(fn: Listener<State>) {
        if (this._listeners.includes(fn)) {
            return;
        }
        this._listeners.push(fn);
    }

    public removeChangeListener(fn: Listener<State>) {
        remove(this._listeners, (item) => item === fn);
    }

    private _notify() {
        this._listeners.forEach(fn => { fn(this._state); });
    }

    public update = <TProp>(deepSelector: (state: State) => TProp, setter: (oldVal: TProp) => TProp) => {
        if (process.env.NODE_ENV !== "production") {
            if (typeof deepSelector !== "function") {
                throw new TypeError(
                    "`react-source-of-truth` update function expected function as a first argument. "
                    + "If you are updating from v1 take note this single API is not backwards compatible. "
                    + "Please refer to the docs on how to upgrade your code.");
            }
        }

        const newState = iassign(this._state, deepSelector, setter);
        if (newState !== this._state) {
            this._state = newState;
            this._notify();
        }
        return newState;
    };

    public replace = (newState: State) => {
        if (newState !== this._state) {
            this._state = newState;
            this._notify();
        }
        return newState;
    };

    public getState = () => this._state;
}

export {
    Truth,
};
