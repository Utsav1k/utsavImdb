import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';

import LoginController from '../controllers/login.js';
import LandingModel from '../models/landing.js';

import { Button, Form, Segment, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


class Login extends Component{
    constructor(props){
        super(props);
        this.state={ email:null, password:null,isLogged:LandingModel.isLogged, openLoginModel:true};
    }
    componentDidMount(){
        LandingModel.isLogged==true?this.setState({openLoginModel:false}):this.setState({openLoginModel:true});
    }
    render(){
        return(
            <div>
                <Modal onClose={(e) =>{this.setState({openLoginModel:false})}} onOpen={(e)=>{this.setState({openLoginModel:true})}} open={this.state.openLoginModel}>
                    <Modal.Content>
                        <Segment inverted>
                            <Form inverted>
                            <Form.Group widths='equal'>
                                <Form.Input required fluid label='Email' id="email" type="email" placeholder='Email' onChange={() =>LoginController.setEmail(this)} />
                                <Form.Input required fluid label='Password' id="password" type="password" placeholder='Password' onChange={() =>LoginController.setPassword(this)} />
                            </Form.Group>
                            <Button.Group>
                                <Button type='submit' onClick={(e) =>LoginController.login(this, e)} id="submit" >Submit</Button>
                                <Button onClick={(e) =>{this.setState({openLoginModel:false})}} id="close" >Close</Button>
                            </Button.Group>
                            </Form>
                        </Segment>
                    </Modal.Content>
                </Modal>
                {/* <form>
                    <label>Email:</label>
                    <input required type="email" id="email" placeholder="Email" />
                    <label>Password:</label>
                    <input required type="password" id="password" placeholder="Password"  />
                    <input type="submit" onClick={this.login.bind(this)} id="submit" name="Submit" />
                </form> */}
            </div>
        )
    }
}

export default Login;