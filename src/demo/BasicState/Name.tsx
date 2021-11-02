import type { ChangeEvent } from "react";
import React, { useCallback } from "react";
import { useTruthState, useTruthUpdate } from "../basicTruth";

let i = 0;

const Name = () => {
    const t = useTruthState();
    const u = useTruthUpdate();

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        u(s => s.name, () => e.target.value);
    }, []);

    return (
        <fieldset>
            <legend>This section was rendered {++i} times</legend>
            <div>
                Hello, {t.name}.
            </div>
            <div>
                If your name is different just edit it: <input type={"text"} value={t.name} onChange={handleChange} />
            </div>
        </fieldset>
    );
};

export { Name };
