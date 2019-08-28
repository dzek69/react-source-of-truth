const { fusebox } = require("fuse-box");
const fuse = fusebox({
    // allowSyntheticDefaultImports: true,
    homeDir: "src",
    entry: "example/start.jsx",
    devServer: true,
    webIndex: {
        template: "src/example/index.html",
    },
    cache: false,
    target: "browser",
    output: "dist-example/$name.js",
    // logging: { level: "verbose" },
});
fuse.runDev();
