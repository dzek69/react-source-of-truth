import React, { createContext, Component } from "react";
import PropTypes from "prop-types";
import { setImmutable } from "bottom-line-utils";

const defaultData = {};
const defaultMethod = () => {
    throw new Error("Provider is not mounted");
};

const ProviderContext = createContext({
    data: defaultData,
    update: defaultMethod,
    replace: defaultMethod,
});

class Provider extends Component {
    constructor(props) {
        super(props);

        const defaultState = props.defaultState || defaultData;

        const update = this._update.bind(this);
        const replace = this._replace.bind(this);
        const getState = this._getState.bind(this);

        const context = {
            data: defaultState,
            update: update,
            replace: replace,
            getState: getState,
        };

        this.state = {
            context,
        };

        this._data = defaultState;
    }

    _replace() {
        this.setState((prevState) => {
            return {
                context: {
                    ...prevState.context,
                    data: this._data,
                },
            };
        });
    }

    _update(key, value) {
        this._data = setImmutable(this._data, key, value);
        this._replace();
    }

    _getState() {
        return this._data;
    }

    render() {
        return (
            <ProviderContext.Provider value={this.state.context}>
                {this.props.children}
            </ProviderContext.Provider>
        );
    }
}

Provider.propTypes = {
    children: PropTypes.node.isRequired,
    defaultState: PropTypes.object.isRequired,
};

export default Provider;

export {
    ProviderContext,
};
