var newUser = require('../Models/register.js');
const bcrypt=require('bcryptjs');

exports.register = (req,res) =>{
    async function registerUser(){
        const users= await newUser.find();
        if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.dob || !req.body.password || !req.body.confPassword){
           return res.status(400).send({msg:"All required fields haven't been filled"});
        }
        users.map((item,index) =>{
            if(item.email==req.body.email){
                return res.status(403).send("This email already exists")
            }
        })
        if(req.body.password != req.body.confPassword){
            return res.status(403).send("Passwords don't match");
        }
        const user=new newUser({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            dob:req.body.dob,
            email:req.body.email,
            password:req.body.password,
            confPassword:req.body.confPassword
        });
        const saltRounds=10;
        const pwd=await bcrypt.hashSync(user.password,saltRounds);
        const cpwd=await bcrypt.hashSync(user.confPassword,saltRounds);
        user.password=pwd;
        user.confPassword=cpwd;
        const result = await user.save();
        const response = result;
        return res.status(200).send("registered");
    }
    registerUser();
}
exports.getAllUser = (req,res) =>{
    async function getUser(){
        const users=await newUser.find();
        res.status(200).send(users);
    }
    getUser();
}
exports.deleteAllUser = (req,res) =>{
        async function deleteUser(){
            const users=await newUser.deleteMany();
            res.status(200).send(users);
        }
        deleteUser();
}