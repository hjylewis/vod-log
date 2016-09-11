var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        style: './site/style-index.js',
        bundle: ['whatwg-fetch', './site/index.js']
    },

    output: {
        path: __dirname + '/site/compiled',
        filename: '[name].js',
        publicPath: '/compiled'
    },

    debug: false,
    devtool: false,

    plugins: [
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
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
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
