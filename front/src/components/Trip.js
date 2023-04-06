import {useState} from 'react'
import axios from 'axios'
import Edit from './Edit'

const Trip = (props) => {
   const [edit, setEdit] = useState(false)
   const [newTrip, setNewTrip] = useState({...props.trip})

   const handleChange = (event) => {
       setNewTrip({...newTrip, [event.target.name]: event.target.value})
   }
   const handleCollapse = () => {
       editDisplay();
   } 
   const handleSubmit = (event) => {
       event.preventDefault();
       editDisplay();
       axios.put(`http://localhost:3000/logs/${props.trip._id}`, newTrip).then(() => {
           props.getTrips();
       })
       handleCollapse();
   }

   const handleDelete = (event) => {
       event.preventDefault();
       axios.delete(`http://localhost:3000/logs/${props.trip._id}`).then(() => {
           props.getTrips()
       })
   }
   const editDisplay = () => {
    setEdit(!edit)
   }
    return (
        <>
        {props.trip ?
        <div>
            <h1>City: {props.trip.city}<br/>Country: {props.trip.country}</h1>
            <h3>Dates Traveled: {props.trip.startDate} - {props.trip.endDate}</h3>
            <h4>Description: {props.trip.description}</h4>
            <h4>Travelers: {props.trip.travelers}</h4>
            <h5>Rating: {props.trip.rating}/5</h5>
            <img src={props.trip.image} alt='Trip to ${props.trip.city}'/>
            <button onClick={editDisplay}>Edit Trip</button>
        </div>
        : <></>}
        {edit ?
            <div>
            <h1>Edit Entry</h1>
            <button onClick={handleCollapse}>Collapse</button>
             <form onSubmit={handleSubmit}>
                    <label htmlFor='city'>City</label>
                    <input onChange={handleChange} type='text' name='city'/><br/><br/>
                    <label htmlFor='country'>Country</label> 
                    <input onChange={handleChange} type='text' name='country'/><br/><br/>
                    <div>
                    <label htmlFor='description'>Description</label>
                    </div>
                    <textarea onChange={handleChange} type='text' name='description' rows='10'/><br/><br/>
                    <label htmlFor='travelers'>Travelers</label>
                    <input onChange={handleChange} type='text' name='travelers'/><br/><br/>
                    <label htmlFor='startDate'>Start Date</label> 
                    <input onChange={handleChange} type='date' name='startDate'/><br/><br/>
                    <label htmlFor='endDate'>End Date</label> 
                    <input onChange={handleChange} type='date' name='endDate' /><br/><br/>
                    <label htmlFor='rating'>Rating</label> 
                    <input onChange={handleChange} type='number' name='rating'/><br/><br/>
                    <label htmlFor='image'>Image Address</label> 
                    <input onChange={handleChange} type='text' name='image'/><br/><br/>
                    <input type='submit' value='submit'/>
                </form>
                <button onClick={handleDelete} id="collapsebttn">Delete</button>
        </div>
            :<></>}
        </>
    )
}

export default Trip