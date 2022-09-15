const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/qa');

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('Connected!');
// });

const productSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
});

const questionSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  product_id: Number,
  body: String,
  date_written: String,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpful: Number
  // answers:
});

const answerSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  question_id: Number,
  body: String,
  date_written: String,
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  helpful: Number,
});

const photoSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  answer_id: Number,
  url: String,
});

const Product = mongoose.model('Product', productSchema);
const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);
const Photo = mongoose.model('Photo', photoSchema);

// 1. Use mongoose to establish a connection to MongoDB
// 2. Set up any schema and models needed by the app
// 3. Export the models
// 4. Import the models into any modules that need them

module.exports = Product, Question, Answer, Photo;