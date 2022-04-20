/* eslint-disable react/jsx-no-bind */
import React, { useState } from "react";

import styles from "./Weather.module.scss";
import { useTruthSelector } from "../state";

interface Props {}

type For = "today" | "tomorrow";

const Weather: React.FC<Props> = (props) => {
    const [wfor, setFor] = useState<For>("today");
    const weather = useTruthSelector(s => {
        return s.weatherWidget[wfor];
    }, [wfor]);

    const handleForToggle = () => { setFor(p => (p === "today" ? "tomorrow" : "today")); };

    return (
        <div className={styles.weather}>
            Weather for {wfor}:
            <div>{weather}</div>
            <button onClick={handleForToggle}>See for {wfor === "today" ? "tomorrow" : "today"}</button>
        </div>
    );
};

export { Weather };
