const errorHandler = {
  error (app, logger) {
    // 处理500
    app.use(async (ctx, next) => {
      try{
        await next();
      } catch (err) {
        logger.error(err);
        ctx.response.status = 200;
        await ctx.render('500');
      }
    });
    // 处理404
    app.use(async (ctx, next) => {
      await next();
      if (404 !== ctx.status) return;
      ctx.response.status = 200;
      await ctx.render('404');
    });
  }
};

module.exports = errorHandler;
