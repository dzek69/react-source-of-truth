import { connect } from "../..";

import SomeComponent from "./SomeComponent";

const mapState = (state, ownProps) => {
    return {
        upper: state.upper,
    };
};

const mapUpdate = (update, ownProps) => {
    return {
        setUpper: value => {
            update("upper", value);
            return "test value, could be a Promise";
        },
        doSomething: value => getState => {
            return "i did nothing, but still returned a value";
        },
    };
};

const Connected = connect(mapState, mapUpdate)(SomeComponent);

export default Connected;
