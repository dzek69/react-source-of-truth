// eslint-disable-next-line max-len
/* eslint-disable react/no-multi-comp,react/jsx-no-bind,@typescript-eslint/no-confusing-void-expression,no-confusing-arrow,react/jsx-handler-names */
import React, { useState } from "react";
import { Truth } from "../../truth";
import { createTruth } from "../../createTruth";
import styles from "./App.module.scss";

// This is TO DO MVC example app. It doesn't follow some naming and structure rules, but does the same for the end user
// TODO (hehe) styles

interface State {
    todos: { text: string; done?: boolean; id: number }[];
}
const defaultState: State = { todos: [] };
const store = new Truth(defaultState);
const { Provider, useTruthSelector, useTruthUpdate } = createTruth(store);

const Item: React.FC<{ id: number}> = ({ id }) => {
    const [text, setText] = useState<string | null>(null);

    const todo = useTruthSelector(s => s.todos.find(t => t.id === id), [id]);
    const update = useTruthUpdate();

    const handleTick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        update(s => s.todos, p => p.map(t => t.id === todo!.id ? { ...t, done: e.target.checked } : t));
    };

    const handleEdit = () => setText(todo!.text);

    const remove = () => update(s => s.todos, p => p.filter(t => t.id !== id));

    const editDone = () => {
        if (!text?.trim()) { return remove(); }
        update(s => s.todos, p => p.map(t => t.id === todo!.id ? { ...t, text: text.trim() } : t));
        setText(null);
    };

    const checkEsc: React.KeyboardEventHandler = (e => {
        if (e.key === "Escape") {
            setText(null);
            e.preventDefault();
        }
    });

    const elem = text === null
        ? <span onDoubleClick={handleEdit}>{todo!.text}</span>
        : (
            <form onSubmit={editDone}>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={checkEsc}
                    onBlur={editDone}
                    autoFocus={true}
                />
                <button />
            </form>
        );

    return (
        <div className={styles.todo}>
            <input type={"checkbox"} onChange={handleTick} checked={todo!.done} />
            {elem}
            <button onClick={remove}>X</button>
        </div>
    );
};

const Todos = () => {
    const [text, setText] = useState("");
    const [filteredState, setFilteredState] = useState<undefined | boolean>(undefined);
    const update = useTruthUpdate();
    const todos = useTruthSelector(s => s.todos);

    const checkedTodos = todos.filter(t => t.done);
    const allChecked = checkedTodos.length === todos.length;

    const handleAdd: React.FormEventHandler = (e) => {
        e.preventDefault();
        if (!text.trim()) { return; }
        update(s => s.todos, p => [{ text: text.trim(), id: Math.random() }, ...p]);
        setText("");
    };

    const handleCheckAll = () => update(s => s.todos, p => p.map(t => ({ ...t, done: !allChecked })));
    const handleClearCompleted = () => update(s => s.todos, p => p.filter(t => !checkedTodos.includes(t)));

    const filteredTodos = filteredState == null ? todos : todos.filter(t => Boolean(t.done) === filteredState);
    const todosList = filteredTodos.map((t, k) => <Item key={t.id} id={t.id} />);
    const clearButton = checkedTodos.length > 0 && <button onClick={handleClearCompleted}>clear completed</button>;

    return (
        <div>
            <form onSubmit={handleAdd}>
                <input
                    type={"checkbox"}
                    onClick={handleCheckAll}
                    checked={todos.length > 0 && allChecked}
                    disabled={todos.length === 0}
                />
                <input
                    placeholder={"what needs to be done?"}
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    autoFocus={true}
                />
                <button />
            </form>
            {todosList}
            {todos.length - checkedTodos.length} items left
            <button onClick={() => setFilteredState(undefined)}>all</button>
            <button onClick={() => setFilteredState(false)}>active</button>
            <button onClick={() => setFilteredState(true)}>completed</button>
            {clearButton}
        </div>
    );
};

const TodoApp = () => {
    return <Provider><Todos /></Provider>;
};

export {
    TodoApp,
};
