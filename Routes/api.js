const express =require('express');
const app=express();
const router = express.Router();

const ImdbController = require('../Controller/imdb.js');
const auth = require('../Controller/auth.js');

router.post('/imdb/get/searchByName',ImdbController.searchByName);
router.post('/imdb/get/searchMovieDetailById',ImdbController.searchById);
router.post('/imdb/get/searchMultipleByName',ImdbController.searchMultipleByName);
router.post('/imdb/save/moviesforuser',auth.auth,ImdbController.savePreferredMovies);
router.get('/imdb/get/savedmoviesofuser',auth.auth,ImdbController.getSavedMovies);

module.exports = router;