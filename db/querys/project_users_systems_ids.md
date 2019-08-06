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
      exist: '1',
    }
  },
]);

db.systems.aggregate([
  {   
    $project:{
      _id : 0,
      system_id: '$_id',
      exist: '0',
    },
  },
]);