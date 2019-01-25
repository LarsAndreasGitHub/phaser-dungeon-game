'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname),
        publicPath: '/',
        filename: 'project.bundle.js'
    },
    module: {
        rules: [
          {
            test: [ /\.ts$/ ],
            use: 'ts-loader',
            exclude: /node_modules/
          }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        contentBase: '/assets'
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: 'assets', to: 'assets' }
        ]),
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ]
};
