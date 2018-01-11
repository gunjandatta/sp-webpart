var path = require("path");
var webpack = require("webpack");

// WebPack Configuration
module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "wpDemo.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.ts$/,
                loader: "ts-loader"
            }
        ]
    }
}