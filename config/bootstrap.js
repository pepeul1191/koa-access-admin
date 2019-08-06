const homeRouter = require('../api/controllers/home_controller');
const errorRouter = require('../api/controllers/error_controller');
const loginRouter = require('../api/controllers/login_controller');
const userRouter = require('../api/controllers/user_controller');
const stateRouter = require('../api/controllers/state_controller');
const systemRouter = require('../api/controllers/system_controller');
const permissionRouter = require('../api/controllers/permission_controller');
const userSystemRouter = require('../api/controllers/user_system_controller');
const userPermissionRouter = require('../api/controllers/user_permission_controller');

module.exports = function(app){
  app.use(homeRouter.routes);
  app.use(errorRouter.routes);
  app.use(loginRouter.routes);
  app.use(userRouter.routes);
  app.use(stateRouter.routes);
  app.use(systemRouter.routes);
  app.use(permissionRouter.routes);
  app.use(userSystemRouter.routes);
  app.use(userPermissionRouter.routes);
};
