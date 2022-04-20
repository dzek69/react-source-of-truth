import type { State } from "./types";

const defaultState: State = {
    ui: {
        menuOpen: false,
    },
    articles: {
        isLoading: false,
        list: [],
    },
    user: {
        name: "",
        loggedIn: false,
    },
    weatherWidget: {
        today: "-3°C",
        tomorrow: "25°C",
    },
};

export {
    defaultState,
};
