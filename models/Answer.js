var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;


var schema = new Schema({
  answer: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Answer = mongoose.model('Answer', schema);

module.exports = Answer;
