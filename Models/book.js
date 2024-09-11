const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:String
    },
    publication:{
        type:Number
    },
    image_url:{
        type:String
    },
    ISBN:{
        type:Number,
        unique:true
    },
    description:{
        type:String
    }
});

const books = mongoose.model('books',bookSchema);

module.exports = books;