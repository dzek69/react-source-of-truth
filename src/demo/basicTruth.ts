import { Truth } from "../truth";
import { createTruth } from "../index";

interface State {
    name: string;
    list: number[];
    objects: {id: number; vote: boolean}[];

    number1: number;
    number2: number;
}

const defaultState: State = {
    name: "Unnamed",
    list: [],
    objects: [],

    number1: 23,
    number2: 69,
};

const store = new Truth(defaultState);

const { Provider, useTruthSelector, useTruthState, useTruthUpdate, useTruthStore, connect } = createTruth(store);

export {
    Provider,
    useTruthSelector,
    useTruthState,
    useTruthUpdate,
    useTruthStore,
    connect,
};

export type {
    State,
};
