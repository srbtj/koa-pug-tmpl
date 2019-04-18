const indexCtrl = require('./IndexController');

const initCtrl = {
  getAllRouters (app, router) {
    router
      .get('/', indexCtrl.actionIndex);

    app
      .use(router.routes())
      .use(router.allowedMethods());
  }
}

module.exports = initCtrl;
