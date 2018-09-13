const webpack = require('webpack');
const baseConfig = require("./webpack.base");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(baseConfig,{
    mode:'production',
    output:{
        filename:"static/js/[name].[chunkhash].js",
        chunkFilename:'static/js/[name].[chunkhash].js',
    },
    module:{
        rules:[
            {
                test:/\.(sass|scss)$/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        {loader:'css-loader'},
                        {loader:'sass-loader'}
                    ],
                })
            }
        ]
    },
    plugins:[
        new webpack.HashedModuleIdsPlugin(),
        new OptimizeCSSAssetsPlugin({}), // css 压缩
        new MiniCssExtractPlugin({
            filename:"static/css/[name].[contenthash].css"
        }),
        new ExtractTextPlugin("/static/css/[name].[hash].css"),
    ],
    optimization:{
        splitChunks:{
            chunks:"all",
            cacheGroups:{
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                },
                commons: {
                    chunks: "async",
                    name: 'commons-async',
                    minSize: 0,
                    minChunks: 2
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
});