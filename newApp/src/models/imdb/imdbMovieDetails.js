class ImdbMovieDetails{
    constructor(){
        this.id=null;
        this.title=null;
        this.year=null;
        this.length=null;
        this.rating=null;
        this.rating_votes=null;
        this.poster=null;
        this.plot=null;
        this.trailer=null; //{id,link}
        this.cast=new Array(); //[{actor,actor_id,character}]
        this.technical_specs=new Array(); //[{...,22min}]
    }
}

export default (new ImdbMovieDetails);