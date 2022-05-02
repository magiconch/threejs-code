/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./src/index.ts",
    devtool: 'inline-source-map',
    devServer: {
        static: './src',
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
            // {
            //     test: /\.ts$/i,
            //     type: 'asset/resource'
            // },
            {
                test: /\.(png|svg|jpg|jpeg|gif|hdr)$/i,
                type: 'asset/resource',
            },
        ]
    },

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};