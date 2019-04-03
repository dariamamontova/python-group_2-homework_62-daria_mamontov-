import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import ShowSchedule from "../../components/ShowSchedule/ShowSchedule";
import {loadHall, loadShows} from "../../store/actions/hall-detail";
import connect from "react-redux/es/connect/connect";

class HallDetail extends Component {

    componentDidMount() {
        this.props.loadHall(this.props.match.params.id);
        this.loadShows(this.props.match.params.id)
    }

    loadShows = (id) => {
        this.props.loadShows(this.props.match.params.id);
    };

    render() {
        if (!this.props.hall) return null;

        const {name, id} = this.props.hall;

        return <div>
            <h1>{name}</h1>
            <NavLink to={'/halls/' + id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink>
            {this.props.shows ? <ShowSchedule shows={this.props.shows}/> : null}
        </div>;
    }
}

const mapStateToProps = state => state.hallDetail;

const mapDispatchToProps = dispatch => ({
    loadHall: (id) => dispatch(loadHall(id)),
    loadShows: (id) => dispatch(loadShows(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(HallDetail);