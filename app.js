const Koa = require('koa');
const router = require('koa-router')();
const static = require('koa-static');
const views = require('koa-views');
const {resolve} = require('path');
const initCtrl = require('./controllers/initCtrl');
const { accessLogger, logger } = require('./config/log4-config');
const errorHandler = require('./middleware/errorHandler');

const app = new Koa();

// 加载日志信息
app.use(accessLogger());
app.use(static(resolve(__dirname, './public')));
// 加载视图模板
app.use(views(resolve(__dirname, './views'), { extension: 'pug' }));
// 加载错误处理中间件
errorHandler.error(app, logger)
// 加载路由
initCtrl.getAllRouters(app, router);
app.listen(8888, function () {
  console.log('启动服务成功....');
});
