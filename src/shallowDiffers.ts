const shallowDiffers = <T, S>(a: T, b: S) => {
    for (const i in a) {
        if (!(i in b)) { return true; }
    }
    for (const i in b) {
        // @ts-expect-error Yeah, I want access prop i of B on A object
        if (a[i] !== b[i]) {
            return true;
        }
    }
    return false;
};

export {
    shallowDiffers,
};
