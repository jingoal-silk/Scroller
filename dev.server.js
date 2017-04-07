/**
 * @file dev.server.js
 * @author denglb@jingoal.com
 *
 * 本地服务
 */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackHotMiddleware = require('webpack-hot-middleware');
var path = require('path');

/**
 * 引入站点基本配置
 */

var devServerConfig = {
    /**
     * dev host
     * @params {string}
     */
    host: '0.0.0.0',

    /**
     * publicPath
     * @params {string}
     */
    publicPath: '',

    /**
     * 监听端口
     * @params {number}
     */
    port: 4000
}

/**
 * 引入构建配置
 */
var makeWebpackConfig = require('./make-webpack.config');

var webpackConfig = makeWebpackConfig({
    production: false,
    devServer: devServerConfig
});

var compiler = webpack(webpackConfig);

/**
 * webpack dev server 配置
 */
var server = new WebpackDevServer(compiler, {
    noInfo: true,
    hot: true,
    port: devServerConfig.port,
    inline: true,
    stats: {
        colors: true
    }
});

server.app.use(webpackHotMiddleware(compiler));

/**
 * 启动本地服务环境
 */
server.listen(devServerConfig.port, devServerConfig.host, function (error) {
    /* eslint-disable */
    if (error) {
        console.error(error);
    } else {
        console.info('Listening on port %s. ' +
            'Open up http://' + devServerConfig.host + ':%s/ in your browser.',
            devServerConfig.port, devServerConfig.port);
    }
    /* eslint-enable */
});
