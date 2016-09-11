var validate = require('webpack-validator');
var merge = require('webpack-merge');

var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var shared = {
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
        new HtmlWebpackPlugin({
            template: './site/index.ejs'
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
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

var config;
console.log(process.env.npm_lifecycle_event);
switch(process.env.npm_lifecycle_event) {
  case 'production':
    config = merge(shared, {
        plugins: [
            new ExtractTextPlugin("styles.css"),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ],

        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract(["css?sourceMap", "sass?sourceMap"])
                }
            ]
        },

        debug: false,
        devtool: false,
    });
    break;
  default:
    config = merge(shared, {
        module: {
            loaders: [
                {
                    test: /\.scss$/,
                    loaders: ["style", "css?sourceMap", "sass?sourceMap"]
                }
            ]
        },

        debug: true,
        devtool: 'source-map',
    });
}

module.exports = validate(config);
