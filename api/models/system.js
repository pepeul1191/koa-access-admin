/**
 * system.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https
 */

const db = require('../../config/database');

module.exports = db.mongoose.model('systems',
  new db.Schema({
    name: String,
    permissions_id: [db.Schema.Types.ObjectId],
  })
);
