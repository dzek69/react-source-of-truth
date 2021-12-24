import React, { useCallback, useState } from "react";
import { useTruthSelector } from "../basicTruth";

const Dependencies = () => {
    const [big, setBig] = useState(false);
    const [name, setName] = useState("");

    const numWithDeps = useTruthSelector(s => (big ? s.number2 : s.number1), [big]);
    const numWithoutDeps = useTruthSelector(s => (big ? s.number2 : s.number1));
    const numAlwaysUpdate = useTruthSelector(s => (big ? s.number2 : s.number1), undefined);

    const handleClick = useCallback(() => {
        setBig(v => !v);
    }, []);

    const handleTyping = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }, []);

    return (
        <>
            <fieldset>
                <legend>Show a number - with deps</legend>
                {numWithDeps}
            </fieldset>

            <button onClick={handleClick}>toggle</button>
            <input placeholder={"Input for state change trigger"} value={name} onChange={handleTyping} />

            <fieldset>
                <legend>Show a number - without deps</legend>
                {numWithoutDeps}
            </fieldset>

            <fieldset>
                <legend>Show a number - forced always update</legend>
                {numAlwaysUpdate}
            </fieldset>
        </>
    );
};

export { Dependencies };
