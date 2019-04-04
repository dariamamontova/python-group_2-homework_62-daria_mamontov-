import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";
import {loadHall, loadShows} from "../../store/actions/hall-detail";
import connect from "react-redux/es/connect/connect";
import {hallDelete, HALL_DELETE_SUCCESS} from "../../store/actions/hall-list";
import {HALL_EDIT_SUCCESS} from "../../store/actions/hall-edit";

class HallDetail extends Component {

    componentDidMount() {
        this.props.loadHall(this.props.match.params.id);
        this.loadShows(this.props.match.params.id)
    }

    loadShows = (id) => {
        this.props.loadShows(this.props.match.params.id);
    };

    onDelete = (id) => {
        this.props.hallDelete(id, this.props.auth.token).then(result => {
            if(result.type === HALL_DELETE_SUCCESS) {
                this.props.history.push('/halls/');
            }
        });
    };

    render() {
        if (!this.props.hall.hall) return null;

        const {name, id} = this.props.hall.hall;

        return <div>
            <h1>{name}</h1>
            <NavLink to={'/halls/' + id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink>
            <button type="button" className="btn btn-primary" onClick={() => this.onDelete(id)}>Delete</button>
            {this.props.shows ? <ShowSchedule shows={this.props.shows}/> : null}
        </div>;
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    hall: state.hallDetail
})

const mapDispatchToProps = dispatch => ({
    loadHall: (id) => dispatch(loadHall(id)),
    loadShows: (id) => dispatch(loadShows(id)),
    hallDelete: (id, token) => dispatch(hallDelete(id, token))
});


export default connect(mapStateToProps, mapDispatchToProps)(HallDetail);