const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = 6902;

app.use(bodyParser.json());

// *** Imports *** //
const connectToDatabase = require('./dbConnect');
const booksRouter = require('./Routes/books');
const authRouter = require('./Routes/auth');

// *** Connecting to MongoDB *** //
connectToDatabase('mongodb://localhost:27017/Books_Management')
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Error connecting to database'));

// *** Routing Endpoints *** //
app.use('/books', booksRouter);
app.use('/auth', authRouter);

app.listen(PORT, (err) => {
    if (err) console.log('Error starting server');
    else console.log(`Server running on port: ${PORT}`);
});
