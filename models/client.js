var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({ show: { type: String } });

module.exports = mongoose.model('Client', clientSchema);