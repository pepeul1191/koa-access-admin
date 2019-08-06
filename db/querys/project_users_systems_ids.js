// PARAMS: user_id

db.users.aggregate([
  {
    $match: {
      _id: ObjectId('5d45c2013f01542197268ce9')
    },
  },
  {
    $unwind: '$systems'
  },
  {   
    $project:{
       _id : 0 ,
      system_id : '$systems.system_id',
      exist: '$systems.status',
    }
  },
]);

// RESULT: documents

/*
{
  "system_id" : ObjectId("5d38e2466a354f35c722b047"),
  "exist" : true
}

{
  "system_id" : ObjectId("5d4848e22d154445a207675c"),
  "exist" : false
}

{
  "system_id" : ObjectId("5d48b4ebc08242eabaf4316d"),
  "exist" : false
}
*/
