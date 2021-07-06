var mongoose =require('mongoose');

var User= mongoose.model('User',new mongoose.Schema({
    firstName:{
        type:String,
        maxlength:30,
        minlength:1,
        required:true
    },
    lastName:{
        type:String,
        maxlength:30,
        minlength:1,
        required:true
    },
    email:{
        type:String,
        minlength:6,
        unique:true,
        required:true
    },
})
);

module.exports=User;