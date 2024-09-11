const mongoose = require('mongoose');

async function connectToMongoDB(connectionString) {
    return mongoose.connect(connectionString);
}

module.exports = connectToMongoDB;
