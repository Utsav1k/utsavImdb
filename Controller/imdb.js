const request = require('request');
const ImdbModel = require('../Models/imdb.js');
const SavedMovieModel = require('../Models/saveMovies.js');

const searchUrl='https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/';
const detailsUrl='https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/';

const searchByNameParams =  {
  method: 'GET',
  url: searchUrl,
  headers: {
    'x-rapidapi-key': process.env.rapidApikey||'b9425fb8ffmsh252c27ead67d2d9p1f43efjsne5ab0f1e16b1',
    'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com',
    useQueryString: true
  }
};

const searchByIdParams = {
    method: 'GET',
    url: detailsUrl,
    headers: {
      'x-rapidapi-key': 'b9425fb8ffmsh252c27ead67d2d9p1f43efjsne5ab0f1e16b1',
      'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com',
      useQueryString: true
    }
}

exports.searchByName = (req,res) => {
    async function searchByName() {
        const imdb=new ImdbModel({
            title:await req.body.title
        });
        searchByNameParams.url=searchUrl+imdb.title;
        request(searchByNameParams, async function (error, response, body) {
            if (error) {
                return res.status(500).send('err');
            }
            else {
                return res.status(200).send({"title":req.body.title,
                                            "movies":JSON.parse(body)});
            }

        });        
    }
    searchByName();
}

exports.searchById = (req,res) => {
    async function searchById() {
        const imdb=new ImdbModel({
            id:await req.body.id
        });
        searchByIdParams.url=detailsUrl+imdb.id;
        request(searchByIdParams, async function (error, response, body) {
            if (error) {
                // console.log(error);
                return res.status(500).send(error);
            }
            else {
                return res.status(200).send(JSON.parse(body));
            }

        });        
    }
    searchById();
}

exports.searchMultipleByName = (req,res) => {
    async function searchMultipleByName() {
        await req.body.map( async (item,index) =>{
            searchByNameParams.url = searchUrl+item.title;
            request(searchByNameParams, async function (error, response, body) {
                if (error) {
                    await res.send('err');
                }
                else {
                    res.removeHeader();
                    await res.send({"title":item.title,
                    "movies":JSON.parse(body)});
                }

            });     
        });
    }
    searchMultipleByName();
}

exports.savePreferredMovies = (req,res) =>{
    async function savePreferredMovies(){
        const result=[];
        
        await req.body.map(async (item,index) =>{
            await SavedMovieModel.find({movie:item},async (err,res) =>{
                if(!err && res){
                    if(res.length >0){
                        const saved=await SavedMovieModel.findByIdAndUpdate(res[0]._id,{movie:await item});
                        const tempRes=await saved.save();
                        result[item.id]=tempRes;
                    }
                    else{
                        const saved=new SavedMovieModel({
                            userId:req.user._id,
                            movie:await item
                        })
                        const tempRes=await saved.save();
                        result[item.id]=tempRes;
                    }
                }
                else{
                    const saved=new SavedMovieModel({
                        userId:req.user._id,
                        movie:await item
                    })
                    const tempRes=await saved.save();
                    result[item.id]=await tempRes;
                }
            })
            
        })
       
        if(result){
            return res.status(200).send(result);
        }
        else{
            return res.status(500).send("not saved");
        }
    }
    savePreferredMovies();
}

exports.getSavedMovies = (req,res) =>{
    async function getSavedMovies(){
        const savedMovies=await SavedMovieModel.find({userId:req.user._id}, async(err, result) =>{
            if(err){
                return res.status(500).send(err);
            }
            else{
                return res.status(200).send(result);
            }
        });
    }
    getSavedMovies();
}