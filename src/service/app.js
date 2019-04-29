import Koa from 'koa';
import Router from 'koa-router';
import koaStatic from 'koa-static';
import views from 'koa-views';
import {resolve} from 'path';
import initCtrl from './controllers/initCtrl';
import { accessLogger, logger } from './config/log4-config';
import errorHandler from './middleware/errorHandler';

const app = new Koa();
const router = new Router();
// 加载日志信息
app.use(accessLogger());
app.use(koaStatic(resolve(__dirname, './public')));
// 加载视图模板
app.use(views(resolve(__dirname, '../web/views'), { extension: 'pug' }));
// 加载错误处理中间件
errorHandler.error(app, logger)
// 加载路由
initCtrl.getAllRouters(app, router);
app.listen(8888, function () {
  // console.log('启动服务成功....');
});
