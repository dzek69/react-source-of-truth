import React, { PureComponent } from "react";
import mapValues from "bottom-line-utils/mapValues";

import { ProviderContext } from "./Provider";

const shallowDiffers = (a, b) => {
    for (const i in a) {
        if (!(i in b)) { return true; }
    }
    for (const i in b) {
        if (a[i] !== b[i]) {
            return true;
        }
    }
    return false;
};

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
            componentDidUpdate(prevProps, prevState, snapshot) {
                if (shallowDiffers(prevProps, this.props)) { // update mapUpdate results when props changes
                    this._updateMapUpdate();
                }
            }

            // this prevents mapUpdateToProps to be called again when props didn't change
            // as a result this prevents mapUpdateToProps to return different methods when it's not needed,
            // allowing PureComponent optimization to work
            get mapUpdateValue() {
                if (!this._mapUpdate) { // if mapUpdate result isn't saved yet - update it
                    this._updateMapUpdate();
                }
                return this._mapUpdate;
            }

            _updateMapUpdate() {
                this._mapUpdate = mapUpdateToProps && mapUpdate(this.context.update, this.props, this.context.getState);
            }

            render() {
                const stateProps = mapStateToProps ? mapStateToProps(this.context.data, this.props) : null;
                const updateProps = mapUpdateToProps ? this.mapUpdateValue : null;

                return <BaseComponent {...this.props} {...stateProps} {...updateProps} />;
            }
        }
        WithState.displayName = "WithState(" + (BaseComponent.displayName || BaseComponent.name) + ")";
        WithState.contextType = ProviderContext;

        return WithState;
    };
};

export default connect;
