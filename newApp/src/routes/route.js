import request from 'superagent';
import Config from '../config/config.js';

const requests = {
    post : (url, body) =>
            request
                .post(url , body)
                .withCredentials(true),
    put : (url, body) =>
            request
                .put(url , body)
                .withCredentials(true),
    get : (url) =>
            request
                .get(url )
                .withCredentials(true),
    delete : (url) =>
            request
                .del(url )
                .withCredentials(true),
}

const Register = {
    register : (body) =>
                        requests.post('/register/registerUser', body)
};

const Login = {
    login : (body) =>
                        requests.post('/login/loginUser', body),
    getLoginUser : () =>
                        requests.get('/login/getLoginUser')
};

const Logout = {
    logout : () =>
                    requests.get('/login/logoutUser')
};

const Imdb = {
    searchByName : (body) =>
                            requests.post('/api/imdb/get/searchByName',body),
    searchMovieDetailById : (body) =>
                                    requests.post('/api/imdb/get/searchMovieDetailById',body),
    savePreferredMovies : (body) =>
                                requests.post('/api/imdb/save/moviesforuser',body),
    getSavedMovies : () =>
                                requests.get('/api/imdb/get/savedmoviesofuser'),

};

export default {Register,
                Login,
                Logout,
                Imdb};
