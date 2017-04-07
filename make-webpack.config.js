/**
 * @file make-webpack.config.js
 * @author denglb@jingoal.com
 *
 * Webpack 配置
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');
var ObjectAssign = require('object-assign');

var webpackUtils = require('./tool/webpack/util');

// 项目根路径;
var ROOT_PATH = process.cwd();

/**
 * 返回 webpack 配置
 *
 * @param {Object} config, 配置信息
 * @return {Object} webpack config
 */
module.exports = function (config) {
    var getPager = webpackUtils.getPager(ROOT_PATH + '/demo');

    var entry = getPager.entry;
    var vendor = ['react', 'react-dom'];

    var babelLoader = 'babel?plugins[]=transform-runtime,presets[]=react,presets[]=es2015,presets[]=stage-0,plugins[]=transform-decorators-legacy';
    var jsxLoaders = [];

    if (config.devServer) {
        vendor = vendor.concat([
            'webpack-dev-server/client?http://' + config.devServer.host + ':' + config.devServer.port,
            'webpack/hot/only-dev-server'
        ]);
        jsxLoaders.push('react-hot');
    }
    jsxLoaders.push(babelLoader);

    var webpackConfig = {
        /**
         * 配置 js 入口
         */
        entry: ObjectAssign({
            vendor: vendor
        }, entry),

        resolve: {
            extensions: ['', '.js', '.jsx']
        },

        /**
         * 打包目录配置
         */
        output: {
            path: path.join(process.cwd(), 'dist'),
            filename: '[name].js',
            chunkFilename: 'chunk.js'
        },

        /**
         * webpack 插件集合
         */
        plugins: [
            // 提取样式组件
            new ExtractTextPlugin('[name].css'),

            // 提供共用插件
            new webpack.optimize.CommonsChunkPlugin({
                names: 'common'
            })
        ],

        /**
         * 模块加载器
         */
        module: {
            preLoaders: [],
            loaders: [
                // js|jsx 加载器
                // Reference: https://github.com/webpack/babel
                {
                    test: /\.js$/,
                    loader: babelLoader,
                    exclude: /node_modules/
                },
                {
                    test: /\.jsx$/,
                    loaders: jsxLoaders,
                    exclude: /node_modules/
                },
                // sass 加载器
                // Reference: https://github.com/webpack/style-loader
                // Reference: https://github.com/webpack/css-loader
                // Reference: https://github.com/webpack/sass-loader
                // Reference: https://github.com/webpack/extract-text-webpack-plugin
                {
                    test: /\.scss/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader', {
                        publicPath: '../'
                    })
                },

                // css 加载器
                // Reference: https://github.com/webpack/style-loader
                // Reference: https://github.com/webpack/css-loader
                // Reference: https://github.com/webpack/autoprefixer-loader
                // Reference: https://github.com/webpack/extract-text-webpack-plugin
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'autoprefixer-loader?minimize', {
                        publicPath: '../'
                    })
                },
                // 模板 加载器
                // Reference: https://github.com/webpack/html-loader
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    // 图片加载器
                    test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[=a-z0-9]+)?$/,
                    loader: 'url-loader?limit=10000&name=images/[hash].[ext]'
                },
                {
                    // JSON资源文件加载器
                    // Reference: https://github.com/webpack/json-loader
                    test: /\.json$/,
                    loader: 'json'
                }
            ]
        }

    };

    // 添加页面入口
    webpackConfig.plugins = webpackConfig.plugins.concat(getPager.htmlPlugins);

    if (config.production) {
        webpackConfig.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }))
    }
    else {
        webpackConfig.plugins = webpackConfig.plugins.concat([
            new webpack.HotModuleReplacementPlugin()
        ]);
        webpackConfig.devtool = 'cheap-module-source-map';
    }

    return webpackConfig;
};
