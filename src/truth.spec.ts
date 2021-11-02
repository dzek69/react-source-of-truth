import { Truth } from "./truth";

describe("Truth store", () => {
    it("allows to define default state and return it", () => {
        const state = { yes: true };
        const t = new Truth(state);
        t.getState().must.eql({ yes: true });
    });

    it("allows to update state and return it", () => {
        const state = { yes: true };
        const t = new Truth(state);
        const updatedState = t.update(s => s.yes, v => !v);
        updatedState.must.not.equal(state);
        updatedState.must.eql({ yes: false });
        t.getState().must.eql({ yes: false });
    });

    it("allows to attach/deattach change listener", () => {
        const calls = [];
        const listener = (...args) => { calls.push(args); };

        const state = { yes: true };
        const t = new Truth(state);
        t.addChangeListener(listener);
        t.update(s => s.yes, v => !v);

        calls.must.have.length(1);
        calls[0].must.eql([{ yes: false }]);

        t.removeChangeListener(listener);
        t.update(s => s.yes, v => !v);
        calls.must.have.length(1);
    });
});
