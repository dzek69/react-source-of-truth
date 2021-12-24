import React, { useEffect } from "react";

import type { State } from "../basicTruth";
import { useTruthUpdate } from "../basicTruth";
import { Item } from "./Item";

const ELEMS_COUNT = 30;

const BigList = () => {
    const update = useTruthUpdate();
    // const objects = useTruthSelector(s => s.objects);

    useEffect(() => {
        const items: State["objects"] = [];
        for (let i = 0; i < ELEMS_COUNT; i++) {
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            items.push({ vote: Math.random() > 0.5, id: i });
        }

        update(s => s.objects, () => items);
    }, []);

    const elems: ReturnType<typeof React.createElement>[] = [];
    for (let i = 0; i < ELEMS_COUNT; i++) {
        elems.push(<Item key={i} id={i} />);
    }

    return (
        <div>
            {elems}
        </div>
    );
};

export { BigList };
