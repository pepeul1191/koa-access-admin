var constants = require('../../config/constants');

module.exports = async function (ctx, next){
  if (constants.middlewares.session_admin) {
    if(ctx.session){
      if(ctx.session.status == false){
        return await ctx.redirect('/error/access/5051');
      }
    }
  }
  return await next();
}