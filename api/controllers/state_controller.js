const Router = require('koa-trie-router');
const State = require('../models/state');

let router = new Router();

router.get('/state/list', [
  //middlewares.sessionRequiredFalse,  
  async (ctx, next) => {
    var resp = '';
    var status = 200;
    // get states
    resp = await State.find({}).exec();
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

exports.routes = router.middleware();