/**
 * aggr_system_ids
 *
 * @description :: return an array object of systems id of the user 
 *                 selected
 * @help        :: use an await when call the function
 */

const System = require('../models/system');

module.exports = function(){
  return System.aggregate([
    {   
      $project:{
        _id : 0,
        system_id: '$_id',
        name: '$name',
        // exist: '0',
      },
    },
  ])
};
