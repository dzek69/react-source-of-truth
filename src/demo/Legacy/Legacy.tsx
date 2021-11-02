import React from "react";

import { Provider } from "../basicTruth";
import { Name } from "./Name";

const Legacy = () => {
    return (
        <Provider>
            <Name />
        </Provider>
    );
};

export { Legacy as LegacyStateDemo };

