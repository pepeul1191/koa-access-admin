const Router = require('koa-trie-router');
var constants = require('../../config/constants');
var helpers = require('../../config/helpers');
var contents = require('../../config/contents');
var loginStaticHelper = require('../helpers/login_static_helper');
var middlewares = require('../../config/middlewares');
var sessionRequiredFalse = require('../middlewares/session_required_false');
var CSRFValidateForm = require('../helpers/csrf_validation_form');

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
    var message = '';
    var lang = middlewares.getLanguage(ctx);
    var message_status = '';
    ctx.status = 200;
    if(CSRFValidateForm(ctx) != true){
      ctx.status = 500;
      message = contents.get('error')[lang].csrf.message_form;
      message_status = 'color-error';
    }
    if(constants.admin.user == ctx.request.body.user && 
      constants.admin.pass == ctx.request.body.pass){
      ctx.session.status = true;
      return await ctx.redirect('/');
    }else{
      ctx.status = 500;
      message = contents.get('login')[lang].login_user_not_found;
      message_status = 'color-error';
    }
    var locals = {
      constants: constants.data,
      title: contents.titles()[lang]['login_index'],
      helpers: helpers,
      csss: loginStaticHelper.indexCss(),
      jss: loginStaticHelper.indexJs(),
      message: message,
      message_status: message_status,
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
      csss: loginStaticHelper.indexCss(),
      jss: loginStaticHelper.indexJs(),
      message: 'Función de disponible',
      message_status: 'color-error',
      contents: contents.get('login')[lang],
      lang: lang,
    };
    await ctx.render('login/sign_in', locals);
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
      csss: loginStaticHelper.indexCss(),
      jss: loginStaticHelper.indexJs(),
      message: 'Función de disponible',
      message_status: 'color-error',
      contents: contents.get('login')[lang],
      lang: lang,
    };
    await ctx.render('login/reset_password', locals);
  }
]);

exports.routes = router.middleware();