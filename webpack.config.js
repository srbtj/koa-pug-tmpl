const webpackMerge = require('webpack-merge');
const parse = require('yargs-parser');
const _mode = parse(process.argv).mode;
const _merge = require(require(__dirname + `/config/webpack.${_mode}.js`));

// 入口文件
const _entry = {};
const webpackConfig = {
  entry: _entry
};

module.exports = webpackMerge(webpackConfig, _merge);
