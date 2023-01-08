const express = require('express');
const cors = require('./middlewares/cors');
const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({message: 'Working'})
})

const PORT = process.env.PORT || 3030

app.listen(PORT,()  => console.log(`Listening to port ${PORT}`))

