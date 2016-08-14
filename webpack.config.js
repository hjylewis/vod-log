module.exports = {
    entry: {
        style: './site/style-index.js',
        bundle: './site/index.js'
    },

    output: {
        path: __dirname + '/site/compiled',
        filename: '[name].js',
        publicPath: '/'
    },

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
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            }
        ]
    }
};
