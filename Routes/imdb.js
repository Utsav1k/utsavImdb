const express =require('express');
const app=express();
const router = express.Router();

const Imdb = require('../Models/imdb.js');
const ImdbController = require('../Controller/imdb.js');

const headers= {
    'x-rapidapi-key': 'b9425fb8ffmsh252c27ead67d2d9p1f43efjsne5ab0f1e16b1',
    'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com',
    useQueryString: true
  };
  router.get('https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/'+Imdb.title,ImdbController.searchByName).head(headers);