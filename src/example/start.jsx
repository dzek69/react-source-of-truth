// This is demo used for development

import React from "react";
import { render } from "react-dom";

import App from "./app/App";

const root = document.getElementById("root");
if (window.loaded) {
    render("", root);
}

render(<App />, root);

window.loaded = true;
