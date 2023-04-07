const path = require("path");
module.exports = {
    mode: "development",
    entry: ["./src/index.tsx"],
    module: {
        rules: require("./webpack.rules"),
    },
    output: {
        clean: true,
        publicPath: "/",
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
    },
    plugins: require("./webpack.plugins"),
    resolve: {
        extensions: ["*", ".js", ".ts", ".jsx", ".tsx", ".css"],
    },
    devtool: "cheap-module-source-map",
    devServer: {
        hot: true,
        open: true,
        historyApiFallback: true,
        client: {
            overlay: true,
        },
    },
    performance: {
        hints: false,
    },
};
