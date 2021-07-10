import React,{Component,createRef} from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Segment, Image, Sticky, Button, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import homeImage from '../view/home.jpg';
import aboutImage from '../view/about.jpg';
// import HomeController from '../controllers/home.js';



class About extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
   
   

    render(){
        return(
            <div>
              
                <Segment id="home">
                    This webapp is for searching movies and saving the preferred ones.<p />
                    This webapp is moblie responsive.<p />
                    In this I have used MERN stack and the rapid api for fetching imdb details.<p />
                    There is no need for login for searching movies, but for saving movies login is required.
                    <p />You can login after registering  with basic details, there is no check made for correct details, but every detail should be entered and email must be in a@b.c format.
                    <p />You can do search two ways-
                    <p />1. Search by entering movie pr series name and select what kind of search it is-
                    <p />a. If you select single search than the previous search will be reset.
                    <p />b. If you select multiple search than the new search will be appended to it.
                    <p />2. You can also use a csv file (template is present in the web app itself, you can download and edit it),enter name of movies in first column only and starting from row 2 and upload and search.
                    <p />After search if you want to save some movie for future reference than, you can select the movies and click on save button on top, but you must be logged in.
                    <p />You can also reset your search.
                    {/* <Segment>
                        <Image src={homeImage} height="450" width="100%"/>
                        <i><h3>Life brings us as many joyful moments as it does downfalls, and although there are days we wish there was a manual to follow, it simply wouldn’t be the same without the spontaneity. The journey of life may not become easier as we grow older, but we do seem to understand it better as our perspectives evolve. Whether you’re embarking on a new adventure right out of school or you want to explore different paths in your personal life, it’s never too late to change what the future looks like. If you’re in need of motivation and inspiration, these life quotes from Hoda Kotb, Meghan Markle, Reese Witherspoon, among others, are exactly what you need to hear. Advice from practicing self-love to having a sense of humor to being optimistic never grows old and will surely help you find the push you need to get where you’re going.</h3></i>
                    </Segment>
                </Segment>
                <Segment id="about">
                    {/* <i><h3>I am the emerging god of this fucking world and I am a total as people calls it pshycopath. I knows how to kill people passing maximum pain possible both physical and mental. You think you can play with me but the intution level I have, I will figure your game out before you can even play it. I have the strongest mental strength in every known and unknown world, I can't be hypnotized nor anesthesia works on me.</h3></i>  */}
                    {/* <Image src={aboutImage} height="450" width="100%"/>*/}
                </Segment> 
                <Segment id="contact me">
                    <i><h3>To contact me call on this no.: 9529201966 <p />Mail me here : <a href="mailto:utsav.khandelwal.wdm@gmail.com">utsav.khandelwal.wdm@gmail.com</a>  </h3></i> 
                </Segment>
            </div>
        )
    }
}

export default About;