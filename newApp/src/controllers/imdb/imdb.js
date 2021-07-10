import Route from '../../routes/route.js';
import ImdbModel from '../../models/imdb/imdb.js';
import ImdbNameModel from '../../models/imdb/imdbName.js';
import ImdbMovieDetailsModel from '../../models/imdb/imdbMovieDetails.js';

class ImdbController {
    setSearchText(thisParent,e){
        thisParent.setState({searchMovieText:e.target.value});
        ImdbNameModel.title=e.target.value;
    }
    searchMovie(thisParent){
      // console.log(thisParent.state.searchMovieText)
      if(thisParent.state.searchType=='single'){
        thisParent.state.titles=[];
      }
      if(ImdbNameModel.title==''){
        thisParent.setState({titles:[]})
        return;
      }
        thisParent.setState({loader:true});
        (async () => {
            try {
              const res = await Route.Imdb.searchByName( ImdbNameModel ) ;
              
              thisParent.setState({loader:false});
              thisParent.state.titles.push({
                "title":await res.body.title,
                "movies":await res.body.movies.titles
              })
              thisParent.state.openMovieList[res.body.title]=true;
              thisParent.setState({titles:thisParent.state.titles});
              // console.log(res);
            } catch (err) {
              // console.log(err);
            }
          })();
    }
    searchMovieDetails(thisParent,details){
        thisParent.setState({loader:true});
        ImdbNameModel.id=details.id;
        (async () => {
            try {
                const res = await Route.Imdb.searchMovieDetailById( ImdbNameModel ) ;
                thisParent.setState({loader:false});
                thisParent.setState({selectedMovieDetails:await res.body});
                thisParent.setState({selectedMovieDetailsModelOpen:false});
                thisParent.setState({selectedMovieDetailsModelOpen:true});
                ImdbMovieDetailsModel.id=res.body.id;
                ImdbMovieDetailsModel.cast=res.body.cast;
                ImdbMovieDetailsModel.length=res.body.length;
                ImdbMovieDetailsModel.plot=res.body.plot;
                ImdbMovieDetailsModel.poster=res.body.poster;
                ImdbMovieDetailsModel.rating=res.body.rating;
                ImdbMovieDetailsModel.rating_votes=res.body.rating_votes;
                ImdbMovieDetailsModel.title=res.body.title;
                ImdbMovieDetailsModel.trailer=res.body.trailer;
                ImdbMovieDetailsModel.year=res.body.year;
                ImdbMovieDetailsModel.technical_specs=res.body.technical_specs;
              // console.log(res);
            } catch (err) {
              // console.log(err);
            }
          })();
    }
    searchMovieListDetails(thisParent){
      thisParent.setState({loader:true});
      thisParent.setState({titles: []});
      if(thisParent.state.movList.length==0){
        thisParent.setState({loader:false});
        return;
      }
      let List=thisParent.state.movList;
      for(let i=0;i<List.length;i++){        
        (async () => {
          try {
           
            ImdbNameModel.title=List[i].substring(0,List[i].length-1);
           
            const res = await Route.Imdb.searchByName( ImdbNameModel ) ;
            // console.log(res)
            thisParent.state.titles.push({
              "title":await res.body.title,
              "movies":await res.body.movies.titles
            })
            thisParent.state.openMovieList[res.body.title]=true;
            // if(res.body.titles!=undefined){
            //   res.body.titles.map((item,index) =>{
            //     thisParent.state.titles.push(item)
            //   })
            // }
            
            thisParent.setState({titles: thisParent.state.titles});
            thisParent.setState({loader:false});
            ImdbModel.titles=thisParent.state.titles;
            // ImdbModel.companies=res.body.companies;
            // ImdbModel.names=res.body.names;
            // console.log(thisParent.state.titles);
          } catch (err) {
            // console.log(err);
          }
        })();
      }
    }
    saveSelectedMovies(thisParent){
      (async () => {
        try {
          const res = await Route.Imdb.savePreferredMovies( thisParent.state.selectedMovieList ) ;
          thisParent.setState({showSaveMessage:'saving started... go to saved movies tab to check saved movies'})
          // console.log(res);
        } catch (err) {
          thisParent.setState({showSaveMessage:'some error while saving movies'})
          // console.log(err);
        }
      })();
    }
    getSavedMovies(thisParent){
      (async () => {
        try {
          const res = await Route.Imdb.getSavedMovies(  ) ;

          // console.log(res);
        } catch (err) {
          // console.log(err);
        }
      })();
    }
}

export default (new ImdbController);