/**
 * aggr_list_systems_permissions
 *
 * @description :: return an array object:
 * 
    {
      "permission_id" : ObjectId("5d3933cc6319ef5cd9824196"),
      "name" : "nuevo1",
      "key" : "nuevo2"
    }
 * @help        :: use an await when call the function
 */

const System = require('../models/system');
const db = require('../../config/database');

module.exports = function(system_id){
  return System.aggregate([
    {
      $match: {
        _id: db.mongoose.Types.ObjectId(system_id)
      },
    },
    {
      $unwind: '$permissions_id'
    },
    {
      $lookup: {
        'from': 'permissions',
        'localField': 'permissions_id',
        'foreignField': '_id',
        'as': 'permission'
      }
    },
    {
      $unwind: '$permission'
    },
    {   
      $project:{
        _id : 0,
        permission_id : '$permission._id',
        name : '$permission.name',
        key : '$permission.key',
      }
    }
  ])
};
