import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import cookies from 'js-cookie';

import TestLogin from './testLogin.jsx';
import Login from './login.jsx';
import LandingModel from '../models/landing.js';


class CheckLogged extends Component{
    constructor(props){
        super(props);
        this.state={isLogged:false};
    }
    componentDidMount(){
        // if(cookies.get('jwt')==undefined){
        //     this.setState({isLogged:false});
        // }
        // console.log(LandingModel.isLogged);
        LandingModel.isLogged==true?this.setState({isLogged:true}):this.setState({isLogged:false})
    }
        render(){
            return(
                <div>
                    {this.state.isLogged===false?<Login />:null}
                </div>
            )
    }
}


export default CheckLogged;