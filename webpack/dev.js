const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');

module.exports = merge(common, {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080'
    ],
    mode: 'development',
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        hot: true
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
