## Basic concepts of `react-source-of-truth`

Before you install the library let's overview the basic concepts by creating simple application.

> Note: The demo app we are creating here is available in `src/demo/DocsApp` in the repository of this library.

### State

> If you're familiar with any state management library you can skip to the `Preparing your application...` section.

State is a single object representing all the data your application to render your views.

You should put there:
- everything that's needed by more than one component - dark/light theme, current user data (login, name), etc.
- everything you want to keep for using later - multiple stage forms, preloading some data

You may keep using local state (`useState`/`setState`) for:
- input fields you don't want to use later
- temporary data that's needed only for one component or for a component and it's direct descendants

Basic state manager is called a `store`, just like in `redux`.

### Preparing your application to use the state

Our demo app will include four main points explaining this library basic features:
- user "authentication" - needed to greet the user, let them log in and out,
- ui state - for toggling pop up menu
- articles list
- weather widget

Preparing the app is just few simple steps:

1. If you're using TypeScript - prepare a type definition for state object.

> Example for our demo app:

```typescript
interface State {
    ui: {
        menuOpen: boolean;
    };
    user: {
        loggedIn: boolean;
        name: string;
    };
    articles: {
        isLoading: boolean;
        list: { title: string; fullContent: string; date: string }[];
    };
    weatherWidget: {
        today: string;
        tomorrow: string;
    };
}
```

2. Define default state your app will start with.

```typescript
const defaultState: State = {
    ui: {
        menuOpen: false,
    },
    articles: {
        isLoading: false,
        list: [],
    },
    user: {
        name: "",
        loggedIn: false,
    },
    weatherWidget: {
        today: "-3°C",
        tomorrow: "25°C",
    },
};
```

3. Create store and create React integration hooks and Provider.

```typescript
const store = new Truth(defaultState);
const { Provider, useTruthSelector, useTruthUpdate } = createTruth(store);
```

4. Wrap your application with `Provider`.

```typescript jsx
ReactDOM.render(
    <Provider>
        <App />
    </Provider>,
    rootElement
)
```

### Read data in the store

Use `useTruthSelector` hook to access the data. First argument is a selector function, which takes a whole state object
as an argument and should return that part of object you want to watch for changes. Component will be rendered again
when the value changes.
```typescript jsx
const MyComponent = () => {
    const loggedIn = useTruthSelector(s => s.user.loggedIn);
    return <div>User is logged in: {loggedIn ? "yes" : "no"}</div>;
}
```

### Update data in the store

`useTruthUpdate` hook returns a function you should call when you want to update a part of your state. That function
expects two arguments - first function is again a selector function - you specify which part of the state you want to
update. Second argument is again a function - it will get current value (before the desired change) as an argument and
expects you to return new value.
```typescript jsx
const MyComponent = () => {
    const update = useTruthUpdate();
    const handleLogIn = () => update( // Simulated log in handler
        s => s.user,
        () => ({ loggedIn: true, name: "Stefan" })
    );

    return <button onClick={handleLogIn}>log in</button>;
}
```

Use second argument to the `update` function for easy value toggling for example:
```typescript
const handleMenuClick = () => update(s => s.ui.menuOpen, currentValue => !currentValue);
```

> You can find all the above knowledge in a form of complete component in `src/demo/DocsApp/components/Top.tsx`.
> Take a look inside `Body.tsx` for asynchronous data loading simulation.

### More dynamic data reading

Sometimes you need to get access to the data using variables. In this case you need to specify second argument to
`useTruthSelector` - a dependencies array, just like you would do for `useMemo` or `useEffect`. This way you can
dynamically switch from which point of state you want to retrieve data.

```typescript jsx
type For = "today" | "tomorrow";

const Weather = (props) => {
    const [wfor, setFor] = useState<For>("today");
    const weather = useTruthSelector(s => {
        return s.weatherWidget[wfor];
    }, [wfor]);

    const handleForToggle = () => { setFor(p => (p === "today" ? "tomorrow" : "today")); };

    return (
        <div className={styles.weather}>
            Weather for {wfor}:
            <div>{weather}</div>
            <button onClick={handleForToggle}>Toggle</button>
        </div>
    );
};
```

> You can find the above component in `src/demo/DocsApp/components/Weather.tsx`.

### Even more details

Please check out demos/development playgrounds in `src/demo`. More tutorials are coming.
