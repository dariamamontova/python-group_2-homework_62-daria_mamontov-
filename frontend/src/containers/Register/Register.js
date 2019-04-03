import React, {Component, Fragment} from 'react';
import {REGISTER_URL} from "../../api-urls";
import axios from 'axios';
import {register, performLogin, REGISTER_SUCCESS} from "../../store/actions/register";
import {login, LOGIN_SUCCESS} from "../../store/actions/login";
import connect from "react-redux/es/connect/connect";


class Register extends Component {
    state = {
        user: {
            username: "",
            password: "",
            password_confirm: "",
            email: "",
        },
    };




    formSubmitted = (event) => {
        event.preventDefault();
        if(!this.props.loading){
            this.props.register(this.state.user).then(result => {
                if(result.type === REGISTER_SUCCESS) {
                    this.performLogin(this.state.user.username, this.state.user.password).then(
                            this.props.history.push('/movies/')

                    )


                }
            })
        }
    };

    performLogin = (username, password) => {
        this.props.performLogin(username, password)
    };

    inputChanged = (event) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
    };

    showErrors = (name) => {
        if(this.props.errors && this.props.errors[name]) {
            return this.props.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        const {username, password, password_confirm, email} = this.state.user;
        return <Fragment>
            <h2>Регистрация</h2>
            <form onSubmit={this.formSubmitted}>
                {this.showErrors('non_field_errors')}
                <div className="form-row">
                    <label className="font-weight-bold">Имя пользователя</label>
                    <input type="text" className="form-control" name="username" value={username}
                           onChange={this.inputChanged}/>
                    {this.showErrors('username')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Пароль</label>
                    <input type="password" className="form-control" name="password" value={password}
                           onChange={this.inputChanged}/>
                    {this.showErrors('password')}
                </div>
                <div className="form-row">
                    {/* валидация совпадения паролей со стороны UI теперь больше не требуется, */}
                    {/* т.к. она выполняется в API, и можно использовать обычный inputChanged. */}
                    <label className="font-weight-bold">Подтверждение пароля</label>
                    <input type="password" className="form-control" name="password_confirm" value={password_confirm}
                           onPaste={event => event.preventDefault()}
                           onChange={this.inputChanged}/>
                    {this.showErrors('password_confirm')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">E-mail</label>
                    <input type="email" className="form-control" name="email" value={email}
                           onChange={this.inputChanged}/>
                    {this.showErrors('email')}
                </div>
                <button type="submit" className="btn btn-primary mt-2">Зарегистрироваться</button>
            </form>
        </Fragment>
    }
}


const mapStateToProps = state => state.register;

const mapDispatchToProps = dispatch => ({
    register: (user) => dispatch(register(user)),
    performLogin: (username, password) => dispatch(login(username, password))
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);