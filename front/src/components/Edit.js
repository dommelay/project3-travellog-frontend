//component contents transferred to Trip. tried to pass props through App.js in a ternary so display is hidden (component was then render on Trip page). 
import {useState} from 'react'
import axios from 'axios'
import Trip from './Trip'

const Edit = (props) => {
    const [newTrip, setNewTrip] = useState({...props.trip})

    const handleChange = (event) => {
        setNewTrip({...newTrip, [event.target.name]: event.target.value})
    }
    const handleCollapse = () => {
        props.editDisplay()
    } 
    const handleSubmit = (event) => {
        event.preventDefault();
        props.editDisplay();
        axios.put(`http://localhost:3000/logs/${props.trip._id}`, newTrip).then(() => {
            props.getTrips();
        })
        handleCollapse();
    }

    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete(`http://localhost:3000/logs/${props.trip._id}`).then(() => {
            props.getTrips()
        }).catch((error) => {
            console.log(error)
        })
    }

return (
    <div>
        <h1>Edit Entry</h1>
        <button onClick={handleCollapse}>Collapse</button>
         <form onSubmit={handleSubmit}>
                <label htmlFor='city'>City</label>
                <input type='text' name='city' value={props.trip.city} onChange={handleChange}/><br/><br/>
                <label htmlFor='country'>Country</label> 
                <input onChange={handleChange} type='text' name='country' value={props.trip.country}/><br/><br/>
                <div>
                <label htmlFor='description'>Description</label>
                </div>
                <textarea onChange={handleChange} type='text' name='description' rows='10' value={props.trip.description}/><br/><br/>
                <label htmlFor='travelers'>Travelers</label>
                <input onChange={handleChange} type='text' name='travelers' value={props.trip.travelers}/><br/><br/>
                <label htmlFor='startDate'>Start Date</label> 
                <input onChange={handleChange} type='date' name='startDate' /><br/><br/>
                <label htmlFor='endDate'>End Date</label> 
                <input onChange={handleChange} type='date' name='endDate'/><br/><br/>
                <label htmlFor='rating'>Rating</label> 
                <input onChange={handleChange} type='number' name='rating' value={props.trip.rating}/><br/><br/>
                <label htmlFor='image'>Image Address</label> 
                <input onChange={handleChange} type='text' name='image' value={props.trip.image}/><br/><br/>
                <button type='submit'>Update Entry</button>
            </form>
            <button onClick={handleDelete} id="collapsebttn">Delete</button>
    </div>
)

}

export default Edit