import React, {Component} from 'react'
import axios from "axios";
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import {CATEGORIES_URL} from "../../api-urls";

class HallForm extends Component {
    constructor(props) {
        super(props);

        const newHall = {
            name: ""
        };

        this.state = {
            submitEnabled: true,
            hall: newHall
        };

        if(this.props.hall) {
            this.state.hall = this.props.hall;
        }
    }


    disableSubmit = () => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitEnabled = false;
            return newState;
        });
    };

    enableSubmit = () => {
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitEnabled = true;
            return newState;
        });
    };


    updateMovieState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let hall = {...prevState.hall};
            hall[fieldName] = value;
            newState.hall = hall;
            return newState;
        });
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateMovieState(fieldName, value);
    };


    submitForm = (event) => {
        if(this.state.submitEnabled) {
            event.preventDefault();
            this.disableSubmit();
            this.props.onSubmit(this.state.hall)
                .then(this.enableSubmit);
        }
    };

    render() {
        if (this.state.hall) {
            // распаковка данных фильма, чтобы было удобнее к ним обращаться
            const {name} = this.state.hall;
            const {submitEnabled} = this.state;


            return <div>
                <form onSubmit={this.submitForm}>
                    <div className="form-group">
                        <label className="font-weight-bold">Название</label>
                        <input type="text" className="form-control" name="name" value={name}
                               onChange={this.inputChanged}/>
                    </div>
                    <button disabled={!submitEnabled} type="submit"
                            className="btn btn-primary">Сохранить
                    </button>
                </form>
            </div>;
        }
    }
}


export default HallForm;