/**
 * @file webpack.production.js
 * @author houyl@jingoal.com
 *
 * webpack production config
 */

module.exports = require('./make-webpack.config.js')({
    production: true
})
