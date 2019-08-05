var constants = require('../../config/constants');

module.exports = async function (ctx, next){
  if (constants.middlewares.session_admin) {
    if(ctx.session){
      if(ctx.session.status == true){
        return await ctx.redirect('');
      }
    }
  }
  return await next();
}