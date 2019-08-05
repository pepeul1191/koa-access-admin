var constants = require('../../config/constants');

module.exports = async function (ctx, next){
  if (constants.middlewares.session) {
    if(ctx.session){
      if(ctx.session.status != true){
        return await ctx.redirect('/error/access/5051');
      }
    }
  }
  return await next();
}