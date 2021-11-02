import { Truth } from "../truth";
import { createTruth } from "../index";

interface State {
    name: string;
    list: number[];
}

const defaultState: State = {
    name: "Unnamed",
    list: [],
};

const store = new Truth(defaultState);

const { Provider, useTruthSelector, useTruthState, useTruthUpdate, connect } = createTruth(store);

export {
    Provider,
    useTruthSelector,
    useTruthState,
    useTruthUpdate,
    connect,
};

export type {
    State,
};
