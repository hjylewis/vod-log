var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        bundle: ['whatwg-fetch', './site/index.js']
    },

    output: {
        path: __dirname + '/site/build/',
        filename: '[name].js',
        publicPath: '/'
    },

    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: __dirname + '/site/',
            verbose: true,
            dry: false,
            exclude: ['favicon.ico', 'riot.txt']
        }),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            template: './site/index.ejs'
        })
    ],

    debug: true,
    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
            {
                test: /\.scss$/,
                // loaders: ["style", "css?sourceMap", "sass?sourceMap"]
                loader: ExtractTextPlugin.extract(["css?sourceMap", "sass?sourceMap"])
            },
            {
                test: /\.woff(2)?(\?[a-z0-9]+)?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
                loader: "file-loader"
            },
            {
                test: /\.json?$/,
                loader: "json"
            }
        ]
    }
};
