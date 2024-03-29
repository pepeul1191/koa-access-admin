const Koa = require('koa');
const static = require('koa-static');
const render = require('koa-ejs');
const session = require('koa-session');
const path = require('path');
const koaBody = require('koa-body');
// export configs
// const sockets = require('./config/sockets');
const constants = require('./config/constants');
const middlewares = require('./config/middlewares');
const bootstrap = require('./config/bootstrap');
// new app
const app = new Koa();
app.use(koaBody(constants.uploader_options));
app.use(session(constants.session, app));
app.keys = ['rnbfpzfuywmiwtfrrlomwlzlhdxfxjnfifzvkrloobswyoifkt'];
// static files
app.use(static(__dirname + '/public'));
// views EJS
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
  debug: false
});
// middlewares
app.use(middlewares.preResponse());
app.use(middlewares.showLogs());
// error 500 handler
app.use(middlewares.internalErrorHandler);
// forward routes
bootstrap(app);
// error 404 handler
app.use(middlewares.errorNotFoundHandler);
// port
app.listen(3001);
