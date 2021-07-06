import RegisterUser from '../models/register.js';
import Route from '../routes/route.js';

class RegisterController {
    
    setFirstName(thisParent){
        thisParent.setState({firstName:document.getElementById("firstName").value });
    }
    setLastName(thisParent){
        thisParent.setState({lastName:document.getElementById("lastName").value });
    }
    setEmail(thisParent){
        thisParent.setState({email:document.getElementById("email").value });
    }
    setDob(thisParent){
        thisParent.setState({dob:document.getElementById("dob").value });
    }
    setPassword(thisParent){
        thisParent.setState({password:document.getElementById("password").value });
    }
    setConfPassword(thisParent){
        thisParent.setState({confPassword:document.getElementById("confPassword").value });
    }

    register(thisParent,e){
        e.preventDefault();
        RegisterUser.firstName = thisParent.state.firstName;
        RegisterUser.lastName = thisParent.state.lastName;
        RegisterUser.email = thisParent.state.email;
        RegisterUser.dob = thisParent.state.dob;
        RegisterUser.password = thisParent.state.password;
        RegisterUser.confPassword = thisParent.state.confPassword;
        // if(!document.getElementById("checkbox").checked){
        //     return document.getElementById("error").innerHTML="Please accept the terms & conditions";
        // }
        (async () => {
            try {
              const res = await Route.Register.register( RegisterUser );
              thisParent.setState({registerError:false});
              thisParent.setState({reglog:''})

              console.log(res);
            } catch (err) {
              console.log(err.response);
              thisParent.setState({registerError:true});
            }
          })();
    }
   
}

export default (new RegisterController);