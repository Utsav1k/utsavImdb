var mongoose =require('mongoose');
const Imdb = require('./imdb.js');

var SavedMovie= mongoose.model('SavedMovie',new mongoose.Schema({
    
    userId:{
        type:String,
    },
    movie:{
        type:Object
    },
})
);

module.exports=SavedMovie;