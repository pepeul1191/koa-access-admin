/*
PARAMS: system_id
*/

db.systems.aggregate([
  {
    $match: {
      _id: ObjectId('5d38e2466a354f35c722b047')
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
]);

/*
RESULT: documents

{
    "permission_id" : ObjectId("5d3933cc6319ef5cd9824196"),
    "name" : "nuevo1",
    "key" : "nuevo2"
}
*/
