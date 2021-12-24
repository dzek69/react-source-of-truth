import React from "react";
import Link from "next/link";

const IndexComp = () => (
    <ul>
        <li><Link href={"/BasicState"}>Basic state</Link></li>
        <li><Link href={"/BigList"}>Big List</Link></li>
        <li><Link href={"/Dependencies"}>Dependencies</Link></li>
        <li><Link href={"/Legacy"}>Legacy</Link></li>
    </ul>
);

export default IndexComp;
