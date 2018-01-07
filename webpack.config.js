var path = require('path');
var webpack = require("webpack");

module.exports = {
    // Target the output of the typescript compiler
    context: path.join(__dirname, "src"),

    // File(s) to target
    entry: {
        wpDemo: "./index.tsx",
    },

    // Output
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    },

    // Resolve the file extensions
    resolve: {
        extensions: [".js", ".jsx", ".scss", ".ts", ".tsx"]
    },

    // Module to define what libraries with the compiler
    module: {
        // Loaders
        loaders: [
            {
                // Target the sass files
                test: /\.scss$/,
                // Define the compilers to use
                // Order: sass-loader -> css-loader -> style-loader
                use: [
                    // Create style nodes from the CommonJS code
                    { loader: "style-loader" },
                    // Translate css to CommonJS
                    { loader: "css-loader" },
                    // Compile sass to css
                    { loader: "sass-loader" }
                ]
            },
            {
                // Target the typescript files
                test: /\.tsx?$/,
                // Exclude the node modules folder
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
                        // Compile the typescript code to JSX
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    }
};