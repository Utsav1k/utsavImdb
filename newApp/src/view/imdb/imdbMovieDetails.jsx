import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';

import {Segment, Input, Button, Card, Modal, Embed, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';




class ImdbHome extends Component{
    constructor(props){
        super(props);
        this.state={selectedMovieDetails:null,openModel:true};
    }
    componentDidMount(){
        this.setState({selectedMovieDetails:this.props.selectedMovieDetails});
    }
    
    render(){
        return(
            <div>
                {this.state.selectedMovieDetails!=null?
                    <Modal open={this.state.openModel}>
                        <Modal.Header>
                            {this.state.selectedMovieDetails.title}
                        </Modal.Header>
                        <Modal.Content image>
                            <Image size='medium' src={this.state.selectedMovieDetails.poster} wrapped />
                            <Modal.Description>
                                {this.state.selectedMovieDetails.plot !=null && this.state.selectedMovieDetails.plot !="" ? <span><b>Description:</b> {this.state.selectedMovieDetails.plot} <p/></span> :null}
                                {this.state.selectedMovieDetails.rating !=null && this.state.selectedMovieDetails.rating !="" ? <span><b>Rating:</b> {this.state.selectedMovieDetails.rating} ({this.state.selectedMovieDetails.rating_votes} votes) <p /></span> :null}
                                {this.state.selectedMovieDetails.year !=null && this.state.selectedMovieDetails.year !="" ? <span><b>Release Year:</b> {this.state.selectedMovieDetails.year} <p/></span> :null}
                                {this.state.selectedMovieDetails.length !=null && this.state.selectedMovieDetails.length !="" ?<span> <b>Length:</b> {this.state.selectedMovieDetails.length} <p /></span> :null}
                                {this.state.selectedMovieDetails.technical_specs[0]!=undefined &&this.state.selectedMovieDetails.technical_specs[0][1]!=undefined &&this.state.selectedMovieDetails.technical_specs[0][1] !=null && this.state.selectedMovieDetails.technical_specs[0][1] !="" ? <span><b>Runtime:</b> {this.state.selectedMovieDetails.technical_specs[0][1].replace("<br>","; ")} <p /></span> :null}
                                {this.state.selectedMovieDetails.actor !=null && this.state.selectedMovieDetails.actor !="" ? <span><b>Cast:</b> {this.state.selectedMovieDetails.cast.map((item,index) =><span key={item.actor_id}>{item.actor} ({item.character}){index!=this.state.selectedMovieDetails.length-1?", ":null}</span>)} <p /></span> :null}
                                {this.state.selectedMovieDetails.trailer !=null && this.state.selectedMovieDetails.trailer.link !="" ? <span><b>Trailer:</b> <a target="_blank" href={this.state.selectedMovieDetails.trailer.link} >IMDB Trailer</a> <p /><iframe src="https://www.imdb.com/video/vi4240746009?asIframe" /></span> :null}

                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button color='red' onClick={() => this.setState({openModel:false})}>
                            Close
                        </Button>
                        </Modal.Actions>
                    </Modal>
                    :null}
            </div>
        )
    }
}

export default ImdbHome;