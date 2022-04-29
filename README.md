# react-source-of-truth

The simplest state manager for React apps. API ideas are based on `react-redux` but huge simplifications are applied.

## Features:

- simplicity - no actions, no reducers
- simplicity again - your state is just a plain javascript object
- performant - no "everywhere writable" state using Proxies or other hacks
- performant again - component will re-render only if something they care for changes
- developer friendly - full & painless TypeScript support
- compatible - both hooks & class based components support
- familiar - API is based on `react-redux` API
- convenient - easily update deep state while keeping immutability rule of React (thanks to awesome `immutable-assign`)

## Usage:

See: [Docs][docs]

## License:

MIT

[docs]: https://dzek69.github.io/react-source-of-truth/pages/Tutorials/BasicConcepts.html
