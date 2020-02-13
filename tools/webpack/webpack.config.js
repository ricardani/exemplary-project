const path = require('path');
const webpack = require('webpack');

const rootDir = path.resolve(__dirname, '../..');

module.exports = {
    entry: ['react-hot-loader/patch', './src/index.js'],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env'] }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    output: {
        path: path.join(rootDir, 'dist/'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(rootDir, 'public/'),
        port: 3000,
        publicPath: '/dist/',
        hotOnly: true,
        clientLogLevel: 'silent'
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};