import React from "react";
import { Provider } from "./state";
// eslint-disable-next-line @typescript-eslint/no-shadow
import { Body } from "./components/Body";
import { Top } from "./components/Top";

interface Props {}

const DocsApp: React.FC<Props> = (props) => {
    return (
        <Provider>
            <Top />
            <Body />
        </Provider>
    );
};

export { DocsApp };
