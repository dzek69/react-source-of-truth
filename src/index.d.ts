import * as React from "react";

declare module "react-source-of-truth" {
  type AnyFunc = (...args: any[]) => any;

  type BasicStore = {
    [key: string]: any;
  }

  export type UpdateFn = (key: string, value: any) => void;

  type ReplaceFn = () => void;

  type GetStateFn<S> = () => S;

  type ProviderContext<S> = {
    data: S;
    update: UpdateFn;
    replace: ReplaceFn;
    getState: GetStateFn<S>;
  }

  type ProviderProps<S> = {
    defaultState: S;
    children: React.ReactNode;
  }

  type ProviderState<S> = {
    context: ProviderContext<S>;
  }

  type MapUpdateGetStateFn<F, S> = F extends AnyFunc
    ? (...params: Parameters<F>) => (getState: GetStateFn<S>) => ReturnType<F>
    : F;

  type MapUpdate<S, UP> = {
    [K in keyof UP]: UP[K] | MapUpdateGetStateFn<UP[K], S>;
  }

  export class Provider<S = BasicStore> extends React.Component<ProviderProps<S>, ProviderState<S>> { }

  export function connect<S, P, SP extends keyof P, UP extends keyof P>(
    mapState: ((state: S, ownProps: Omit<P, SP | UP>) => Pick<P, SP>) | null,
    mapUpdate: ((update: UpdateFn, ownProps: Omit<P, SP | UP>) => MapUpdate<S, Pick<P, UP>>) | null
  ): (Component: React.ComponentType<P>) => React.ComponentType<Omit<P, SP | UP>>
}
