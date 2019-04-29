import _ from 'lodash';

let config = {
  'viewsDir': '', // 模板目标
  'staticDir': '' // 静态资源
};

if ('development' === process.env.NODE_ENV) {
  let devConf = {
    baseUrl: ''
  }
  config = _.extend(config, devConf);
}
if ('production' === process.env.NODE_ENV) {
  let prodConf = {
    baseUrl: ''
  }
  config = _.extend(config, prodConf);
}

export default config;
