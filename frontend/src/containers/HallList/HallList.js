import React, {Fragment, Component} from 'react'
import HallCard from "../../components/HallCard/HallCard";
import {connect} from "react-redux";
import {loadHalls} from "../../store/actions/hall-list";


class HallList extends Component {

    componentDidMount() {
        this.props.loadHalls();
    }


    render() {
        return <Fragment>
            <div className='row'>
                {this.props.hallList.halls.map(hall => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={hall.id}>
                        <HallCard hall={hall}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


const mapStateToProps = (state) => ({
        hallList: state.hallList
});

const mapDispatchToProps = (dispatch) => ({
    loadHalls: () => dispatch(loadHalls())
});


export default connect(mapStateToProps, mapDispatchToProps)(HallList);