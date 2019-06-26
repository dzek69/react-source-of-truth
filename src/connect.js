import React, { PureComponent } from "react";
import mapValues from "bottom-line-utils/mapValues";

import { ProviderContext } from "./Provider";

const connect = (mapStateToProps, mapUpdateToProps) => {
    const mapUpdate = (update, props, getState) => {
        return mapValues(mapUpdateToProps(update, props), fn => {
            return (...args) => {
                const returnValue = fn(...args);
                if (typeof returnValue === "function") {
                    returnValue(getState);
                }
            };
        });
    };

    return (BaseComponent) => {
        class WithState extends PureComponent {
            render() {
                const stateProps = mapStateToProps ? mapStateToProps(this.context.data, this.props) : null;
                // @todo update Update props only when props actually changes?
                const updateProps = mapUpdateToProps
                    ? mapUpdate(this.context.update, this.props, this.context.getState)
                    : null;

                return <BaseComponent {...this.props} {...stateProps} {...updateProps} />;
            }
        }
        WithState.displayName = "WithState(" + (BaseComponent.displayName || BaseComponent.name) + ")";
        WithState.contextType = ProviderContext;

        return WithState;
    };
};

export default connect;
