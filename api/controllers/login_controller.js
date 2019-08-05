const Router = require('koa-trie-router');
var constants = require('../../config/constants');
var helpers = require('../../config/helpers');
var contents = require('../../config/contents');
var loginStaticHelper = require('../helpers/login_static_helper');
var middlewares = require('../../config/middlewares');
var sessionRequiredFalse = require('../middlewares/session_required_false');

let router = new Router();

router.get('/login', [
  sessionRequiredFalse, 
  async (ctx, next) => {
    ctx.status = 200;
    var lang = middlewares.getLanguage(ctx);
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['login_index'],
      helpers: helpers,
      csss: loginStaticHelper.indexCss(),
      jss: loginStaticHelper.indexJs(),
      message: '',
      message_status: '',
      contents: contents.get('login')[lang],
      lang: lang,
    };
    await ctx.render('login/index', locals);
  }
]);

router.post('/login', [
  sessionRequiredFalse, 
  async (ctx, next) => {
    ctx.status = 200;
    console.log("1 +++++++++++++++++++++++++++++++");
    console.log(ctx.request.body);
    console.log("2 +++++++++++++++++++++++++++++++");
    var lang = middlewares.getLanguage(ctx);
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['login_index'],
      helpers: helpers,
      csss: loginHelper.indexCss(),
      jss: loginHelper.indexJs(),
      message: '',
      message_status: '',
      contents: contents.get('login')[lang],
      lang: lang,
    };
    await ctx.render('login/index', locals);
  }
]);

router.get('/login/sign_in', [
  async (ctx, next) => {
    ctx.status = 200;
    var lang = middlewares.getLanguage(ctx);
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['login_sign_in'],
      helpers: helpers,
      csss: loginHelper.indexCss(),
      jss: loginHelper.indexJs(),
      message: '',
      message_status: '',
      contents: contents.get('login')[lang],
      lang: lang,
    };
    // await ctx.render('login/sign_in', locals);
    await ctx.redirect('/error/access/404');
  }
]);

router.get('/login/reset_password', [
  async (ctx, next) => {
    ctx.status = 200;
    var lang = middlewares.getLanguage(ctx);
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['login_reset'],
      helpers: helpers,
      csss: loginHelper.indexCss(),
      jss: loginHelper.indexJs(),
      message: '',
      message_status: '',
      contents: contents.get('login')[lang],
      lang: lang,
    };
    await ctx.render('login/reset_password', locals);
  }
]);

exports.routes = router.middleware();