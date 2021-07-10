import React,{Component} from 'react';
import {Card,Button,Dimmer,Loader, Message,Input,Segment} from 'semantic-ui-react';
import Route from '../routes/route.js';
import ImdbHomeController from '../controllers/imdb/imdb.js';
import ImdbMovieDetails from './imdb/imdbMovieDetails.jsx';

class SavedMovies extends React.Component{
    constructor(props){
        super(props);
        this.state={movieListCopy:[],movieList:[],selectedMovieDetailsModelOpen:false,selectedMovieDetails:null,loader:false}
    }
    componentDidMount(){
        (async () => {
            try {
              const res = await Route.Imdb.getSavedMovies(  ) ;
              this.setState({movieList:res.body,movieListCopy:res.body});
              // console.log(res);
            } catch (err) {
              // console.log(err);
            }
          })();
    }
    searchSave(e){
        let temp=[];
        if(e.target.value==''){
            this.setState({movieList:this.state.movieListCopy});
        }
        else{
            for(let i=0;i<this.state.movieListCopy.length;i++){
                if(this.state.movieListCopy[i].movie.title.toLowerCase().includes(e.target.value.toLowerCase())){
                    temp.push(this.state.movieListCopy[i]);
                }
            }
            this.setState({movieList:temp});
        }
        
    }
    render(){
        return(
            <div style={{overflow:'auto'}}>
                <Dimmer active={this.state.loader}><Loader active={this.state.loader} >Loading...</Loader></Dimmer>
                <Segment style={{overflow:'auto'}}><Input style={{float:'right'}} onChange={this.searchSave.bind(this)} placeholder="search ..." /> </Segment>
                <Card.Group style={{overflow:'auto'}}>
                    {this.state.movieList!=undefined && this.state.movieList.length>0 ?this.state.movieList.map((item1,index1) =>{
                        return <Card style={{overflow:'auto'}}
                                key={item1.movie.id}
                                image={item1.movie.image}
                                header={  item1.movie.title}
                                extra={<Button onClick={() => ImdbHomeController.searchMovieDetails(this,item1.movie)} primary >Details</Button>}
                                />}):<Message style={{width:'100%'}} fluid warning content={'No saved movies'} />}
                </Card.Group>
                {this.state.selectedMovieDetailsModelOpen?<ImdbMovieDetails selectedMovieDetails={this.state.selectedMovieDetails} />:null}
            </div>
        )
    }
}
export default SavedMovies;