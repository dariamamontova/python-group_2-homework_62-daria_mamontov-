import React, {Fragment, Component} from 'react'
import {HALLS_URL, MOVIES_URL} from "../../api-urls";
import MovieCard from "../../components/MovieCard/MovieCard";
import {NavLink} from "react-router-dom";
import axios from 'axios';


class MovieList extends Component {
    state = {
        movies: [],
    };

    componentDidMount() {
        axios.get(MOVIES_URL)
            .then(response => {console.log(response.data); return response.data;})
            .then(movies => this.setState({movies}))
            .catch(error => console.log(error));
    }

    movieDelete = (id) => {
        axios.delete(MOVIES_URL + id + '/', {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        })
            .then(response => {
            console.log(response.data);
            this.setState(prevState => {
                let newState = {...prevState};
                let movies = [...newState.movies]
                let movieId = movies.findIndex(movie => {return movie.id === id});
                movies.splice(movieId, 1);
                newState.movies = movies;
                return newState;
            })
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        })
    };

    render() {
        return <Fragment>
            <div className='row'>
                {this.state.movies.map(movie => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={movie.id}>
                        <MovieCard movie={movie} onDelete={() => this.movieDelete(movie.id)}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default MovieList;