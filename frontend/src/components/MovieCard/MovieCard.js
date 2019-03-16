import React from 'react';
import Card from "../UI/Card/Card";

const MovieCard = props => {
    const {movie, className, onDelete} = props;

    const {name, poster, id} = movie;

    const link = {
        text: 'Read more',
        url: '/movies/' + id
    };

    return <Card header={name} image={poster} deleted={onDelete} link={link} className='h-100'/>;
};


export default MovieCard;