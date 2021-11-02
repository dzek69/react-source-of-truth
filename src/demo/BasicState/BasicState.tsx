import React from "react";
import { Provider } from "../basicTruth";
import { Name } from "./Name";
import { List } from "./List";

const BasicStateDemo = () => {
    return (
        <Provider>
            <Name />
            <List />
        </Provider>
    );
};

export { BasicStateDemo };
