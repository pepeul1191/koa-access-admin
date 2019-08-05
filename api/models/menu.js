/**
 * menu.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https
 */

const db = require('../../config/database');

module.exports = db.mongoose.model('menus',
  new db.Schema({
    name: String,
    url: String,
    type: String,
    parent_id: [db.Schema.Types.ObjectId],
  })
);
