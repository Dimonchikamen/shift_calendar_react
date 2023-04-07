const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

module.exports = [
    new HtmlWebpackPlugin({
        inject: true,
        scriptLoading: "blocking",
        template: "public/index.html",
    }),
    new MiniCssExtractPlugin({
        filename: "recruiting.css",
    }),
    new CssMinimizerWebpackPlugin(),
].filter(Boolean);
