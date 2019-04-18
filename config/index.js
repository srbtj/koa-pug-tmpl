const {resolve} = require('path');
const _ = require('lodash');

const config = {
  'viewsDir': '', // 模板目标
  'staticDir': '' // 静态资源
};

const env = process.env.NODE_ENV;
if ('development' === env) {
  const devConf = {
    baseUrl: ''
  }
  config = _.extend(config, devConf);
}
if ('production' === env) {
  const prodConf = {
    baseUrl: ''
  }
  config = _.extend(config, prodConf);
}

module.exports = config;
