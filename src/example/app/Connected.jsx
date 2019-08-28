import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Connected extends PureComponent {
    constructor(props) {
        super(props);
        this.renderCount = 0;
    }

    componentDidMount() {
        setInterval(() => {
            this.props.setValue(Math.random());
        }, 3000); // eslint-disable-line no-magic-numbers
    }

    render() {
        this.renderCount++;
        return (
            <div>I am pure and connected to `value`, render #{this.renderCount}, value: {this.props.value}</div>
        );
    }
}

Connected.propTypes = {
    setValue: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
};

export default Connected;
