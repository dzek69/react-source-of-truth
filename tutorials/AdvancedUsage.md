## Advanced usage of `react-source-of-truth`

Apart from `Provider`, `useTruthSelector`, `useTruthUpdate` and `connect` `createTruth` returns few more things.

### `useTruthState`

Returns the whole state object. Useful mostly for debugging.
**Always prefer useTruthSelector** because it's optimized for performance - `useTruthSelector` will skip useless
re-renders.

### `useTruthStore`

Returns the store.

Useful when you need to read the state before updating it (see `Keep That In Mind` section of the docs).

Also useful when you want to manually subscribe to the store state changes for some (usually performance
related or non-React imperative libraries integrations within a React component) reason. Subscribing for changes is
undocumented right now, but it couldn't be simpler - TypeScript will guide you.

### `store`

Your store as you passed it. Useful when you create your truth like that:

```javascript
const truth = createTruth(new Truth(defaultState));
const store = truth.store; // the store
```

In the future `createTruth` will accept the default state directly, without need for `new Truth` (which will probably
get extracted to own library for non-React usage). This will be extra useful then.

One thing I like to do within my apps is to add myself a state debug interface accessible from browser console:
```javascript
if (typeof window === "object") {
    Object.defineProperty(window, "$state", {
        get: () => store.getState(),
    });
    Object.defineProperty(window, "$store", {
        get: () => store,
    });
}
```

This allows me to take a peek into the state on production when something goes wrong.

### `ProviderContext`

Just in case you want to manually access the context stuff.
