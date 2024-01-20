
const mongoose = require('mongoose');

const reponseSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  response: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
},{ collection: 'Reponses'});

const Reponse = mongoose.model('Reponse', reponseSchema);

module.exports = Reponse; 
