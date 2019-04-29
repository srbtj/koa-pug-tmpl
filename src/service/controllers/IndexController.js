
class IndexController {
  constructor () {}
  async actionIndex (ctx) {
    const data = {
      title: '首页',
      foot: '底部版权',
      content: '这是body内容'
    };
    await ctx.render('index', data);
  }
}

export default IndexController;
