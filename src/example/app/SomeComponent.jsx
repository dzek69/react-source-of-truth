import React, { Component } from "react";
import PropTypes from "prop-types";

import Connected from "./Connected.container";

class SomeComponent extends Component {
    constructor(props) {
        super(props);
        this.publicValue = 123;
    }

    componentDidMount() {
        setInterval(() => {
            this.props.setUpper(this.props.upper + 1);
        }, 1000); // eslint-disable-line no-magic-numbers
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
    setUpper: PropTypes.func.isRequired,
    upper: PropTypes.number.isRequired,
};

export default SomeComponent;
