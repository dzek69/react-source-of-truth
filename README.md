# react-source-of-truth

Simple `react-redux`-alike library for handling single-source-of-truth state in your React Application.

## Features:

- the simplest possible api to pass deep state to your components
- the simplest possible api to update deep state from your components
- based on well-known `react-redux` `connect` and `Provider`
- no actions, no reducers
- no need to re-built half of your state to keep objects immutability rule of React, just pass a path to a value when
updating
- Less than 2,5kB of code (minified from source, excluding external dependency, which is also small), exactly 1024 bytes
gzipped

## Usage:

See: [Docs][docs]

## FAQ:

> Why use `connect` instead of passing whole state all the time?
- For performance. You are able to re-render your components only when data actually used by these component changes.

> How to get current state when updating it?
- Something like redux-thunk is built-in into `react-source-of-truth`. Your updating function should return another
function. It will be called with `getState` method. See [Docs][docs] for details.

> How to use `update` to add a value to an array?
- Currently you have to do it manually. See [Docs][docs].

## License:

MIT

[docs]: https://dzek69.github.io/react-source-of-truth/tutorial-Usage.html
