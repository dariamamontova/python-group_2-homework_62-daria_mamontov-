import React, {Component} from 'react'
import {MOVIES_URL, SHOWS_URL} from "../../api-urls";
import {NavLink} from "react-router-dom";
import MovieCategories from "../../components/MovieCategories/MovieCategories";
import axios from 'axios';
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";
import moment from 'moment';



class MovieDetail extends Component {
    state = {
        movie: null,
        shows: null
    };

    componentDidMount() {
        const match = this.props.match;

        axios.get(MOVIES_URL + match.params.id)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(movie => {
                this.setState({movie});
                this.loadShows(movie.id);
            })
            .catch(error => console.log(error));
    }

    loadShows = (movieId) => {
        const startsAfter = moment().format('YYYY-MM-DD HH:mm');
        const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');
        const query = encodeURI(`movie_id=${movieId}&starts_after=${startsAfter}&starts_before=${startsBefore}`);
        axios.get(`${SHOWS_URL}?${query}`).then(response => {
            console.log(response);
            this.setState(prevState => {
                let newState = {...prevState};
                newState.shows = response.data;
                return newState;
            })
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    };
    render() {
        if (!this.state.movie) return null;

        const {name, poster, description, release_date, finish_date, categories, id} = this.state.movie;

        return <div>
            {poster ? <div className='text-center'>
                <img className="img-fluid rounded" src={poster}/>
            </div> : null}

            <h1>{name}</h1>

            {categories.length > 0 ? <MovieCategories categories={categories}/> : null}

            <p className="text-secondary">В прокате c: {release_date} до: {finish_date ? finish_date : "Неизвестно"}</p>
            {description ? <p>{description}</p> : null}

            <NavLink to={'/movies/' + id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink>

            {this.state.shows ? <ShowSchedule shows={this.state.shows}/> : null}
        </div>;
    }
}


export default MovieDetail;