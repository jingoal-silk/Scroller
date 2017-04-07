/**
 * @file util.js
 * @author denglb@jingoal.com
 *
 * webpack dev 构建工具包
 */
var path = require('path');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 转换文件前缀
 *
 * @param {string} folderName, 文件路径
 * @param {string} sign, 分隔符
 * @return {string}
 *
 */
function fixFolder(folderName, sign) {

    if (folderName && folderName.length) {
        return folderName + sign;
    }

    return '';
};

/**
 * 获取页面名，默认是添加文件目录
 *
 * @param {string} filePath, 文件路径
 * @return {Object}
 *  object.url 用户的访问路径 index.html, task/detail.html
 *  object.name 页面名 index, task-detail (自动连接文件夹和文件名)
 */
function getEntryName(filePath) {
    // 获取 {folderName}/{pageName}.js
    var pathArr = filePath.split('/');
    var len = pathArr.length;

    if (pathArr && pathArr.length >= 2) {
        // var folderName = pathArr[len - 3];
        var fileName = pathArr[len - 1];

        fileName = fileName.substring(0, fileName.lastIndexOf('.'));
    }

    return fileName;
};

/**
 * 获取 Javascript
 *
 * @param {string} entryFolder, 模版入口目录
 * @return Object
 */
function getJsFiles(path) {
    var me = this;
    var files = {};
    var jsFiles = glob.sync(path);

    jsFiles.forEach(function (filePath) {
        var entryName = getEntryName(filePath);
        files[entryName] = filePath;
    });

    return files;
};

/**
 * 自动生成入口配置, 入口js 必须和 入口模板名相同
 * EG: a页的入口文件是 [a].tpl|html，那么在 js 目录下必须有一个 [a].js 作为入口文件
 *
 * @param {string} entryFolder, 模版入口目录
 * @return Object
 */
module.exports = {

    getPager: function (entryFolder) {

        var jsFiles = getJsFiles(entryFolder + '/**/*.{js,jsx}');

        var htmlPlugins = [];
        var entry = {};

        // 提取所有的入口文件中的公共部分
        var allChunks = [];

        // 查找 模板 根目录下的入口文件
        var pages = glob.sync(entryFolder + '/**/*.html');

        pages.forEach(function (filePath) {

            // 这里为了避免文件名重复，所以会在前面添加上文件夹名字
            var entryName = getEntryName(filePath);
            var conf = {};

            if (entryName in jsFiles) {
                conf.filename = entryName + '.html';

                // 模板源位置
                conf.template = filePath;

                // 设置 js 入口
                conf.chunks = ['common', 'vendor', entryName];

                // script 插入位置
                conf.inject = 'body';

                htmlPlugins.push(
                    // 创建页面插件
                    new HtmlWebpackPlugin(conf)
                );

                entry[entryName] = jsFiles[entryName];

                allChunks.push(entryName);
            }
        });

        return {
            htmlPlugins: htmlPlugins,
            entry: entry,
            allChunks: allChunks
        };
    }
};
