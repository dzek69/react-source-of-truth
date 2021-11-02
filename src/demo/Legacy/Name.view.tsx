import type { ChangeEvent } from "react";
import React, { useCallback } from "react";

let i = 0;

interface MyProps {
    name: string;
    updateName: (name: string) => void;
}

const Name = (props: MyProps) => {
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.updateName(e.target.value);
    }, []);

    return (
        <fieldset>
            <legend>
                This section was rendered {++i} times
            </legend>

            <div>Hi {props.name}</div>

            <div>
                If your name is different just edit it:{" "}
                <input type={"text"} value={props.name} onChange={handleChange} />
            </div>
        </fieldset>
    );
};

export { Name };

export type {
    MyProps,
};
