const Router = require('koa-trie-router');
const userSystemIds = require('../helpers/aggr_user_system_ids');
const systemdIds = require('../helpers/aggr_system_ids');
const User = require('../models/user');

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

router.post('/user/system/add', [
  //middlewares.sessionRequiredFalse,
  async (ctx, next) => {
    var resp = {};
    var status = 200;
    var user_id = ctx.request.body.user_id;
    var system_id = ctx.request.body.system_id;
    // get user document with user_id
    var user = await User.findOne({
      _id: user_id
    }).exec();
    var user_systems = user.systems;
    var system_exist = false;
    // if system already added to user, change status
    for(var i = 0; i < user_systems.length; i++){
      if(user_systems[i].system_id == system_id){
        system_exist = true;
        user.systems[i].status = true;
        await user.save();
      }
    }
    // if system not already added to user, add
    if(!system_exist){
      user.systems.push({
        system_id: system_id,
        permissions_ids: [],
        status: true,
      });
      await user.save();
    }
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = 'ok';
  }
]);

router.post('/user/system/remove', [
  //middlewares.sessionRequiredFalse,
  async (ctx, next) => {
    var resp = {};
    var status = 200;
    var user_id = ctx.request.body.user_id;
    var system_id = ctx.request.body.system_id;
    // get user document with user_id
    var user = await User.findOne({
      _id: user_id
    }).exec();
    var user_systems = user.systems;
    // if system already added to user, change status
    for(var i = 0; i < user_systems.length; i++){
      if(user_systems[i].system_id == system_id){
        system_exist = true;
        user.systems[i].status = false;
        await user.save();
      }
    }
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = 'ok';
  }
]);

exports.routes = router.middleware();
