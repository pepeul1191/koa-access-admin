const Router = require('koa-trie-router');
const Permission = require('../models/permission');
const System = require('../models/system');
const listSystemPermissions = require('../helpers/aggr_list_systems_permissions');
const db = require('../../config/database');

let router = new Router();

router.get('/permission/list', [
  //middlewares.sessionRequiredFalse,  
  async (ctx, next) => {
    var resp = {};
    var status = 200;
    var page = parseInt(ctx.request.query.page);
    var step = parseInt(ctx.request.query.step);
    var system_id = ctx.request.query.system_id;
    var skip = (page - 1) * step;
    // get permissions in range of page
    resp.permissions = await listSystemPermissions(system_id);
    // get count of permissions
    resp.count = await Permission.countDocuments({});
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

router.get('/permission/get', [
  //middlewares.sessionRequiredFalse,  
  async (ctx, next) => {
    var resp = {};
    var status = 200;
    var _id = ctx.request.query._id
    // get permissions
    var permission = await Permission.findOne({
      _id: _id
    }).select({ 
      name: 1,
      key: 2, 
    }).exec();
    // check if permission exist
    if (permission == null){
      status = 409;
      resp = 'Permiso no existe';
    }else{
      resp = permission;
    }
    // get count of permissions
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

router.post('/permission/save', [
  //middlewares.sessionRequiredFalse, 
  async (ctx, next) => {
    var status = 200;
    var resp = {
      action_executed: '',
    };
    try {
      var permission_json = JSON.parse(ctx.request.body.data);
      if(permission_json._id == 'E'){
        // create permission
        // validate name and key must be unique in db
        var temp = await Permission.findOne({$or: [
          {name: permission_json.name},
          {key: permission_json.key},
        ]}).exec();
        if(temp){
          // error, neither name nor key are unique
          status = 409;
          resp.action_executed = 'none';
          resp.data = 'Nombre o llave de permiso repetido';
        }else{
          // create permission
          var permission = new Permission({
            name: permission_json.name, 
            key: permission_json.key, 
          });
          var new_permission = await permission.save();
          resp.action_executed = 'create';
          resp._id = new_permission._id;
          // add permission to system document
          var system = await System.findOne({
            _id: permission_json.system_id
          }).exec();
          system.permissions_id.push(new_permission._id);
          await system.save();
        }
      }else{
        // edit permission
        var temp1 = await Permission.findOne({$or: [
          {name: permission_json.name},
          {key: permission_json.key},
        ]}).exec();
        var proceed = true;
        // check new permission name is unique except himself
        if(temp1 != null){
          if(temp1._id != permission_json._id){
            proceed = false;
          }
        }
        // proceed if pass validation
        if(proceed){
          await Permission.findByIdAndUpdate(
            permission_json._id,
            {
              $set: {
                name: permission_json.name, 
                key: permission_json.key, 
              }
            }
          );         
          resp.action_executed = 'edit';
        }else{
          status = 409;
          resp.action_executed = 'none';
          resp.data = 'Nombre o llave de permiso ya asignado';
        }
      }
    } catch (err) {
      ctx.throw(500, err);
    }
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

router.post('/permission/delete', [
  //middlewares.sessionRequiredFalse, 
  async (ctx, next) => {
    var status = 200;
    var resp = {
      action_executed: '',
    };
    try {
      var _id = ctx.request.body._id;
      var system_id = ctx.request.body.system_id;
      await Permission.findOneAndDelete(db.mongoose.Types.ObjectId(_id));
      // delete permission from array on permissions in system
      var system = await System.findOne({
        _id: system_id
      }).exec();
      system.permissions_id.pull(_id);
      await system.save();
      // response
      resp.action_executed = 'deleted';
      resp.data = 'Permiso eliminado';
    } catch (err) {
      ctx.throw(500, err);
    }
    // response
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.status = status;
    ctx.body = JSON.stringify(resp);
  }
]);

exports.routes = router.middleware();