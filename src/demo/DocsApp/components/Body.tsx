import React, { useEffect } from "react";
import { useTruthSelector, useTruthUpdate } from "../state";

import styles from "./Body.module.scss";
import { Weather } from "./Weather";

interface Props {}

// eslint-disable-next-line @typescript-eslint/no-shadow
const Body: React.FC<Props> = (props) => {
    const update = useTruthUpdate();
    const isLoading = useTruthSelector(s => s.articles.isLoading);
    const articles = useTruthSelector(s => s.articles.list);

    useEffect(() => {
        update(s => s.articles.isLoading, () => true);

        setTimeout(() => {
            update(s => s.articles.isLoading, () => false);
            update(s => s.articles.list, () => ([
                {
                    title: "Big thing happened",
                    // eslint-disable-next-line max-len
                    fullContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi suscipit facilisis nunc, nec vulputate dui sodales in. Vestibulum varius lectus nisi, ut auctor diam porta a. Cras consectetur est quis metus lobortis, vitae luctus nisl rutrum. Donec molestie dolor nec pulvinar tempor. Mauris mattis tristique neque a blandit. Nullam condimentum eget nisi id facilisis. Vestibulum non tempor enim, id lobortis justo. Suspendisse vitae felis sit amet sem sagittis iaculis non eu orci. In vitae magna at magna volutpat condimentum in sit amet velit. Pellentesque ultricies tellus eu quam semper, ultricies imperdiet velit faucibus. Maecenas massa nunc, lobortis non mattis quis, mattis id dolor.",
                    date: "5 minutes ago",
                },
                {
                    title: "Older great article",
                    // eslint-disable-next-line max-len
                    fullContent: "Donec gravida velit nec ligula scelerisque consectetur. Vivamus malesuada purus sed ornare laoreet. Curabitur vel nisl neque. Vestibulum et risus accumsan, fringilla purus semper, mattis velit. Praesent quis finibus diam, sed imperdiet neque. Cras ut ex in tortor pretium varius. Mauris luctus tempus malesuada. Fusce et porttitor arcu.",
                    date: "2 days ago",
                },
            ]));
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        }, 3000);
    }, [update]);

    const loading = isLoading && <div className={styles.loading}><span>🕝</span><div>Loading, please wait</div></div>;

    const arts = articles.map(art => (
        <div key={art.title} className={styles.art}>
            <h3>{art.title}</h3>
            <span>{art.date}</span>
            <p>{art.fullContent}</p>
        </div>
    ));

    return (
        <div className={styles.body}>
            <Weather />
            <div>
                {loading}
                {arts}
            </div>
        </div>
    );
};

export { Body };
