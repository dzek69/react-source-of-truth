import React, { Component } from "react";
import PropTypes from "prop-types";

import Connected from "./Connected.container";

class SomeComponent extends Component {
    constructor(props) {
        super(props);
        this.publicValue = 123;
    }

    componentDidMount() {
        this._int = setInterval(() => {
            console.info("returned value from standard updating method", this.props.setUpper(this.props.upper + 1));
            console.info("returned value from `thunk` updating method", this.props.doSomething());
        }, 1000); // eslint-disable-line no-magic-numbers
    }

    componentWillUnmount() {
        clearInterval(this._int);
    }

    render() {
        return (
            <div>
                Some component, upper state: {this.props.upper}
                <hr />
                Connected below:
                <hr />
                <Connected prop={Math.random()} />
            </div>
        );
    }
}

SomeComponent.propTypes = {
    doSomething: PropTypes.func.isRequired,
    setUpper: PropTypes.func.isRequired,
    upper: PropTypes.number.isRequired,
};

export default SomeComponent;
