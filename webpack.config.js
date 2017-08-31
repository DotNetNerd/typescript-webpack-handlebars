const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        firstPage: './src/app.ts'
    },
    output: {
        filename: 'dist/[name]-[hash].js',
        path: __dirname
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            css: __dirname + '/content/css',
            template: __dirname + '/src/templates'
        }
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    configuration: {
                        rules: {
                            quotemark: [true, 'single'],
                        }
                    },
                    emitErrors: true,
                    failOnHint: true,
                    fix: true
                }
            },

            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

            { test: /\.hbs/, loader: 'handlebars-loader' },

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('typings-for-css-modules-loader?modules&namedExport&minimize' + (process.env.NODE_ENV === 'production' ? '&minimize' : ''))
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new CleanWebpackPlugin(['dist/*', 'content/css/dist/*'], {
            root: __dirname }),
        new ExtractTextPlugin('content/css/dist/[name]-[contenthash].css'),
        new HtmlWebpackPlugin({
            chunks: ['firstPage'],
            template: './template.html',
            filename: 'index.html'
        })
        
    ]
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(new UglifyJSPlugin());
}