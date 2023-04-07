const path = require("path");

module.exports = {
    mode: "production",
    entry: ["./src/index.tsx"],
    module: {
        rules: require("./webpack.rules"),
    },
    output: {
        clean: true,
        publicPath: "/",
        path: path.resolve(__dirname, "../build"),
        filename: "recruiting.js",
    },
    plugins: [...require("./webpack.plugins")],
    resolve: {
        extensions: ["*", ".js", ".ts", ".jsx", ".tsx", ".css"],
    },
    optimization: {
        minimize: true,
        sideEffects: true,
    },
};
