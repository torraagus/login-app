const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require("dotenv").config();

const isDevelopment = process.env.MODE === 'development';
console.log(process.env.MODE);

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: isDevelopment ? '[name].js' : '[name].[hash].js',
        chunkFilename: isDevelopment ? '[id].js' : '[id].[hash].js',
    },
    devServer: {
        port: 4321,
        hot: true
    },
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader', //Nos permite agregar @babel/core y @babel/preset-react
                options: {
                  presets: ['@babel/preset-react'] //Nos permite utilizar JSX
                }
              }
            },
            { 
              test: /\.css$/, 
              loader: [
                MiniCSSExtractPlugin.loader,
                "css-loader"
              ]
            },
            {
              test: /\.scss$/, 
              loader: [
                MiniCSSExtractPlugin.loader,
                "css-loader",
                'sass-loader'
              ]
            }
        ]
    },
    devtool: 'eval-source-map',
    plugins: [
        /*new CopyWebpackPlugin([
          {
              from: 'public',
          },
        ]),*/
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html'
        }),
        new MiniCSSExtractPlugin({
          filename: isDevelopment ? '[name].css' : '[name].[hash].css',
          chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
}