/**
 * aggr_user_system_ids
 *
 * @description :: return an array object of systems id of the user 
 *                 selected
 * @help        :: use an await when call the function
 */

const User = require('../models/user');
const db = require('../../config/database');

module.exports = function(user_id){
  return User.aggregate([
    {
      $match: {
         _id: db.mongoose.Types.ObjectId(user_id)
      },
    },
    {
      $unwind: '$systems'
    },
    {   
      $project:{
         _id : 0 ,
        system_id : '$systems.system_id',
        // exist: '1',
      }
    },
  ])
};
