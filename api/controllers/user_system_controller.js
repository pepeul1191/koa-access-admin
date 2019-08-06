const Router = require('koa-trie-router');
const userSystemIds = require('../helpers/aggr_user_system_ids');
const systemdIds = require('../helpers/aggr_system_ids');
const System = require('../models/system');

let router = new Router();

router.get('/user/system/list', [
  //middlewares.sessionRequiredFalse,
  async (ctx, next) => {
    var resp = {};
    var status = 200;
    var user_id = ctx.request.query.user_id;
    // get all_systems and user_systems, then merge
    var all_systems = await systemdIds();
    var user_systems = await userSystemIds(user_id);
    for(var i = 0; i < all_systems.length; i++){
      var exist = false;
      for(var j = 0; j < user_systems.length; j++){
        if(all_systems[i].system_id.toString() === user_systems[j].system_id.toString()){
          exist = true;
        }
      }
      all_systems[i].exist = exist;
    }
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(all_systems);
  }
]);

exports.routes = router.middleware();
