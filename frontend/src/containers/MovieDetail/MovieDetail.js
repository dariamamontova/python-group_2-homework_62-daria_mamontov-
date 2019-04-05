import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import MovieCategories from "../../components/MovieCategories/MovieCategories";
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";
import connect from "react-redux/es/connect/connect";
import {loadMovie, loadShows, loadCategories} from "../../store/actions/movie-detail"
import {MOVIE_DELETE_SUCCESS, movieDelete} from "../../store/actions/movie-list";


class MovieDetail extends Component {

    componentDidMount() {
        this.props.loadMovie(this.props.match.params.id);
        this.loadShows(this.props.match.params.id);
        this.loadCategories(this.props.match.params.id);

    }

    loadShows = (id) => {
        this.props.loadShows(this.props.match.params.id);
    };

    loadCategories = (id) => {
        this.props.loadCategories(this.props.match.params.id)
    }

    onDelete = (id) => {
        this.props.movieDelete(id, this.props.auth.token).then(result => {
            if (result.type === MOVIE_DELETE_SUCCESS) {
                this.props.history.push('/movies/');
            }
        });
    };

    render() {
        if (!this.props.movie.movie) return null;
        const {is_admin} = this.props.auth;
        const {name, poster, description, release_date, finish_date, categories, id} = this.props.movie.movie

        return <div className="mt-3">
            {poster ? <div className='row'>
                <div className="col col-xs-10 col-sm-8 col-md-6 col-lg-4 mx-auto">
                    <img className="img-fluid rounded" src={poster} alt={"постер"}/>
                </div>
            </div> : null}

            <h2>{name}</h2>

            {categories.length > 0 ? <MovieCategories categories={categories}/> : null}

            <p className="text-secondary">В прокате c: {release_date} до: {finish_date ? finish_date : "Неизвестно"}</p>
            {description ? <p>{description}</p> : null}

            {is_admin ? <NavLink to={'/movies/' + id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink> : null}
            {is_admin ? <button type="button" className="btn btn-primary"
                                onClick={() => this.onDelete(id)}>Delete</button> : null}
            {this.props.movie.shows ?
                <div className="row">
                    <ShowSchedule shows={this.props.movie.shows}/>
                </div>
                : null}
        </div>;
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
    movie: state.movieDetail
})


const mapDispatchToProps = dispatch => ({
    loadMovie: (id) => dispatch(loadMovie(id)),
    loadShows: (id) => dispatch(loadShows(id)),
    movieDelete: (id, token) => dispatch(movieDelete(id, token)),
    loadCategories: (id) => dispatch(loadCategories(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);