import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import MovieCategories from "../../components/MovieCategories/MovieCategories";
import {movieDetail} from "../../store/actions/movie-detail";
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";
import {movieList} from "../../store/actions/movie-list";
import connect from "react-redux/es/connect/connect";
import {loadMovie, loadShows} from "../../store/actions/movie-detail"



class MovieDetail extends Component {


    componentDidMount() {
        this.props.loadMovie(this.props.match.params.id);
        this.loadShows(this.props.match.params.id)

    }

    loadShows = (id) => {
        this.props.loadShows(this.props.match.params.id);
    };

    render() {
        if (!this.props.movie) return null;

        const {name, poster, description, release_date, finish_date, categories, id} = this.props.movie;

        return <div>
            {poster ? <div className='text-center'>
                <img className="img-fluid rounded" src={poster}/>
            </div> : null}

            <h1>{name}</h1>

            {categories.length > 0 ? <MovieCategories categories={categories}/> : null}

            <p className="text-secondary">В прокате c: {release_date} до: {finish_date ? finish_date : "Неизвестно"}</p>
            {description ? <p>{description}</p> : null}

            <NavLink to={'/movies/' + id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink>

            <ShowSchedule shows={this.props.shows}/>
        </div>;
    }
}


const mapStateToProps = state => state.movieDetail;

const mapDispatchToProps = dispatch => ({
    loadMovie: (id) => dispatch(loadMovie(id)),
    loadShows: (id) => dispatch(loadShows(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);