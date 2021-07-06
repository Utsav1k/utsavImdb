import React,{Component} from 'react';
import { withRouter, Route } from 'react-router-dom';

import {Segment, Input, Button, Card, Loader, Dimmer, Checkbox, Accordion, Icon, Dropdown, Sticky, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import ImdbHomeController from '../../controllers/imdb/imdb.js';
import ImdbModel from '../../models/imdb/imdb.js';
import ImdbNameModel from '../../models/imdb/imdbName.js';
import ImdbMovieDetails from './imdbMovieDetails.jsx';
import test from '../test.csv';


class ImdbHome extends Component{
    constructor(props){
        super(props);
        this.state={searchType:'single',searchOption:[{"key":"single","value":"single","text":"single search"},{"key":"multiple","value":"multiple","text":"multiple search"}],selectedMovieList:[],movList:[],searchMovieText:'',titles:[],dummyTitles:[],selectedMovieDetails:null,selectedMovieDetailsModelOpen:false,loader:false,openMovieList:[]};
    }
    componentDidMount(){
        this.setState({titles:ImdbModel.titles});
        this.setState({searchMovieText:ImdbNameModel.title==null?'':ImdbNameModel.title});
        // ImdbHomeController.getSavedMovies(this);
        this.state.dummyTitles=[
            {"id": "tt0108778",
            "image": "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@.jpg",
            "title": "Friends"},
            {
                "id": "tt0248126",
                "image": "https://m.media-amazon.com/images/M/MV5BOTQ5Nzc3NzAtMzZlMS00ZWJjLWIxMGMtNDU4ZTQ1NmNjMjc5XkEyXkFqcGdeQXVyODE5NzE3OTE@.jpg",
                "title": "Kabhi Khushi Kabhie Gham...",
            },
            {
                "id": "tt0441773",
                "image": "https://m.media-amazon.com/images/M/MV5BODJkZTZhMWItMDI3Yy00ZWZlLTk4NjQtOTI1ZjU5NjBjZTVjXkEyXkFqcGdeQXVyODE5NzE3OTE@.jpg",
                "title": "Kung Fu Panda"
            },
            {
                "id": "tt0111161",
                "image": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@.jpg",
                "title": "The Shawshank Redemption"
            }
        ];
        this.setState({dummyTitles:this.state.dummyTitles});
    }
    handleFile = (e) => {
        const content = e.target.result;
        console.log(content)
        let movList=content.split('\n');
        movList.splice(0,1);
        if(movList[movList.length-1]==''){
            movList.splice(movList.length-1,1);
        }
        this.setState({movList:movList})
        console.log(movList)
       
        // You can set content in state and show it in render.
      }
      
      handleChangeFile = (file) => {
        let fileData = new FileReader();
        fileData.onloadend = this.handleFile;
        fileData.readAsText(file);
        console.log(fileData)
        
      }
      movieSelect(item,e,{checked}){
        if(checked==true){
            this.state.selectedMovieList.push(item);
        }
        else{
            for(let i=0;i<this.state.selectedMovieList.length;i++){
                if(this.state.selectedMovieList[i].id==item.id){
                    this.state.selectedMovieList.splice(i,i+1);
                    break;
                }
            }
        }
        this.setState({selectedMovieList:this.state.selectedMovieList})
        // console.log(this.state.selectedMovieList)
      }
    //   downloadTxtFile = () => {
    //     const element = document.createElement("a");
    //     const file = new Blob([document.getElementById('myInput').value], {type: 'text/plain'});
    //     element.href = URL.createObjectURL(file);
    //     element.download = "../test.csv";
    //     document.body.appendChild(element); // Required for this to work in FireFox
    //     element.click();
    //   }
    render(){
        return(
            <div style={{overflow:'auto'}}>
                <Segment style={{overflow:'auto'}}>
        {/* <button onClick={this.downloadTxtFile}>Download txt</button> */}
                   <Dropdown onChange={(e,{value}) =>{this.setState({searchType:value})}} value={this.state.searchType} inline options={this.state.searchOption} /><Input id="searchMovieText" value={this.state.searchMovieText} placeholder="Search" label={<Button primary onClick={() => ImdbHomeController.searchMovie(this) } >Search </Button>} labelPosition='right' onChange={(e) =>ImdbHomeController.setSearchText(this,e)} />
                   {/* <Input id="searchMultText" value={this.state.searchMovieText} placeholder="" label={<Button primary onClick={() => ImdbHomeController.searchMovie(this) } >Search </Button>} labelPosition='right' onChange={(e) =>ImdbHomeController.searchMovieListDetails(this,["Friends","Utsav"],e)} /> */}
                   <Button size='large' onClick={(e)=>{this.setState({titles:[]})}} style={{float:'right'}} secondary>Reset</Button><p />
                   <Input style={{overflow:'auto'}} type="file" accept=".csv" onChange={e => this.handleChangeFile(e.target.files[0])} ><a href={test} download="template.csv">Template for bulk search</a><input /><Button size='large' primary onClick={() => ImdbHomeController.searchMovieListDetails(this) } >Search </Button></Input>
                   {this.state.titles.length>0?<Button size='large' style={{float:'right'}} primary onClick={(e) =>{ImdbHomeController.saveSelectedMovies(this)}}>Save</Button>:null}

                </Segment>
                <Segment style={{overflow:'auto'}}>
                    
                        {this.state.titles.map((item,index) =>{
                            return <Accordion style={{overflow:'auto'}} styled fluid key={index}> 
                            <Accordion.Title style={{overflow:'auto'}}>
                               <span onClick={() =>{this.state.openMovieList[item.title]=!this.state.openMovieList[item.title]; this.setState({openMovieList:this.state.openMovieList})}}>{this.state.openMovieList[item.title]?<Icon  name='minus' /> :<Icon  name='plus' />}
                                {item.title}</span>
                                <Icon style={{float:'right'}} link onClick={()=>{for(let i=0;i<this.state.titles.length;i++){
                                    if(this.state.titles[i].title==item.title){
                                        this.state.titles.splice(i,1);
                                        this.setState({titles:this.state.titles});
                                        break;
                                    }
                                }}} name='delete' />
                            </Accordion.Title>
                        
                            <Accordion.Content style={{overflow:'auto'}} active={this.state.openMovieList[item.title]}>
                                <Card.Group style={{overflow:'auto'}} >
                                    {item.movies!=undefined && item.movies.length>0 ?item.movies.map((item1,index1) =>{
                                        return <Card style={{overflow:'auto'}}
                                                key={item1.id}
                                                image={item1.image}
                                                header={<Checkbox onClick={this.movieSelect.bind(this,item1)} label={  item1.title}/>}
                                                extra={<Button onClick={() => ImdbHomeController.searchMovieDetails(this,item1)} primary >Details</Button>}
                                                />}):null}
                                </Card.Group>
                            </Accordion.Content>
                            
                        </Accordion>
                        })}
                    
                    <Dimmer active={this.state.loader}><Loader active={this.state.loader} >Loading...</Loader></Dimmer>
                    {this.state.titles.length>0?null:
                        <Card.Group style={{overflow:'auto'}} >
                            {this.state.dummyTitles.map((item,index) => {
                                return(
                                    <Card style={{overflow:'auto'}} key={item.id}>
                                         <Image src={item.image} />
                                         <Card.Header >{item.title}</Card.Header>
                                         <Card.Meta style={{width:'auto'}}>These are for samples</Card.Meta>
                                         {/* <Button ui={false} wrapped onClick={() => ImdbHomeController.searchMovieDetails(this,item)} primary >Details</Button> */}
                                         <Card.Content ><Button onClick={() => ImdbHomeController.searchMovieDetails(this,item)} primary >Details</Button></Card.Content>
                                    </Card>
                                    // <Card
                                    //     key={item.id}
                                    //     image={item.image}
                                    //     header={item.title}
                                    //     meta="These are for samples"
                                    //     extra={<Button onClick={() => ImdbHomeController.searchMovieDetails(this,item)} primary >Details</Button>}
                                    // />
                                )
                            })}
                        </Card.Group> }
                    {this.state.selectedMovieDetailsModelOpen?<ImdbMovieDetails selectedMovieDetails={this.state.selectedMovieDetails} />:null}
                </Segment>
            </div>
        )
    }
}

export default ImdbHome;