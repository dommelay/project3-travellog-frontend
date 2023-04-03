import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Add from './components/Add'
import Trip from './components/Trip'
import Edit from './components/Edit'

function App() {
const [trips, setTrips] = useState([])

  const getTrips = () => {
    axios.get('https://localhost3000/logs').then((response) => {
      setTrips(response.data)
    })
  }
  useEffect(() => {
    getTrips();
  }, [])
  return (
    <div>
      <h1>Travel Log</h1>
      <Add getTrips={getTrips}/>
      {trips.map((trip) => {
        return (
          <>
          <Trip getTrips={getTrips} trip={trip}/>
          </>
        )
      })}
    </div>
  );
}

export default App;
