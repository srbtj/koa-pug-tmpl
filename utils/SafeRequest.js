const {baseUrl} = require('../config');
const {logger} = require('../config/log4-config');
const fetch = require('node-fetch');
class SafeRequest {
  /**
   * @constructor
   * @param {请求接口URL} url
   */
  constructor (url) {
    this.url = url;
    this.baseUrl = baseUrl;
  }
  /**
   * 统一处理请求接口
   * @method
   * @param {请求参数} options
   * @returns Promise
   */
  fetch (options) {
    const urls = this.baseUrl + this.url;
    // const resPromise = fetch(urls, options ? {
    //   method: options.method,
    //   body: options.params
    // } : '');
    const resPromise = options
      ? fetch(urls, { method: options.method, body: options.params })
      : fetch(urls);
    /**
     * 对返回的结果进行处理
     */
    return new Promise((resolve, reject) => {
      // 封装默认的请求结果
      let result = {
        code: 0,
        mesage: '',
        data: []
      };
      resPromise
        .then(res => {
          let _json = {};
          try {
            _json = res.json();
          } catch (err) {
            // TODO
            // 解析出错时，发送邮件至后台人员或其它
          }
          return _json;
        })
        .then(json => {
          result.data = json;
          resolve(result);
        })
        .catch(err => {
          logger.error(err);
          result.code = 1;
          result.mesage = '调用后台接口出错啦,请查看日志信息...';
          reject(result);
        });
    });
  }
}

module.exports = SafeRequest;
