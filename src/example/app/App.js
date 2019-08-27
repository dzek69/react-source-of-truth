import React, { Component, createRef } from "react";

import { Provider } from "../..";
import SomeComponent from "./SomeComponent.container";

const defaultState = {
    value: Math.random(),
    upper: 1,
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            publicValue: null,
        };

        this._someRef = createRef();
    }

    componentDidMount() {
        this.setState({ // eslint-disable-line react/no-did-mount-set-state
            publicValue: this._someRef.current.publicValue,
        });
    }

    render() {
        return (
            <Provider defaultState={defaultState}>
                <SomeComponent ref={this._someRef} />
                <div>public value from ref: {this.state.publicValue} </div>
            </Provider>
        );
    }
}

export default App;
