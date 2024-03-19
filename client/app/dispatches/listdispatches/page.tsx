'use client'
import React, { useState, useEffect } from 'react';
import Mapbox4 from '../../components/MapboxComponent';

interface Dispatch {
    callId: number;
    dispatchType: string;
    dispatchFleets: string[];
}

export default function ListDispatches() {

    const [message, setMessage] = useState("Loading");
    const [dispatches, setDispatches] = useState<Dispatch[]>([]);

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
            <h1 className="text-3xl font-bold underline"> List Dispatches </h1>

            <div className="grid grid-cols-3 gap-4">
                {dispatches.map((dispatch, index) => (
                    <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <p>Dispatch ID: {dispatch.callId}</p>
                        <p>Dispatch Type: {dispatch.dispatchType}</p>
                        <p>Dispatch Fleets:</p>
                        <ul>
                            {dispatch.dispatchFleets.map((fleet, fleetIndex) => (
                                <li key={fleetIndex}>{fleet}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}