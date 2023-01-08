const express = require('express');
const cors = require('./middlewares/cors');
const app = express();
const db = require('./config/database')

const PORT = process.env.PORT || 3030;

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({message: 'Working'})
})


// Wait for DB to connect and then listen to port
db().then(() => {
    console.log('DB Connected');
    app.listen(PORT,()  => console.log(`Listening to port ${PORT}`))
})



