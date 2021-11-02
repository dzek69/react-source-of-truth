import { Name as NameView } from "./Name.view";
import { connect } from "../basicTruth";

const Connected = connect(
    NameView,
    (state) => {
        return {
            name: state.name,
        };
    },
    (update) => {
        return {
            updateName(newName: string) {
                update(s => s.name, () => newName);
            },
        };
    });

export { Connected as Name };
