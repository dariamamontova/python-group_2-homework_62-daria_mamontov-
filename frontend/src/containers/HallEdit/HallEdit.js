import React, {Component, Fragment} from 'react'
import HallForm from "../../components/HallForm/HallForm";
import {saveHall, loadHall, HALL_EDIT_SUCCESS} from "../../store/actions/hall-edit";
import connect from "react-redux/es/connect/connect";


class HallEdit extends Component {


    componentDidMount() {
        this.props.loadHall(this.props.match.params.id);
    }


    formSubmitted = (hall) => {
        const {auth} = this.props;
        return this.props.saveHall(hall, auth.token).then(result => {
            if(result.type === HALL_EDIT_SUCCESS) {
                this.props.history.push('/halls/' + result.hall.id);
            }
        });
    };

    render() {
        const {hall, errors} = this.props.hallEdit;
        return <Fragment>
            {alert ? <div className={"mb-2 alert alert-" + alert.type}>{alert.message}</div> : null}
            {hall ? <HallForm onSubmit={this.formSubmitted} hall={hall}/> : null}
        </Fragment>
    }
}


const mapStateToProps = state => {
    return {
        hallEdit: state.hallEdit,
        auth: state.auth
    }
};
const mapDispatchProps = dispatch => {
    return {
        loadHall: (id) => dispatch(loadHall(id)),
        saveHall: (hall, token) => dispatch(saveHall(hall, token))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(HallEdit);