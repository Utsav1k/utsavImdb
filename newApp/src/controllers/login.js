import LoginUser from '../models/login.js';
import Route from '../routes/route.js';
import LandingModel from '../models/landing.js';

class LoginController{

    setEmail(thisParent){
      thisParent.setState({email:document.getElementById("email").value});
    }
    setPassword(thisParent){
      thisParent.setState({password:document.getElementById("password").value});
    }
    login(thisParent, e){
        e.preventDefault();
        LoginUser.email = thisParent.state.email;
        LoginUser.password = thisParent.state.password;
        (async () => {
            try {
              const res = await Route.Login.login( LoginUser ) ;
              LandingModel.isLogged=true;
              thisParent.setState({isLogged:true});
              thisParent.setState({reglog:''});
              thisParent.setState({loginError:false});
              console.log(res);
            } catch (err) {
              thisParent.setState({loginError:true});
              console.log(err);
            }
            
          })();
    }
  
}

export default (new LoginController);