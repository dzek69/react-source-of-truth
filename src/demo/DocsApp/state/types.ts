interface State {
    ui: {
        menuOpen: boolean;
    };
    user: {
        loggedIn: boolean;
        name: string;
    };
    articles: {
        isLoading: boolean;
        list: { title: string; fullContent: string; date: string }[];
    };
    weatherWidget: {
        today: string;
        tomorrow: string;
    };
}

export type {
    State,
};
