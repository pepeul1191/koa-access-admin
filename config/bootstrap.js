const homeRouter = require('../api/controllers/home_controller');
const errorRouter = require('../api/controllers/error_controller');
const loginRouter = require('../api/controllers/login_controller');
const userRouter = require('../api/controllers/user_controller');

module.exports = function(app){
  app.use(homeRouter.routes);
  app.use(errorRouter.routes);
  app.use(loginRouter.routes);
  app.use(userRouter.routes);
};
