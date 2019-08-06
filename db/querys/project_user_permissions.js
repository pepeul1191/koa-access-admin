/*
PARAMS: user_id, system_id
*/

db.users.aggregate([
  {
    $match: {
      _id: ObjectId('5d3a08bf0f10e27b3462487b')
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
      'system.system_id': ObjectId('5d38e2466a354f35c722b047')
    },
  },
  {
    $unwind: '$system.permissions_ids'
  },
  {
    $project:{
       _id : 0 ,
      permissions_id : '$system.permissions_ids',
    }
  }
]);


/*

RESULT: documents

{
  "permissions_id" : ObjectId("5d3933b66319ef5cd9824195")
}

{
  "permissions_id" : ObjectId("5d3933cc6319ef5cd9824196")
}
*/