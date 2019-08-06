/**
 * aggr_project_user_permissions
 *
 * @description :: return an array object:
 * 
 * 
    * {
      "permissions_id" : ObjectId("5d3933b66319ef5cd9824195")
    }

    {
      "permissions_id" : ObjectId("5d3933cc6319ef5cd9824196")
    }
 * @help        :: use an await when call the function
 */


const User = require('../models/user');
const db = require('../../config/database');

module.exports = function(user_id, system_id){
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
        system : '$systems',
      }
    },
    {
      $match: {
        'system.system_id': db.mongoose.Types.ObjectId(system_id)
      },
    },
    {
      $unwind: '$system.permissions_ids'
    },
    {
      $project:{
        _id : 0 ,
        permission_id : '$system.permissions_ids',
      }
    }
  ])
};
