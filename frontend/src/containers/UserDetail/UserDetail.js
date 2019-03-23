import React, {Component} from 'react'
import {USERS_URL} from "../../api-urls";
import axios from "axios";

class UserDetail extends Component {
    state = {
        user: {
            id: localStorage.getItem('id'),
            username: "",
            first_name: ""
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
        const {username, first_name, id} = this.state.user;
        return <div>
            <h1>{username}</h1>
            <p>{first_name}</p>
        </div>
    }
}

export default UserDetail