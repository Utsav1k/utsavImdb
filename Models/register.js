var mongoose =require('mongoose');

var newUser= mongoose.model('newUser',new mongoose.Schema({
    firstName:{
        type:String,
        maxlength:30,
        minlength:1,
        required:true
    },
    dob:{
        type:Date,
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
    password:{
        type:String,
        hide:true,
        minlength:8,
        required:true
    },
    confPassword:{
        type:String,
        hide:true,
        minlength:8,
        required:true
    }
})
);

module.exports=newUser;