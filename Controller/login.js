const User = require('../Models/login.js');
const newUser = require('../Models/register.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.login = (req,res) =>{
    async function loginUser(){
    const user={email:req.body.email,
                password:req.body.password};
    await newUser.findOne({email:user.email}, async(err,result) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            if(result!=null){
                if(bcrypt.compareSync(user.password, result.password)==true){
                    jwt.sign({_id:result._id},process.env.jwt||'duns',{expiresIn:'3600s'},(err,token) =>{
                      
                        return res.cookie('jwt',token,{maxAge : 3600000, httpOnly : false}).status(200).header({"x-auth-token" : token}).send({"msg":"Sign in successfull !!!"});
                    })
                    
            }
            else{
                return res.status(403).send("Password doesn't match");
            }
        }
        else{
            return res.status(403).send("email doesn't exist, please register !!!");
        }
        }
    })
}
loginUser();
}
exports.getLoginUser = (req,res) =>{
    async function getLoginUser(){
        const users=await newUser.findById((req.user._id), async(err, result) =>{
            if(err){
                return res.status(500).send(err);
            }
            else{
                return res.status(200).send({"firstName":result.firstName,lastName:result.lastName,email:result.email});
            }
        });
    }
    getLoginUser();
    }

// exports.deleteOneUser = (req,res) =>{
//     async function deleteOneUser(){
//         const users = await User.findById(req._id, async(err,result) =>{
//             if(err){
//                 res.status(500).send(err);
//             }
//             else{
//                 result = await result.delete();
//                 res.status(200).send(result);
//             }
//         })
//     }
//     deleteOneUser();
// }
exports.logoutUser = (req,res) =>{
    async function logoutUser(){
       return res.clearCookie('jwt').status(200).send('deleted');
    }
    logoutUser();
}