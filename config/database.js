const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/emarket';
mongoose.set('strictQuery', false);

module.exports = () => mongoose.connect(connectionString)