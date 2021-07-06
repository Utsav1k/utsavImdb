var mongoose =require('mongoose');

var Imdb= mongoose.model('Imdb',new mongoose.Schema({
    title:{
        type:String
    },
    id:{
        type:String,
        unique:true
    },
    image:{
        type:String
    },
})
);

module.exports=Imdb;