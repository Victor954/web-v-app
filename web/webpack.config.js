const path = require('path');

const { DefinePlugin } = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (arg , env) => ({
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
    }, 
    resolve: {
        extensions: ['.js', '.json', '.ts' ,'.vue'],
        alias: {
            '@': path.resolve(__dirname , 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "ts-loader"
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        ts: 'ts-loader'
                    },
                    reactivityTransform: true
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    env.mode === 'development' 
                    ? 'vue-style-loader' 
                    : { 
                        loader:MiniCssExtractPlugin.loader,  
                        options: {esModule: false}
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devtool: 'eval-source-map',
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        hot: true,
        port: 3000,
    },
    plugins: [
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            template:  path.resolve(__dirname , 'public' , 'index.html'),
            inject: 'body'
        })
    ],
});