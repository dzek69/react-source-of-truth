import { Truth } from "../../../truth";
import { createTruth } from "../../../createTruth";
import { defaultState } from "./defaultState";

const store = new Truth(defaultState);

const { Provider, useTruthSelector, useTruthUpdate } = createTruth(store);

export {
    useTruthSelector,
    useTruthUpdate,
    Provider,
};
