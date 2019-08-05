var constants = require('../../config/constants');

module.exports = function (ctx){
  if (constants.middlewares.csrf_check) {
    var app_csrf_key = constants.data.csrf.key;
    var app_csrf_secret = constants.data.csrf.secret;
    var rq_csrf_secret = ctx.request.body[app_csrf_key];
    if(app_csrf_secret == rq_csrf_secret){
      return true;        
    }else{
      return false;
    }
  }else{
    return true;
  }
}