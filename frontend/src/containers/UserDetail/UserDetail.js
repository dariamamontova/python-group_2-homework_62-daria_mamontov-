import React, {Component, Fragment} from 'react';
import UserForm from "../../components/UserForm/UserForm";
import connect from "react-redux/es/connect/connect";
import {loadUser} from "../../store/actions/user-detail";


class UserDetail extends Component {
    state = {
        edit: false,
        alert: null
    };

    componentDidMount() {
        this.props.loadUser(this.props.match.params.id)
    }

    onUserUpdate = (user) => {
        this.props.loadUser(this.props.match.params.id);
        this.setState(prevState => {
            return {
                ...prevState,
                edit: false,
                alert: {type: 'success', text: 'Данные пользователя успешно обновлены!'}
            };
        });
    };

    toggleEdit = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                edit: !prevState.edit,
                alert: null
            };
        });
    };

    render() {
        const currentUserId = this.props.auth.user_id;
        console.log(this.props, 'props UD');
        const {username, first_name, last_name, email} = this.props.user.user;
        const alert = this.state.alert;
        return <Fragment>
            {alert ? <div className={"alert mt-3 py-2 alert-" + alert.type} role="alert">{alert.text}</div> : null}
            <h1 className="mt-3">Личный кабинет</h1>
            {username ? <p>Имя пользователя: {username}</p> : null}
            {first_name ? <p>Имя: {first_name}</p> : null}
            {last_name ? <p>Фамиилия: {last_name}</p> : null}
            {email ? <p>Email: {email}</p> : null}
            {currentUserId === this.props.user.user.id | this.state.edit === true
                ? <Fragment>
                <div className="my-4">
                    <button className="btn btn-primary" type="button" onClick={this.toggleEdit}>Редактировать</button>
                    <div className={this.state.edit ? "mt-4" : "mt-4 collapse"}>
                        <h2>Редактировать</h2>
                        <UserForm user={this.props.user.user} onUpdateSuccess={this.onUserUpdate}/>
                    </div>
                </div>
            </Fragment> : null}
        </Fragment>;
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.userDetail
});

const mapDispatchToProps = dispatch => ({
    loadUser: (id) => dispatch(loadUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);