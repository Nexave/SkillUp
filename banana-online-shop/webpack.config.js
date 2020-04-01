const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    // mode: 'production',
    entry: './src/index.js',
    output: {
        filename: './js/bundle.min.js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        port: 3000,
        overlay: true,
        open: true
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                // test: /\.(css|sass|scss)$/,
                test: /\.(css|s[ac]ss)$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]',
                    outputPath: 'images'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './css/bundle.min.css'
        }),
        new OptimizeCSSAssetsWebpackPlugin()
    ]
};
