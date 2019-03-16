import React, {Component} from 'react'
import {HALLS_URL} from "../../api-urls";
import {NavLink} from "react-router-dom";
import axios from 'axios';

class HallDetail extends Component {
    state = {
        hall: null
    };

    componentDidMount() {
        const match = this.props.match;

        axios.get(HALLS_URL + match.params.id)
            .then(response => {console.log(response.data); return response.data;})
            .then(hall => this.setState({hall}))
            .catch(error => console.log(error));
    }



    render() {
        if (!this.state.hall) return null;

        const {name, id} = this.state.hall;

        return <div>
            <h1>{name}</h1>
            <NavLink to={'/halls/' + id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink>
        </div>;
    }
}


export default HallDetail;