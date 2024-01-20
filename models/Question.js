const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
},{ collection: 'questions' });

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
