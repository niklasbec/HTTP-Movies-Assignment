import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

const UpdateMovie = (props) => {

    const id = props.match.params.id
    
    const [formValues, setFormValues] = useState({
        director: '',
        title: '',
        metascore: '',
        stars: [],
        id: id
    })

    const [starValue, setStarValue] = useState(
        []
    )


    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
            stars: starValue
        })
    }

    const handleStars = e => {
        setStarValue([e.target.value])
    }

    const handleSubmit = () => {
        axios.put(`http://localhost:5000/api/movies/${id}`, formValues)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        setFormValues({
            title: '',
            metascore: '',
            stars: [],
            id: id
        })
        props.history.push('/')
    }

    return(
        <div>
            <form className='form' onSubmit={handleSubmit}>
                <label>Director</label>
                <input onChange={handleChange} name='director' type='text' />
                <label>Title</label>
                <input onChange={handleChange} value={formValues.title} name='title' type='text' />
                <label>Metascore</label>
                <input onChange={handleChange} value={formValues.metascore} name='metascore' type='number' />
                <label>Stars</label>
                <input onChange={handleStars} name='stars' type='text' />

                <input className='submit' type='submit' />
                
            </form>
        </div>
    )
}

export default UpdateMovie