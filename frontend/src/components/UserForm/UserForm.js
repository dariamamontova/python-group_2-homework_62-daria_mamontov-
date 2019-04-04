import React, {Component} from 'react';
import axios from 'axios';
import {USERS_URL} from "../../api-urls";
import {userEdit, USER_EDIT_SUCCESS} from "../../store/actions/user-form";
import connect from "react-redux/es/connect/connect";
import {loadUser} from "../../store/actions/user-detail";
import {HALL_EDIT_SUCCESS} from "../../store/actions/hall-edit";

class UserForm extends Component {
    constructor(props) {
        super(props);
        const {first_name, last_name, email, id} = props.user;
        this.state = {
            user: {
                first_name, last_name, email, id,
                password: '',
                new_password: '',
                new_password_confirm: ''
            },
            submitEnabled: true,
        }
    }

    submitForm = (event) => {
        event.preventDefault();
        const {auth} = this.props;
        return this.props.userEdit(this.state.user, auth.token).then(result => {
            if (result.type === USER_EDIT_SUCCESS) {
                this.props.history.push('/users/' + result.user.id);
            }
        });
    }

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [fieldName]: value
            }
        });
    };

    showErrors = (name) => {
        if(this.state.errors && this.state.errors[name]) {
            return this.state.errors[name].map((error, index) =>
                <p className="text-danger" key={index}>{error}</p>
            );
        }
        return null;
    };

    render() {
        const {first_name, last_name, email, password, new_password, new_password_confirm} = this.state.user;
        return <form onSubmit={this.submitForm}>
            {this.showErrors('non_field_errors')}
            <div className="form-group">
                <label>Имя</label>
                <input type="text" className="form-control" name="first_name" value={first_name}
                       onChange={this.inputChanged}/>
                {this.showErrors('first_name')}
            </div>
            <div className="form-group">
                <label>Фамилия</label>
                <input type="text" className="form-control" name="last_name" value={last_name}
                       onChange={this.inputChanged}/>
                {this.showErrors('last_name')}
            </div>
            <div className="form-group">
                <label className="font-weight-bold">Email</label>
                <input type="text" className="form-control" name="email" value={email}
                       onChange={this.inputChanged}/>
                {this.showErrors('email')}
            </div>
            <div className="form-group">
                <label className="font-weight-bold">Старый пароль</label>
                <input type="password" className="form-control" name="password" value={password}
                       onChange={this.inputChanged}/>
                <small className="form-text text-muted">Введите пароль, чтобы подтвердить внесённые изменения.</small>
                {this.showErrors('password')}
            </div>
            <div className="form-group">
                <label>Новый пароль</label>
                <input type="password" className="form-control" name="new_password" value={new_password}
                       onChange={this.inputChanged}/>
                {this.showErrors('new_password')}
            </div>
            <div className="form-group">
                <label>Подтверждение пароля</label>
                <input type="password" className="form-control" name="new_password_confirm" value={new_password_confirm}
                       onChange={this.inputChanged}/>
                {this.showErrors('new_password_confirm')}
            </div>
            <button disabled={!this.state.submitEnabled} type="submit"
                    className="btn btn-primary">Сохранить
            </button>
        </form>
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});
const mapDispatchToProps = dispatch => {
    return {
        userEdit: (user, token) => dispatch(userEdit(user, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);