# [Basic usage](https://dzek69.github.io/react-source-of-truth/tutorial-Usage.html) with TypeScript

1. First, you need to feed your React app with state context provider:

```javascript
import React from "react";
import { Provider } from "react-source-of-truth";

import App from "./App";

export interface AppStore {
    user: {
        name: string;
        surname: string | null;
    }
}

interface AppProvider extends Provider<AppStore> { }

const defaultState: AppStore = {
    user: {
        name: "anonymous",
        surname: null
    }
};

render(() => {
   return (
       <AppProvider defaultState={defaultState}>
           <App />
       </AppProvider>
   );
});
```

2. Then you need to connect your component to a state:

```javascript
import { connect } from "react-source-of-truth";

import { AppStore } from "./Index";
import MyComponent, { MyComponentProps } from "./MyComponent";

type StateProps = "name" | "surname";
type UpdateProps = "updateName" | "deleteName";

const mapState = (state: AppStore, ownProps: Pick<MyComponentProps, StateProps>) => {
    return {
       name: state.user.name,
       surname: state.user.surname
    };
};

const mapUpdate = (update: (key: string, value: any) => void, ownProps: Pick<MyComponentProps, UpdateProps>) => {
    return {
        deleteName: () => update("user.name", null),
        updateName: newName => update("user.name", newName),
    };
};

const Connected = connect<AppStore, MyComponentProps, StateProps, UpdateProps>(mapState, mapUpdate)(MyComponent);

export default Connected;
```

3) As a last step, use and update state within your component:

```jsx harmony
import React, { Component } from "react";

export interface MyComponentProps {
    name: string; 
    surname: string;
    updateName: (name: string) => void;
    deleteName: () => void;
}

export default class MyComponent extends Component<MyComponentProps, {}> {
    constructor(props: Props) {
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
```

# Use current state when updating, update multiple values

This example demonstrates how to:
- get current state when updating
- push value to an array
- update multiple state values within one method

```javascript
import { connect } from "react-source-of-truth";

import { AppStore } from "./Index";
import MyComponent, { MyComponentProps } from "./MyComponent";

type UpdateProps = "updateName" | "deleteName";

const mapUpdate = (update: (key: string, value: any) => void, ownProps: Pick<MyComponentProps, UpdateProps>) => {
    return {
        deleteName: () => update("name", null),
        updateName(newItem: string) {
            return (getState: () => AppStore) => {
                const state: AppStore = getState();
                update("updatesCounter", state.updatesCounter + 1);
                
                const list = [...state.list];
                list.push(newItem);
                update("list", list);
            }
        }
    };
};

// use `never` when you want to ignore one of the mapper
const Connected = connect<AppStore, MyComponentProps, never, UpdateProps>(null, mapUpdate)(MyComponent);

export default Connected;
```

# Example when mapUpdate should return some value
```javascript
import { connect } from "react-source-of-truth";

interface Props {
  setVoid: (newValue: string) => void;
  setReturnNumber: (newValue: string) => number;
  setReturnNumberInPromise: (newValue: string) => Promise<number>;
  setReturnNumberInPromiseWithGetState: (newValue: string) => Promise<number>;
}

interface AppStore {
  value: string;
}

function mapUpdate(update: (key: string, value: any) => void, ownProps: Pick<Props, never>) {
  return {
    setVoid: (a: string): void => {
      update("value", a)
    },
    setReturnNumber: (a: string): number => {
      update("value", a);
      return 1;
    },
    setReturnNumberInPromise: async (a: string): Promise<number> => {
      update("value", a);
      return 2;
    },
    setReturnNumberInPromiseWithGetState: (a: string): Promise<number> => async (getState: () => AppStore): Promise<number> => {
      const state: AppStore = getState();
      update("value", a);
      return 2;
    }
  }
}

// "keyof Props" means all component props should be passed from mapUpdate
export const Connected = connect<AppStore, Props, never, keyof Props>(null, mapUpdate)(View);
```