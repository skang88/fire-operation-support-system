'use client'
import React, { useState, useEffect } from 'react';

interface Station {
    _id: string;
    stationName: string;
    address: string;
    longitude: number;
    latitude: number;
}

export default function ManageStations() {

    const [message, setMessage] = useState("Loading");
    const [station, setStation] = useState<Station[]>([]);

    useEffect(() => {
        fetch(`${process.env.serverUrl}/api/v1/stations`)
            .then(response => response.json())
            .then(
                data => {
                    console.log(data);
                    setMessage(data.message);
                    setStation(data.stations);
                })
    }, []);

    return (
        <div className="mt-5 ml-5 mr-5">
            Status: {message}

            <div>
                <div className="grid grid-cols-3 gap-4">
                    {station.map((station, index) => (
                        <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                            <p>Station ID: {station._id}</p>
                            <p>Station Name: {station.stationName}</p>
                            <p>Address: {station.address}</p>
                            <p>Latitude: {station.latitude}</p>
                            <p>Longitude: {station.longitude}</p>
                            <button className="ml-1 mt-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                >
                                Edit
                            </button>
                            <button className="ml-1 mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}