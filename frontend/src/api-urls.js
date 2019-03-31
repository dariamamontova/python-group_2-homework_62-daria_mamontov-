import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/v1';
const MOVIES_URL = BASE_URL + '/movies/';
const CATEGORIES_URL = BASE_URL + '/categories/';
const HALLS_URL = BASE_URL + '/halls/';
const SHOWS_URL = '/shows/';
const LOGIN_URL = '/login/';
const REGISTER_URL = '/register/';
const USERS_URL = '/users/';

const instance = axios.create({
    baseURL: BASE_URL
});

export {MOVIES_URL, CATEGORIES_URL, BASE_URL, HALLS_URL, SHOWS_URL, LOGIN_URL, REGISTER_URL, USERS_URL}

export default instance;