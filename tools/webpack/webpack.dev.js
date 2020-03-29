/* eslint import/no-extraneous-dependencies:0 */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const common = require('./webpack.common.js');
const rootDir = path.resolve(__dirname, '../..');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(rootDir, 'dist/'),
        port: 3000,
        hotOnly: true,
        clientLogLevel: 'silent'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
