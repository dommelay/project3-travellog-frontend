import {useState} from 'react'
import axios from 'axios'

const Add = (props) => {
    const [trip, setTrip] = useState({})
    const [add, setAdd] = useState(false)
    const handleChange = (event) => {
        event.preventDefault();
        setTrip({...trip, [event.target.name]: event.target.value})
    }
    const addDisplay = () => {
        setAdd(!add)
    }
    const handleSubmit = (event) => {
        setTrip(trip)
        event.preventDefault();
        axios.post('http://localhost:3000/logs', trip).then(() => {
            props.getTrips();
        }).catch((error) => {
            console.log(error)
        })
        addDisplay();
    }

    return (
        <div>
            <div>
                <h1>Add New Trip</h1>
                <button id='expandbttn'onClick={addDisplay}>Add Entry</button>
            </div>
            {add ?
            <div>
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
                <input onChange={handleChange} type='date' name='endDate'/><br/><br/>
                <label htmlFor='rating'>Rating</label> 
                <input onChange={handleChange} type='number' name='rating'/><br/><br/>
                <label htmlFor='image'>Image Address</label> 
                <input onChange={handleChange} type='text' name='image'/><br/><br/>
                <button type='submit' value='submit'>Submit</button>
            </form>
            <button id="collapsebttn">Collapse</button>
            </div>
            : <></> }
        </div>
    )



}

export default Add