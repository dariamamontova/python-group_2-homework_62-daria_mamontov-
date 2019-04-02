import React, {Fragment, Component} from 'react'
import MovieCard from "../../components/MovieCard/MovieCard";
import {loadMovies} from "../../store/actions/movie-list";
import {connect} from "react-redux";


// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
class MovieList extends Component {
    componentDidMount() {
        this.props.loadMovies();
}

    // movieDelete = (id) => {
    //     axios.delete(MOVIES_URL + id + '/', {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             'Authorization': 'Token ' + localStorage.getItem('auth-token')
    //         }
    //     })
    //         .then(response => {
    //         console.log(response.data);
    //         this.setState(prevState => {
    //             let newState = {...prevState};
    //             let movies = [...newState.movies]
    //             let movieId = movies.findIndex(movie => {return movie.id === id});
    //             movies.splice(movieId, 1);
    //             newState.movies = movies;
    //             return newState;
    //         })
    //     }).catch(error => {
    //         console.log(error);
    //         console.log(error.response);
    //     })
    // };

    render() {
        return <Fragment>
            <div className='row'>
                {this.props.movies.map(movie => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={movie.id}>
                        <MovieCard movie={movie}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}

const mapStateToProps = (state) => state.movieList;
const mapDispatchToProps = (dispatch) => ({
    loadMovies: () => dispatch(loadMovies())
});


export default connect(mapStateToProps, mapDispatchToProps)(MovieList);