import React, {Component, Fragment} from 'react';
import MovieForm from "../../components/MovieForm/MovieForm";
import {addMovie, MOVIE_ADD_SUCCESS} from "../../store/actions/movie-add";
import connect from "react-redux/es/connect/connect";


class MovieAdd extends Component {

    formSubmitted = (movie) => {
        const {auth} = this.props;
        return this.props.addMovie(movie, auth.token).then(result => {
            if(result.type === MOVIE_ADD_SUCCESS) {
                this.props.history.push('/movies/' + result.movie.id);
            }
        });
    };


    render() {
        return <Fragment>
            <MovieForm onSubmit={this.formSubmitted}/>
        </Fragment>
    }
}


const mapStateToProps = state => {
    return {
        movieAdd: state.movieAdd,
        auth: state.auth
    }
};
const mapDispatchProps = dispatch => {
    return {
        addMovie: (movie, token) => dispatch(addMovie(movie, token))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(MovieAdd);