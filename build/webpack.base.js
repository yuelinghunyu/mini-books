const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    devtool: '#source-map',
    entry:{
        app: './src/main.js'
    },
    output:{
        path:path.resolve(__dirname,'../dist/'),
    },
    resolve:{
        extensions: ['.jpg', '.js']
    },
    module:{
        rules:[
            {
                test:/\.(png|jpe?g|gif|svg)$/i,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:8192,
                            name: 'static/img/[name].[ext]?[hash]'
                        }
                    }
                ]
            },
            {
                test:/\.(ttf|svg|woff|eot|woff2)$/,
                use:[{
                    loader:"file-loader",
                    options:{
                        name:"static/font/[name].[ext]?[hash]"
                    }
                }]
            },
            {
                test:/\.css$/,
                exclude:/(node_modules)/,
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        {loader:'css-loader'},
                        {loader:'postcss-loader'},
                    ],
                    publicPath:'../'
                })
            },
            {
                test:/\.(js|jsx)$/,
                exclude:/(node_modules)/,
                use:[
                    {loader:'babel-loader'},
                ]
            },
            {
                test:/\.html$/,
                use:[{
                    loader:"html-loader",
                    options:{
                        minimize:true
                    }
                }]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:path.join(__dirname,"../dist/index.html"),
            template:path.join(__dirname,"../index.html")
        }),
    ],
};