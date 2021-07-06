import React,{Component,createRef} from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Segment, Image, Sticky, Button, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import homeImage from '../view/home.jpg';
import aboutImage from '../view/about.jpg';
import HomeController from '../controllers/home.js';



class Home extends Component{
    constructor(props){
        super(props);
        this.state={activeItem:"home"};
    }
   
    componentDidMount(){
        HomeController.onMount(this);
    }
    handleItemClick(e,{name}){
        HomeController.handleItemClick(this,name);
    }

    render(){
        const { activeItem } = this.state;
        return(
            <div>
                
                <Menu color="blue" inverted celled="true" widths={5}>
                    <Menu.Item name='home' position="right" active={activeItem === 'home'} onClick={this.handleItemClick.bind(this)}/>
                    <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick.bind(this)} />
                    <Menu.Item name='contact me' active={activeItem === 'contact me'} onClick={this.handleItemClick.bind(this)} />
                </Menu>
                <Segment id="home">
                    This is the model version of the website/webapp I am going to create. The content or what the website will be about hasn't been decided yet. First phase of this website is to create the login/ signup page. Now the dummy text won't take place here instead a story will be placed, now enjoy :) or wait maybe some quotes.
                    <Segment>
                        <Image src={homeImage} height="450" width="100%"/>
                        <i><h3>Life brings us as many joyful moments as it does downfalls, and although there are days we wish there was a manual to follow, it simply wouldn’t be the same without the spontaneity. The journey of life may not become easier as we grow older, but we do seem to understand it better as our perspectives evolve. Whether you’re embarking on a new adventure right out of school or you want to explore different paths in your personal life, it’s never too late to change what the future looks like. If you’re in need of motivation and inspiration, these life quotes from Hoda Kotb, Meghan Markle, Reese Witherspoon, among others, are exactly what you need to hear. Advice from practicing self-love to having a sense of humor to being optimistic never grows old and will surely help you find the push you need to get where you’re going.</h3></i>
                    </Segment>
                </Segment>
                <Segment id="about">
                    {/* <i><h3>I am the emerging god of this fucking world and I am a total as people calls it pshycopath. I knows how to kill people passing maximum pain possible both physical and mental. You think you can play with me but the intution level I have, I will figure your game out before you can even play it. I have the strongest mental strength in every known and unknown world, I can't be hypnotized nor anesthesia works on me.</h3></i>  */}
                    <Image src={aboutImage} height="450" width="100%"/>
                </Segment>
                <Segment id="contact me">
                    <i><h3>To contact me call on this no.: 9529201966 <p />Mail me here : utsav.khandelwal97@gmail.com</h3></i> 
                </Segment>
            </div>
        )
    }
}

export default Home;