import React from "react";
import Link from "next/link";

const IndexComp = () => (
    <div>
        <h2>Demos:</h2>
        <ul>
            <li><Link href={"/DocsApp"}>Demo app</Link></li>
        </ul>

        <h2>Development experiments:</h2>
        <ul>
            <li><Link href={"/BasicState"}>Basic state</Link></li>
            <li><Link href={"/BigList"}>Big List</Link></li>
            <li><Link href={"/Dependencies"}>Dependencies</Link></li>
            <li><Link href={"/Legacy"}>Legacy</Link></li>
        </ul>
    </div>
);

export default IndexComp;
