const Router = require('koa-trie-router');
const listSystemsPermissions = require('../helpers/aggr_list_systems_permissions');
const projectUserPermissions = require('../helpers/aggr_project_user_permissions');

let router = new Router();

router.get('/user/permission', [
  //middlewares.sessionRequiredFalse,
  async (ctx, next) => {
    var resp = {};
    var status = 200;
    var user_id = ctx.request.query.user_id;
    var system_id = ctx.request.query.system_id;
    // get users
    // get all_systems_permissions and user_permissions_system, then merge
    var all_permissions = await listSystemsPermissions(system_id);
    var user_permissions = await projectUserPermissions(user_id, system_id);
    // http://localhost:3001/user/permission?user_id=5d3a08bf0f10e27b3462487b&system_id=5d38e2466a354f35c722b047
    for(var i = 0; i < all_permissions.length; i++){
      var exist = false;
      for(var j = 0; j < user_permissions.length; j++){
        if(
          all_permissions[i].permission_id.toString() == user_permissions[j].permission_id.toString()
        ){
          exist = true;
        }
      }
      all_permissions[i].exist = exist;
    }
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(all_permissions);
  }
]);

exports.routes = router.middleware();