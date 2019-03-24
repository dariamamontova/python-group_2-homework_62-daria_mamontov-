import React, {Component, Fragment} from 'react';
import {USERS_URL} from "../../api-urls";
import axios from 'axios';


class UserForm extends Component {
    state = {
        user: {
            username: "",
            password: "",
            passwordConfirm: "",
            email: "",
            first_name: "",
            last_name: ""
        },
        errors: {}
    };


    componentDidMount() {
        axios.get(USERS_URL + localStorage.getItem('id'))
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(user => {
                this.setState({user});
            })
            .catch(error => console.log(error));
    }

    passwordsMatch = () => {
        const {password, passwordConfirm} = this.state.user;
        return password === passwordConfirm
    };

    formSubmitted = (event) => {
        event.preventDefault();
        if (this.passwordsMatch()) {
            const {passwordConfirm, ...restData} = this.state.user;
            const {username, first_name, last_name, email, password} = this.state.user;
            return axios.put(USERS_URL + localStorage.getItem('id') + '/', restData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + localStorage.getItem('auth-token')
            }
        }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
                console.log(error.response);
                this.setState({
                    ...this.state,
                    errors: error.response.data
                })
            });
        }
    };

    inputChanged = (event) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
    };

    passwordConfirmChange = (event) => {
        this.inputChanged(event);
        const password = this.state.user.password;
        const passwordConfirm = event.target.value;
        const errors = (password === passwordConfirm) ? [] : ['Пароли не совпадают'];
        this.setState({
            errors: {
                ...this.state.errors,
                passwordConfirm: errors
            }
        });
    };

    showErrors = (name) => {
        if(this.state.errors && this.state.errors[name]) {
            return this.state.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };


    render() {
        if (this.state.user) {
            const {first_name, last_name, email, password, passwordConfirm} = this.state.user;

            return <Fragment>
                <form onSubmit={this.formSubmitted}>
                    {this.showErrors('non_field_errors')}
                    <div className="form-row">
                        <label className="font-weight-bold">Имя пользователя</label>
                        <input type="text" className="form-control" name="first_name" value={first_name}
                               onChange={this.inputChanged}/>
                        {this.showErrors('first_name')}
                    </div>
                    <div className="form-row">
                        <label className="font-weight-bold">Имя пользователя</label>
                        <input type="text" className="form-control" name="last_name" value={last_name}
                               onChange={this.inputChanged}/>
                        {this.showErrors('last_name')}
                    </div>
                    <div className="form-row">
                        <label className="font-weight-bold">Пароль</label>
                        <input type="password" className="form-control" name="password" value={password}
                               onChange={this.inputChanged}/>
                        {this.showErrors('password')}
                    </div>
                    <div className="form-row">
                        <label className="font-weight-bold">Подтверждение пароля</label>
                        <input type="password" className="form-control" name="passwordConfirm" value={passwordConfirm}
                               onChange={this.passwordConfirmChange}/>
                        {this.showErrors('passwordConfirm')}
                    </div>
                    <div className="form-row">
                        <label>E-mail</label>
                        <input type="email" className="form-control" name="email" value={email}
                               onChange={this.inputChanged}/>
                        {this.showErrors('email')}
                    </div>
                    <button type="submit" className="btn btn-primary">Сохранить</button>
                </form>
            </Fragment>;
        }
    }
}


export default UserForm;