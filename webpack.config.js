var path = require("path");
var webpack = require("webpack");

// WebPack Configuration
module.exports = {
    entry: "./build/index.js",
    output: {
        filename: "gd-sp-webpart.js",
        path: path.resolve(__dirname, "dist")
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
            }
        ]
    }
}