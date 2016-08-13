module.exports = {
    entry: './site/index.js',

    output: {
        path: __dirname + '/site',
        filename: 'bundle.js',
        publicPath: 'site'
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
