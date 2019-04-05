import React from 'react'
import moment from "moment";


const formatDate = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD HH:mm')
};

const ShowSchedule = props => {
    return <div className="mt-4">
        <hr/>
        <h5>Расписание показов</h5>
        {props.shows.map(show => {
            return <div className="card my-3 text-sm-left border-danger" key={show.id}>
                <div className="card-body">
                    <p>Фильм: {show.movie_name}</p>
                    <p>Зал: {show.hall_name}</p>
                    <p>Начало: {formatDate(show.starts_at)}</p>
                    <p>Окончание: {formatDate(show.finishes_at)}</p>
                </div>
            </div>
        })}
    </div>
};


export default ShowSchedule