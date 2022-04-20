/* eslint-disable react/jsx-no-bind */
import React from "react";
import { useTruthSelector, useTruthUpdate } from "../state";

import styles from "./Top.module.scss";

interface Props {}

const Top: React.FC<Props> = () => {
    const user = useTruthSelector(s => s.user);
    const menuOpen = useTruthSelector(s => s.ui.menuOpen);
    const update = useTruthUpdate();

    const handleLogIn = () => update(s => s.user, () => ({ loggedIn: true, name: "Stefan" }));
    const handleLogOut = () => update(s => s.user, () => ({ loggedIn: false, name: "" }));
    const handleMenuClick = () => update(s => s.ui.menuOpen, currentValue => !currentValue);

    const button = user.loggedIn
        ? <button onClick={handleLogOut}>log out</button>
        : <button onClick={handleLogIn}>log in</button>;

    const menu = menuOpen && (
        <div className={styles.menu}>
            <div className={styles.menuItem}>Home</div>
            <div className={styles.menuItem}>Images</div>
            <div className={styles.menuItem}>Videos</div>
            <div className={styles.menuItem}>About Us</div>
            <div className={styles.menuItem}>Contact</div>
        </div>
    );

    return (
        <div className={styles.top}>
            <div>
                Hello {user.loggedIn ? user.name : "stranger"}, {button}
            </div>
            <button className={styles.menuButton} onClick={handleMenuClick}><span /></button>
            {menu}
        </div>
    );
};

export { Top };
