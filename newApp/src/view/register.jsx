import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import {Button, Modal, Form, Segment, Input} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import RegisteController from '../controllers/register.js';

class Register extends Component{
    constructor(props){
        super(props);
        this.state={firstName:null, lastName:null, email:null, dob:null, password:null, confPassword:null, openRegiterModel:true};
    }

    render(){
        return(
            <div>
                <Modal open={this.state.openRegiterModel}>
                    <Modal.Content>
                        <Segment inverted>
                            <Form inverted>
                                <Form.Input required fluid label='First Name' id="firstName" placeholder="First Name" onChange={() =>RegisteController.setFirstName(this)} />
                                <Form.Input required fluid label='Last Name' id="lastName" placeholder="Last Name" onChange={() =>RegisteController.setLastName(this)}  />
                                <Form.Input required fluid label='Email' id="email" type="email" placeholder='Email' onChange={() =>RegisteController.setEmail(this)} />
                                <Form.Input required fluid label='Date of Birth' type="date" id="dob" placeholder="Date of Birth" onChange={() =>RegisteController.setDob(this)} />
                                <Form.Input required fluid label='Password' id="password" type="password" placeholder='Password' onChange={() =>RegisteController.setPassword(this)} />
                                <Form.Input required fluid label='Confirm Password' id="confPassword" type="password" placeholder='Confirm Password' onChange={() =>RegisteController.setConfPassword(this)} />
                                <Input required id="checkbox" type="checkbox" /> I agree to all terms & conditions placed by Utsav Khandelwal
                            <Button.Group>
                                <Button type='submit' onClick={(e) =>RegisteController.register(this,e)} id="submit">Submit</Button>
                                <Button onClick={(e) =>{this.setState({openRegiterModel:false})}} id="close" >Close</Button>
                            </Button.Group>
                            </Form>
                        </Segment>
                    </Modal.Content>
                </Modal>
                {/* <form>
                <Modal defaultOpen={true}>
                    <Modal.Content>
                        <label>First Name:</label>
                        <input required type="text" id="firstName" placeholder="First Name" onChange={() =>RegisteController.setFirstName(this)} />
                        <label>Last Name:</label>
                        <input required type="text" id="lastName" placeholder="Last Name" onChange={() =>RegisteController.setLastName(this)}  />
                        <label>Email:</label>
                        <input required type="email" id="email" placeholder="Email" onChange={() =>RegisteController.setEmail(this)} />
                        <label>Date of Birth:</label>
                        <input required type="date" id="dob" placeholder="Date of Birth" onChange={() =>RegisteController.setDob(this)} />
                        <label>Password:</label>
                        <input required type="password" id="password" placeholder="Password" onChange={() =>RegisteController.setPassword(this)}  />
                        <label>Confirm Password:</label>
                        <input required type="password" id="confPassword" placeholder="Confirm Password" onChange={() =>RegisteController.setConfPassword(this)} />
                        <input id="checkbox" type="checkbox" /> I agree to all terms & conditions placed by Utsav Khandelwal
                        <Button type='submit' onClick={(e) =>RegisteController.register(this,e)} id="submit">Submit</Button>
                        <div id="error" />
                    </Modal.Content>
                </Modal>
                </form> */}
            </div>
        )
    }
}

export default Register;