import React from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import {  Route, Switch} from 'react-router';
import Landing from './view/landing.jsx';

class App extends React.Component{

    constructor(props){
      super(props);
      this.state={isLogged:false};
    }
    
    render(){
      return(
        <div>
          <Landing />
          
        </div>
      )
    }
}
export default App;