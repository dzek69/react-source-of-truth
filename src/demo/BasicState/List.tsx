import React, { useCallback } from "react";
import { useTruthSelector, useTruthUpdate } from "../basicTruth";

let i = 0;

const List = () => {
    const list = useTruthSelector(s => s.list);
    const u = useTruthUpdate();

    const numbers = list.length ? <ul>{list.map(l => <li key={l}>{l}</li>)}</ul> : "none";

    const handleClick = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        u(s => s.list, nums => [...nums, Math.round(Math.random() * 100)]);
    }, []);

    return (
        <fieldset>
            <legend>This section was rendered {++i} times</legend>
            <div>
                Hi.
                Look at this list of numbers:
                {numbers}
                <br /><br />
                <button onClick={handleClick}>Add number</button>
            </div>
        </fieldset>
    );
};

export { List };
