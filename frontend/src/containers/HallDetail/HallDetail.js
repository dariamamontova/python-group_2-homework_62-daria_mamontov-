import React, {Component} from 'react'
import {HALLS_URL, SHOWS_URL} from "../../api-urls";
import {NavLink} from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";

class HallDetail extends Component {
    state = {
        hall: null,
        shows: null
    };

    componentDidMount() {
        const match = this.props.match;

        axios.get(HALLS_URL + match.params.id)
            .then(response => {console.log(response.data); return response.data;})
            .then(hall => {
                this.setState({hall});
                this.loadShows(hall.id);
            })
            .catch(error => console.log(error));
    }

    loadShows = (hallId) => {
        const startsAfter = moment().format('YYYY-MM-DD HH:mm');
        const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');
        const query = encodeURI(`hall_id=${hallId}&starts_after=${startsAfter}&starts_before=${startsBefore}`);
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
        if (!this.state.hall) return null;

        const {name, id} = this.state.hall;

        return <div>
            <h1>{name}</h1>
            <NavLink to={'/halls/' + id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink>
            {this.state.shows ? <ShowSchedule shows={this.state.shows}/> : null}
        </div>;
    }
}


export default HallDetail;