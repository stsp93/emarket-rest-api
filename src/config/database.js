require('dotenv').config()

const mongoose = require('mongoose');

const connectionString = process.env.DB_CONN_STRING 
mongoose.set('strictQuery', false);

module.exports = () => mongoose.connect(connectionString);