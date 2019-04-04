import React from 'react';
import Card from "../UI/Card/Card";

const HallCard = props => {
    const {hall, className, onDelete} = props;

    const {name, id} = hall;

    const link = {
        text: 'Read more',
        url: '/halls/' + id
    };

    return <Card header={name} link={link} className='h-100'/>;
};


export default HallCard;