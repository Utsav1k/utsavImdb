import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';

import {Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import CheckLogged from './checkLogged.jsx';
import LandingModel from '../models/landing.js';
import Login from './login.jsx';


class TestLogin extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    componentDidMount(){
    }
    render(){
        return(
            <div>
                <Segment inverted>
                   HEllofklsjfdnsd,f; mladjkfnka sdmulhsk flweluf k WNOIFPO NFBVI;ON P
                </Segment>
            </div>
        )
    }
}

export default TestLogin;