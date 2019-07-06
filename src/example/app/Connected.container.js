import { connect } from "../..";

import Connected from "./Connected";

const mapState = (state, ownProps) => {
    return {
        value: state.value,
    };
};

const mapUpdate = (update, ownProps) => {
    return {
        setValue: number => update("value", number),
    };
};

const ConnectedComponent = connect(mapState, mapUpdate)(Connected);

export default ConnectedComponent;
