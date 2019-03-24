import React, {Component} from 'react'
import {USERS_URL} from "../../api-urls";
import axios from "axios";
import {NavLink} from "react-router-dom";

class UserDetail extends Component {
    state = {
        user: {
            id: localStorage.getItem('id'),
            username: "",
            first_name: "",
            email: ""
        }
    };


    componentDidMount() {

        axios.get(USERS_URL + this.state.user.id)
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(user => {
                this.setState({user});
            })
            .catch(error => console.log(error));
    }

    render() {
        const {username, first_name, email, id} = this.state.user;
        return <div>
            <h1>{username}</h1>
            <p>{first_name}</p>
            <p>{email}</p>
            <NavLink to={'/users/' + id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink>
        </div>
    }
}

export default UserDetail