## Things to keep in mind when using `react-source-of-truth`

As this library aims for maximum simplicity and small API there is no much more than reading the state and updating it.
But there is one common pitfall you need to keep in mind

### When updating the state you are dealing with Proxied objects

When you are updating the state you need to pass a selector function that points to the part of the state you want to
update. It is very similar to the selector function of `useTruthSelector` but there is a difference - `useTruthSelector`
gets your plain state object untouched. `update` method however reads the property you are reading as you go deeper and
deeper into your state.

With just an objects in your path this is straightforward:

```typescript
interface State {
    ui: {
        modal: {
            open: boolean
        }
    }
}
```

```javascript
useTruthSelector(s => s.ui.modal.open); // read value
update(s => s.ui.modal.open, p => !p); // toggle value
```

Things get complicated when you meet an array or optional property on your way:
```typescript
interface State {
    articles: Array<{ title: string; author: string }>
}
```

This works:
```javascript
useTruthSelector(s => s.articles[0].title); // gets first article title
update(s => s.articles[0].title, t => "News of the day: " + t); // prepends a text to the title
```

But this fails:
```javascript
useTruthSelector(s => s.articles.find(a => a.author === "John").title); // gets title of  first article by John - this is OK!
update(s => s.articles.find(a => a.author === "John").title, t => "News of the day: " + t); // you just messed up the state :(
```

Why? Because you are reading `articles` and then `find` property of the state. And this is the path you will be
updating. This is a trade-off for having such a simple way to update deep property of and object, keeping immutability
and full TypeScript support.

The fix:
```javascript
const state = store.getState();
const indexOfArticle = state.articles.findIndex(a => a.author === "John");
update(s => s.articles[indexOfArticle].title, t => "News of the day: " + t); // All good now
```

Another example - optional property this time:

```typescript
interface State {
    temperature: {
        kitchen?: {
            lastRead: number;
            value: number;
        },
        bedroom?: {
            lastRead: number;
            value: number;
        },
    }
}
```

This fails when current state is:
```javascript
const currentState = {
    temperature: {},
};
// ^ valid state, according to types
```


```javascript
useTruthSelector(s => s.temperature.kitchen?.value); // gets kitchen temperature or undefined
update(s => s.temperature.kitchen?.value, () => 23); // state gets messed up again
```

Again, why? Because you are reading `temperatures` and then `kichen` property of the state. `value` never gets read,
because `kitchen` wasn't there yet. So you will be setting `temperature.kitchen` path to `23`.

The fix:
```javascript
const state = store.getState();
if (!state.temperature.kitchen) {
    update(s => s.temperature.kitchen, () => ({})); // set it to empty object first
}
update(s => s.temperature.kitchen.value, () => 23); // all good now
update(s => s.temperature.kitchen.lastRead, () => Date.now()); // let's update something more
```

Don't worry about useless re-renders - if you are synchronously updating the state - it will result with just one state
update for React.

These updates are a bit troublesome, but I have some ideas how to improve the API to take account for this.
