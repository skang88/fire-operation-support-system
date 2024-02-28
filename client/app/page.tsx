'use client'
import React, { useState, useEffect } from 'react';
import Mapbox4 from './components/MapboxComponent';


export default function Home() {

  const [message, setMessage] = useState("Loading");
  const [dispatches, setDispatches] = useState([]);
  const [address, setAddress] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_TOKEN}`);
      const data = await response.json();

      console.log(data);

    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    }
  };

  useEffect(() => {
    fetch(`${process.env.serverUrl}/api/v1/dispatches`)
      .then(response => response.json())
      .then(
        data => {
          console.log(data);
          setMessage(data.message);
          setDispatches(data.dispatches);
        })
  }, []);

  return (
    <div>
      <h1> Home </h1>
      <div> {dispatches.length} dispatches {message} </div>

      <div>
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

      </div> <br></br>

      <div>
        <Mapbox4 />
      </div>
    </div>

  );
}
