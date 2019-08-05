/**
 * state.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https
 */

const db = require('../../config/database');

module.exports = db.mongoose.model('states',
  new db.Schema({
    name:  String,
  })
);
