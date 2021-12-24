import React, {
    Component,
    PureComponent,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { mapValues } from "bottom-line-utils";
import type { PropsWithChildren } from "react";

import type { Truth } from "./truth";
import type { MapUpdate } from "./types";
import { shallowDiffers } from "./shallowDiffers.js";

interface State<StoreState> {
    data: StoreState;
    update: Truth<StoreState>["update"];
    getState: Truth<StoreState>["getState"];
    replace: Truth<StoreState>["replace"];
}

const initialMethod = () => {
    throw new Error("Source of truth provider not found");
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint,max-lines-per-function
const createTruth = <StoreState extends unknown>(store: Truth<StoreState>): {
    Provider: typeof Component;
    ProviderContext: React.Context<State<StoreState>>;
    store: Truth<StoreState>;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
    useTruthSelector: <TProp extends unknown>(selector: (s: StoreState) => TProp, deps?: unknown[]) => TProp;
    useTruthState: () => StoreState;
    useTruthStore: () => Truth<StoreState>;
    useTruthUpdate: () => Truth<StoreState>["update"];
    connect: <ConnectedComponentProps,
        PropsFromState extends keyof ConnectedComponentProps,
        PropsFromUpdate extends keyof ConnectedComponentProps,
    >(
        BaseComponent: React.ComponentType<ConnectedComponentProps>,
        mapStateToProps?: ((
            s: StoreState,
            p: Omit<ConnectedComponentProps, PropsFromState | PropsFromUpdate>
        ) => Pick<ConnectedComponentProps, PropsFromState>) | undefined | null,
        mapUpdateToProps?: ((
            u: Truth<StoreState>["update"],
            p: Omit<ConnectedComponentProps, PropsFromState | PropsFromUpdate>
        ) => MapUpdate<StoreState, Pick<ConnectedComponentProps, PropsFromUpdate>>) | undefined | null,
    ) => React.ComponentType<
    Omit<ConnectedComponentProps, PropsFromState | PropsFromUpdate>
    >;
} => {
    const ProviderContext = createContext<State<StoreState>>({
        data: store.getState(),
        update: initialMethod,
        replace: initialMethod,
        getState: initialMethod,
    });

    class Provider extends Component<PropsWithChildren<{ [key: string]: never }>, State<StoreState>> {
        public constructor(props: PropsWithChildren<{ [key: string]: never }>) {
            super(props);

            this.state = {
                data: store.getState(),
                // eslint-disable-next-line react/no-unused-state
                update: store.update,
                // eslint-disable-next-line react/no-unused-state
                replace: store.replace,
                // eslint-disable-next-line react/no-unused-state
                getState: store.getState,
            };
        }

        public componentDidMount() {
            const state = store.getState();
            if (this.state.data !== state) { // idk if that's possible, changing state between instance init and mount
                // eslint-disable-next-line react/no-did-mount-set-state
                this.setState({ data: state });
            }

            store.addChangeListener(this._onStateChange);
        }

        public componentWillUnmount() {
            store.removeChangeListener(this._onStateChange);
        }

        private readonly _onStateChange = (state: StoreState) => {
            this.setState({ data: state });
        };

        public render() {
            return (
                <ProviderContext.Provider value={this.state}>
                    {this.props.children}
                </ProviderContext.Provider>
            );
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
    const useTruthSelector = <TProp extends unknown>(
        selector: (state: StoreState) => TProp, ...args: [unknown[]] | []
    ) => {
        const initState = selector(store.getState());

        const [cache] = useState<{ prev: TProp }>({ prev: initState });
        const [s, ss] = useState<TProp>(initState);

        const deps = args.length === 0 ? [] : args[0];
        useEffect(() => {
            const listener = (newState: StoreState) => {
                const next = selector(newState);
                if (next === cache.prev) {
                    return;
                }
                cache.prev = next;
                ss(next);
            };

            store.addChangeListener(listener);

            return () => { store.removeChangeListener(listener); };
        }, deps);

        return s;
    };

    const useTruthState = () => {
        const p = useContext(ProviderContext);
        return p.data;
    };

    const useTruthUpdate = () => store.update;

    const useTruthStore = () => store;

    // eslint-disable-next-line max-lines-per-function
    const connect = <
        ConnectedComponentProps,
        PropsFromState extends keyof ConnectedComponentProps,
        PropsFromUpdate extends keyof ConnectedComponentProps,
    >(
        BaseComponent: React.ComponentType<ConnectedComponentProps>,
        mapStateToProps?: ((
            s: StoreState,
            p: Omit<ConnectedComponentProps, PropsFromState | PropsFromUpdate>
        ) => Pick<ConnectedComponentProps, PropsFromState>) | undefined | null,
        mapUpdateToProps?: ((
            u: Truth<StoreState>["update"],
            p: Omit<ConnectedComponentProps, PropsFromState | PropsFromUpdate>
        ) => MapUpdate<StoreState, Pick<ConnectedComponentProps, PropsFromUpdate>>) | undefined | null,
    ): React.ComponentType<Omit<ConnectedComponentProps, PropsFromState | PropsFromUpdate>> => {
        const mapUpdate = (props: ConnectedComponentProps) => {
            return mapValues(mapUpdateToProps!(store.update, props), fn => {
                return (...args: unknown[]) => {
                    // @ts-expect-error TODO let's ignore internal issues as long as outside types are correct
                    const returnValue = fn(...args) as unknown;
                    if (typeof returnValue === "function") {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        return returnValue(store.getState);
                    }
                    return returnValue;
                };
            });
        };

        // eslint-disable-next-line react/no-multi-comp
        class WithState extends PureComponent<ConnectedComponentProps & {
            _forwardedRef: React.ForwardedRef<Component>;
        }> {
            // eslint-disable-next-line react/static-property-placement
            public static readonly displayName = `WithState(${BaseComponent.displayName || BaseComponent.name})`;

            // eslint-disable-next-line react/static-property-placement
            public static readonly defaultProps = {
                _forwardedRef: null,
            };

            public componentDidMount() {
                store.addChangeListener(this._handleStateChange);
            }

            public componentDidUpdate(prevProps: ConnectedComponentProps) {
                if (shallowDiffers(prevProps, this.props)) { // update mapUpdate results when props changes
                    this._updateMapUpdate();
                }
            }

            public componentWillUnmount() {
                store.removeChangeListener(this._handleStateChange);
            }

            private _mapUpdate?: ReturnType<typeof mapUpdate>;

            private readonly _handleStateChange = () => {
                this.forceUpdate();
            };

            // this prevents mapUpdateToProps to be called again when props didn't change
            // as a result this prevents mapUpdateToProps to return different methods when it's not needed,
            // allowing PureComponent optimization to work
            private get mapUpdateValue() {
                if (!this._mapUpdate) { // if mapUpdate result isn't saved yet - update it
                    this._updateMapUpdate();
                }
                return this._mapUpdate;
            }

            private _updateMapUpdate() {
                if (mapUpdateToProps) {
                    this._mapUpdate = mapUpdate(this.props);
                }
            }

            public render() {
                const stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : null;
                const updateProps = mapUpdateToProps ? this.mapUpdateValue : null;

                const { _forwardedRef, ...props } = this.props;

                // @ts-expect-error Whatever TS (TODO?)
                return <BaseComponent {...props} {...stateProps} {...updateProps} ref={_forwardedRef} />;
            }
        }

        const WithStateAndRef = React.forwardRef((props, ref) => {
            // @ts-expect-error TODO but let's ignore it for now
            return <WithState {...props} _forwardedRef={ref} />;
        });
        WithStateAndRef.displayName = "WithState+ref(" + (BaseComponent.displayName || BaseComponent.name) + ")";
        // @ts-expect-error TODO but let's ignore it for now
        return WithStateAndRef;
    };

    return {
        Provider,
        ProviderContext,
        store,
        // @ts-expect-error it must be like that - public api should "see" only one arg to optionally give but I need
        // to read if it was given or not
        useTruthSelector,
        useTruthState,
        useTruthUpdate,
        useTruthStore,
        connect,
    };
};

export { createTruth };
