/**
 * log.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https
 */

const db = require('../../config/database');

module.exports = db.mongoose.model('logs',
  new db.Schema({
    user_id:  db.Schema.Types.ObjectId,
    time:  db.Schema.Types.Date,
    action:  String,
    detail:  String,
  })
);
