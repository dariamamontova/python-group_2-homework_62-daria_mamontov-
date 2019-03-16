import React, {Fragment, Component} from 'react'
import {HALLS_URL} from "../../api-urls";
import HallCard from "../../components/HallCard/HallCard";
import {NavLink} from "react-router-dom";
import axios from 'axios';


class HallList extends Component {
    state = {
        halls: [],
    };

    componentDidMount() {
        axios.get(HALLS_URL)
            .then(response => {console.log(response.data); return response.data;})
            .then(halls => this.setState({halls}))
            .catch(error => console.log(error));
    }

    hallDelete = (id) => {
        axios.delete(HALLS_URL + id + '/').then(response => {
            console.log(response.data);
            this.setState(prevState => {
                let newState = {...prevState};
                let halls = [...newState.halls]
                let hallId = halls.findIndex(hall => {return hall.id === id});
                halls.splice(hallId, 1);
                newState.halls = halls;
                return newState;
            })
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        })
    };

    render() {
        return <Fragment>
            <div className='row'>
                {this.state.halls.map(hall => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={hall.id}>
                        <HallCard hall={hall} onDelete={() => this.hallDelete(hall.id)}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default HallList;