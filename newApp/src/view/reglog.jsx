import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';

import {Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Register from './register.jsx';
import Login from './login.jsx';

class RegLog extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    componentDidMount(){
    }
    render(){
        return(
            <div>
                <div id="reglog"></div>
                <Segment inverted>
                   <a onClick={() =>{document.getElementById("reglog").innerHTML=<Login />}}>Login</a>/<a>Register</a>
                </Segment>
            </div>
        )
    }
}

export default RegLog;