// This is demo used for development

import React from "react";
import { render } from "react-dom";

import App from "./app/App";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

render(<App />, root);
