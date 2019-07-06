import React from "react";

import { Provider } from "../..";
import SomeComponent from "./SomeComponent.container";

const defaultState = {
    value: Math.random(),
    upper: 1,
};

const App = () => {
    return (
        <Provider defaultState={defaultState}>
            <SomeComponent />
        </Provider>
    );
};

export default App;
