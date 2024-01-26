'use client'
import React, { useState, useEffect } from 'react';
import Mapbox4 from './ui/MapboxComponent';

export default function Home() {
  
  const [message, setMessage] = useState("Loading");
  const [people, setPeople] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:4000/api/v1").then(
      response => response.json()
    ).then(
      data => {
        console.log(data);
        setMessage(data.message);
        setPeople(data.people);
      }
    )
  }, [])
  
  console.log("hellp env", process.env.MAPBOX_TOKEN);

  return (
    <div>
      <div> {message} </div>
      {
        people.map((person, index) => (
          <div key={index}>
            {person}
          </div>
        ))
      }

      <div>
        <Mapbox4 />
      </div>
    </div>

  );
}
