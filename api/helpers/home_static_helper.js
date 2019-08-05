var constants = require('../../config/constants');

module.exports = {
  indexCss: function() {
    var rpta = [];
    if(constants.data.static == 'dev'){
      rpta = [
        'bower_components/bootstrap/dist/css/bootstrap.min',
        'bower_components/font-awesome/css/font-awesome.min',
        'assets/css/constants',
        'assets/css/styles',
        'assets/css/admin',
      ];
    }
    if(constants.data.static == 'produccion'){
      rpta = [
        'dist/test.min'
      ];
    }
    return rpta;
  },
  indexJs: function() {
    var rpta = [];
    if(constants.data.static == 'dev'){
      rpta = [
        'dist/admin',
      ];
    }
    if(constants.data.static == 'produccion'){
      rpta = [
      ];
    }
    return rpta;
  },
};
