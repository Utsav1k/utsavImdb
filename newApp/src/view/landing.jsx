import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import {  Route, Switch} from 'react-router';
import cookies from 'js-cookie';
import { Menu, Segment, Image, Sticky, Button, Modal, Sidebar, Icon, Card,Form,Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Home from './home.jsx';
import Register from './register.jsx';
import Login from './login.jsx';
import SavedMovies from './SavedMovies.jsx';
import RegLog from './reglog.jsx';
import TestLogin from './testLogin.jsx';
import CheckLogged from './checkLogged.jsx';
import ImdbHome from './imdb/imdb.jsx';
import LandingModel from '../models/landing.js';
import Routes from '../routes/route.js';
import LoginController from '../controllers/login.js';
import RegisteController from '../controllers/register.js';
import About from './about.jsx';

class Landing extends Component{
    constructor(props){
        super(props);
        this.state={loginError:false,registerError:false,firstName:null, lastName:null, dob:null, confPassword:null,email:null, password:null,isLogged:LandingModel.isLogged,activeItem:'home',visible:false,reglog:"",isLogged:LandingModel.isLogged}
    }
    
    componentDidMount(){
        (async () => {
            try {
              const res = await Routes.Login.getLoginUser();
              LandingModel.isLogged=true;
              this.setState({isLogged : true});
              // console.log(res);
            } catch (err) {
              // console.log(err);
            }
          })();
    }

    handleItemClick(e,{name}){

        this.setState({ activeItem: name });
    }

    handleHeaderClick(e,{name}){
        // console.log(name)
        // this.setState({reglog:'register'});

        // this.setState({ activeItem: name });

        this.setState({reglog:name});
    }
    logout(){
        (async () => {
            try {
              const res = await Routes.Logout.logout();
              LandingModel.isLogged=false;
              this.setState({isLogged : false});
              // console.log(res);
            } catch (err) {
              // console.log(err);
            }
          })();
    }

    render(){
        const { activeItem } = this.state;
        return(
            <div style={{overflow:'auto'}}>
                {/* <Icon link name="bars" onClick={() =>{this.setState({visible:!this.state.visible})}} />
                <Sidebar.Pushable >
                    <Sidebar as={Menu} animation="scale down" direction="top" inverted horizontal visible={this.state.visible} width='thin'>
                        {this.state.isLogged==false?<span><Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleHeaderClick.bind(this)} /> <Menu.Item name='register' active={activeItem === 'register'} onClick={this.handleHeaderClick.bind(this)} /></span>:<Button onClick={this.logout.bind(this)}>Logout</Button>}
                        
                        {/* <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick.bind(this)} /> */}
                        {/* <Menu.Item name='Test' active={activeItem === 'Test'} onClick={this.handleItemClick.bind(this)} /> */}
                        {/* <Menu.Item name='Imdb' active={activeItem === 'Imdb'} onClick={this.handleItemClick.bind(this)} /> */}
                    {/* </Sidebar> */}

                    {/* <Sidebar.Pusher> */}
                    <Menu position='right' attached='top' inverted color='blue' pointing>
                        <Menu.Item position='right'
                            name='home'
                          
                            active={activeItem === 'home'}
                            onClick={this.handleItemClick.bind(this)}
                        />
                        <Menu.Item
                            name='about'
                            active={activeItem === 'about'}
                            onClick={this.handleItemClick.bind(this)}
                        />
                        {this.state.isLogged==true?<Menu.Item
                            name='saved movies'
                           
                            active={activeItem === 'saved movies'}
                            onClick={this.handleItemClick.bind(this)}
                        />:null}
                        {this.state.isLogged==false?<Button name="login" onClick={this.handleHeaderClick.bind(this)} >Login</Button> :<Button onClick={this.logout.bind(this)}>Logout</Button>}

                    </Menu>
                        <Segment attached='bottom' id="#main_segment" size='large'>
                            {this.state.reglog=='login'? 
                          
                                    <Segment inverted>
                                        {this.state.loginError?<span style={{color:'red'}}>*The login credentials are wrong</span> :null}
                                        <Form inverted>
                                        <Form.Group widths='equal'>
                                            <Form.Input required fluid label='Email' id="email" type="email" placeholder='Email' onChange={() =>LoginController.setEmail(this)} />
                                            <Form.Input required fluid label='Password' id="password" type="password" placeholder='Password' onChange={() =>LoginController.setPassword(this)} />
                                        </Form.Group>
                                        <Button.Group>
                                            <Button color='green' type='submit' onClick={(e) =>LoginController.login(this, e)} id="submit" >Submit</Button>
                                            <Button color='red' onClick={(e) =>{this.setState({reglog:''})}} id="close" >Close</Button>
                                            <Button onClick={(e) =>{this.setState({reglog:'register'})}} id="register" >Register</Button>
                                        </Button.Group>
                                        </Form>
                                    </Segment>
                                
                            :this.state.reglog=='register'?<Segment inverted>
                            {this.state.registerError?<span style={{color:'red'}}>*There is problem with registering</span> :null}

                            <Form inverted>
                                <Form.Input required fluid label='First Name' id="firstName" placeholder="First Name" onChange={() =>RegisteController.setFirstName(this)} />
                                <Form.Input required fluid label='Last Name' id="lastName" placeholder="Last Name" onChange={() =>RegisteController.setLastName(this)}  />
                                <Form.Input required fluid label='Email' id="email" type="email" placeholder='Email' onChange={() =>RegisteController.setEmail(this)} />
                                <Form.Input required fluid label='Date of Birth' type="date" id="dob" placeholder="Date of Birth" onChange={() =>RegisteController.setDob(this)} />
                                <Form.Input required fluid label='Password' id="password" type="password" placeholder='Password' onChange={() =>RegisteController.setPassword(this)} />
                                <Form.Input required fluid label='Confirm Password' id="confPassword" type="password" placeholder='Confirm Password' onChange={() =>RegisteController.setConfPassword(this)} />
                                <Input required id="checkbox" type="checkbox" /> I agree to all terms & conditions placed by Utsav Khandelwal
                            <Button.Group>
                                <Button type='submit' color='green' onClick={(e) =>RegisteController.register(this,e)} id="submit">Submit</Button>
                                <Button color='red' onClick={(e) =>{this.setState({reglog:''})}} id="close" >Close</Button>
                            </Button.Group>
                            </Form>
                        </Segment>
                            :activeItem=='home'?<ImdbHome />:
                            activeItem=='saved movies'?<SavedMovies />:
                            activeItem=='about'?<About />:null}
                            
                            {/* <Router>
                                <Switch>
                                    <Route exact path="/" component={ImdbHome} />
                                    <Route path="/saved" component={SavedMovies} />
                                    {/* <Route path="/test" component={TestLogin} /> */}
                                    {/* <Route path="/imdb" component={ImdbHome} /> */}
                                {/* </Switch>
                            </Router> */} 
                        </Segment>
                    {/* </Sidebar.Pusher> */}
                {/* </Sidebar.Pushable> */}
            </div>
        )
    }
}

export default Landing;