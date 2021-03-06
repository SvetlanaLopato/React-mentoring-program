const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),

    entry: {
        app: './app',
        vendor: './vendor',
    },

    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].bundle.js',
        publicPath: '/',
    },

    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    devtool: 'cheap-module-source-map',

    watch: true,

    module: {
        loaders: [{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader', 'ts-loader'],
            }, {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url-loader?limit=10000',
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader'],
                }),
        }],
    },

    devServer: {
        stats: 'minimal',
        port: 3000,
        historyApiFallback: true,
        compress: true,
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
           name: ['app', 'vendor'],
        }),
        new HtmlWebpackPlugin({
            template: './app.html',
        }),
        new WebpackNotifierPlugin(),
        new ExtractTextPlugin('styles.css')
    ]
}
