import React, {Component} from 'react'
import {HALLS_URL} from "../../api-urls";
import {NavLink} from "react-router-dom";
import axios from 'axios';


// компонент, который выводит одну карточку с фильмом
// фильм также загружается при выводе компонента на экран (mount),
// а не при обновлении (didUpdate), т.к. компонент выводится на отдельной странице,
// и при переключении страниц исчезает с экрана, а потом снова маунтится.
class HallDetail extends Component {
    state = {
        hall: null
    };

    componentDidMount() {
        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту
        const match = this.props.match;

        // match.params - переменные из пути (:id)
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(HALLS_URL + match.params.id)
            .then(response => {console.log(response.data); return response.data;})
            .then(hall => this.setState({hall}))
            .catch(error => console.log(error));
    }



    render() {
        // если movie в state нет, ничего не рисуем.
        if (!this.state.hall) return null;

        // достаём данные из movie
        const {name, id} = this.state.hall;

        return <div>

            <h1>{name}</h1>

            <NavLink to={'/halls/' + id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink>

            <NavLink to='/halls/' className="btn btn-primary">Halls</NavLink>
        </div>;
    }
}


export default HallDetail;