import React, {Fragment, Component} from 'react'
import MovieCard from "../../components/MovieCard/MovieCard";
import {loadMovies, movieDelete} from "../../store/actions/movie-list";
import {connect} from "react-redux";


class MovieList extends Component {
    componentDidMount() {
        this.props.loadMovies();
}

    movieDelete = (id) => {
        this.props.movieDelete(id, this.props.auth.token)
    };

    render() {
        return <Fragment>
            <div className='row'>
                {this.props.movieList.movies.map(movie => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={movie.id}>
                        <MovieCard movie={movie} onDelete={() => this.movieDelete(movie.id)}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}

const mapStateToProps = (state) => ({
        auth: state.auth,
        movieList: state.movieList
});

const mapDispatchToProps = (dispatch) => ({
    loadMovies: () => dispatch(loadMovies()),
    movieDelete: (id, token) => dispatch(movieDelete(id, token))
});


export default connect(mapStateToProps, mapDispatchToProps)(MovieList);