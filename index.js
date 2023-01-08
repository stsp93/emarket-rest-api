const express = require('express');
const cors = require('./src/middlewares/cors');
const db = require('./src/config/database');
const router = require('./src/router');
const cookieParser = require('cookie-parser');
const sessionMiddleware = require('./src/middlewares/sessionMiddleware');


const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(sessionMiddleware())
app.use(router);


// Wait for DB to connect and then listen to port
db().then(() => {
    console.log('DB Connected');
    app.listen(PORT,()  => console.log(`Listening to port ${PORT}`))
})



