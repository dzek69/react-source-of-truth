import React, { useCallback } from "react";
import { useTruthSelector, useTruthStore, useTruthUpdate } from "../basicTruth";

interface Props {
    id: number;
}

const Item: React.FC<Props> = (props) => {
    const objects = useTruthSelector(s => s.objects);
    const update = useTruthUpdate();
    const store = useTruthStore();

    const vote = Boolean(objects.find(o => o.id === props.id)?.vote);

    const handleToggle = useCallback(() => {
        const idx = store.getState().objects.findIndex(o => o.id === props.id);
        if (idx >= 0) {
            update(s => s.objects[idx].vote, v => !v);
        }
    }, []);

    return (
        <fieldset>
            <legend>Item {props.id}</legend>
            <div>
                Blah blah, vote: {vote ? "UP" : "DOWN"}
                <button onClick={handleToggle}>Toggle vote</button>
            </div>
        </fieldset>
    );
};

export { Item };
