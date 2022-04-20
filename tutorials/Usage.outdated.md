# BEWARE!!!

> This tutorial is outdated. It is describing legacy API, which changed a bit. This will be updated in the future and
> it's left here because it may be still useful, even if partially invalid.

# Basic usage

You need three steps to use single source of truth in your app:

1) First, you need to feed your React app with state context provider:

To the main rendered of root of your app add something like this:
```javascript
import React from "react";
import { Provider } from "react-source-of-truth";

import App from "./App"; // this is your app main component

// define default state
const defaultState = {
    user: {
        name: "anonymous"
    }
};

// render to DOM or export or whatever your app do with root component
render(() => {
   return (
       <Provider defaultState={defaultState}>
           <App />
       </Provider>
   );
});
```

2) Then you need to connect your component to a state:

Create a file (shown below) or connect in the same file as your component:
```javascript
import { connect } from "react-source-of-truth";

import MyComponent from "./MyComponent";

const mapState = (state, ownProps) => {
    return {
       name: state.user.name
    };
};

const mapUpdate = (update, ownProps) => {
    return {
        updateName: newName => update("user.name", newName),
    };
};

const Connected = connect(mapState, mapUpdate)(MyComponent);

export default Connected;
```

3) As a last step, use and update state within your component:

```jsx harmony
import React, { Component } from "react";

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.load = this.load.bind(this);
    }

    load() {
        api.load().then(user => { // imagine this is an api call
            this.props.updateName(user.name);
        })
    }

    render() {
        return (
            <>
                <div>Hello {this.props.name}</div>
                <button onClick={this.load}>Load user info</button>
            </>
        );
    }
}

MyComponent.propTypes = {};

export default MyComponent;
```

# Use current state when updating, update multiple values

This example demonstrates how to:
- get current state when updating
- push value to an array
- update multiple state values within one method

Let's assume:
```javascript
const defaultState = {
    list: [],
    updatesCounter: 1,
};
```

This is how connector would look like:
```javascript
import { connect } from "react-source-of-truth";

import MyComponent from "./MyComponent";

const mapUpdate = (update, ownProps) => {
    return {
        pushAndUpdate(newItem) {
            return (getState) => {
                const state = getState();
                update("updatesCounter", state.updatesCounter + 1);

                const list = [...state.list];
                list.push(newItem);
                update("list", list);
            }
        }
    };
};

const Connected = connect(null, mapUpdate)(MyComponent);

export default Connected;
```
