# react-source-of-truth

Simple `react-redux`-alike library for handling single-source-of-truth state in your React Application.

# WARNING

> You are looking at rewritten library with new ideas in alpha state. Beware of API changes before stabilizing.
>
> Outdated docs ahead!

## Features:

- the simplest single source of truth management for your React application,
- no actions, no reducers, just select the data you need and update the deep plain object when needed
- full TypeScript support (except legacy `connect` method)
- both hooks & legacy React support
- legacy code is based on well-known `react-redux`'s `connect`
- no need to re-built half of your state to keep objects immutability rule of React thanks to awesome `immutable-assign`

## Usage:

See: [Docs][docs]

## License:

MIT

[docs]: https://dzek69.github.io/react-source-of-truth/tutorial-Usage.html
