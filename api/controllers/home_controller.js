const Router = require('koa-trie-router');
const middlewares = require('../../config/middlewares');
const sessionRequiredTrue = require('../middlewares/session_required_true');
const constants = require('../../config/constants');
const contents = require('../../config/contents');
const homeStaticHelper = require('../helpers/home_static_helper');
const helpers = require('../../config/helpers');

let router = new Router();

router.get('/', [
  sessionRequiredTrue, 
  async (ctx, next) => {
    ctx.status = 200;
    var lang = middlewares.getLanguage(ctx);
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['admin_index'],
      helpers: helpers,
      csss: homeStaticHelper.indexCss(),
      jss: homeStaticHelper.indexJs(),
      message: '',
      message_status: '',
      contents: contents.get('home')[lang],
      lang: lang,
    };
    await ctx.render('home/index', locals);
  }
]);

exports.routes = router.middleware();
