var path = require("path");
var webpack = require("webpack");

// WebPack Configuration
module.exports = {
    entry: "./src/wpDemo.ts",
    output: {
        filename: "wpDemo.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
        // Loaders
        loaders: [
            {
                // Target the typescript files
                test: /\.tsx?$/,
                // Exclude the npm libraries
                exclude: /node_modules/,
                // Define the compiler to use
                use: [
                    {
                        // Compile the JSX code to javascript
                        loader: "babel-loader",
                        // Options
                        options: {
                            // Ensure the javascript will work in legacy browsers
                            presets: ["es2015"]
                        }
                    },
                    {
                        // Compile the TypeScript code to JSX
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    }
}