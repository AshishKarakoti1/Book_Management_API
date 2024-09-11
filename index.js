const express = require('express');
const app = express();
const body_parser = require('body-parser');

const PORT = 5050;

app.use(body_parser.json());

// *** imports *** //
const connectMongoDB = require('./dbConnect');
const books_router = require('./Routes/books');
const auth_router = require('./Routes/auth');

// *** connecting to MongoDB *** //
connectMongoDB('mongodb://localhost:27017/Books_Management')
    .then(() => {console.log('connected to mongoDB')})
    .catch(() => {console.log('error connecting to database')})


// *** routing endpoints *** //
app.use('/book',books_router);
app.use('/auth',auth_router);

app.listen(PORT,(err) => {
    if(err) console.log('error connecting to server');
    else console.log(`connected at port - ${PORT}`);
})