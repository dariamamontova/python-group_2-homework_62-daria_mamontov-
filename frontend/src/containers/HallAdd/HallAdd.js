import React, {Component, Fragment} from 'react';
import {HALLS_URL} from "../../api-urls";
import axios from 'axios';
import HallForm from "../../components/HallForm/HallForm";
import {addHall, HALL_ADD_SUCCESS} from "../../store/actions/hall-add";
import {addMovie, MOVIE_ADD_SUCCESS} from "../../store/actions/movie-add";
import connect from "react-redux/es/connect/connect";


class HallAdd extends Component {

    formSubmitted = (hall) => {
        const {auth} = this.props;
        return this.props.addHall(hall, auth.token).then(result => {
            if(result.type === HALL_ADD_SUCCESS) {
                this.props.history.push('/halls/' + result.hall.id);
            }
        });
    };


    render() {;
        return <Fragment>
            {alert ? <div className={"mb-2 alert alert-" + alert.type}>{alert.message}</div> : null}
            <HallForm onSubmit={this.formSubmitted}/>
        </Fragment>
    }
}

const mapStateToProps = state => {
    return {
        hallAdd: state.hallAdd,
        auth: state.auth
    }
};
const mapDispatchProps = dispatch => {
    return {
        addHall: (hall, token) => dispatch(addHall(hall, token))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(HallAdd);