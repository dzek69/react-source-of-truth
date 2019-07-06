/* eslint-disable new-cap */

const { FuseBox, WebIndexPlugin } = require("fuse-box");
const fuse = FuseBox.init({
    allowSyntheticDefaultImports: true,
    homeDir: "src",
    target: "browser@es6",
    output: "dist-example/$name.js",
    plugins: [WebIndexPlugin()],
});
fuse.dev(); // launch http server
fuse
    .bundle("app")
    .instructions("> example/index.js")
    .hmr()
    .watch();

fuse.run();
