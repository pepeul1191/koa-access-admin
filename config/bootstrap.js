const homeRouter = require('../api/controllers/home_controller');
const errorRouter = require('../api/controllers/error_controller');

module.exports = function(app){
  app.use(homeRouter.routes);
  app.use(errorRouter.routes);
};
