// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunc = (...args: any[]) => any; // @TODO?
type GetStateFn<S> = () => S;

type MapUpdateGetStateFn<SingleUpdateProp, AppState> = SingleUpdateProp extends AnyFunc
    ? (...params: Parameters<SingleUpdateProp>) => (getState: GetStateFn<AppState>) => ReturnType<SingleUpdateProp>
    : SingleUpdateProp;

type MapUpdate<AppState, UpdateProps> = {
    [K in keyof UpdateProps]: UpdateProps[K] | MapUpdateGetStateFn<UpdateProps[K], AppState>;
};

export type {
    AnyFunc,
    GetStateFn,
    MapUpdateGetStateFn,
    MapUpdate,
};
