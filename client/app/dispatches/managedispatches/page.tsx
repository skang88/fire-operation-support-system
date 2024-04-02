'use client'
import React, { useState, useEffect } from 'react';

interface Dispatch {
    _id: string;
    callId: number;
    dispatchType: string;
    dispatchStatus: string;
    dispatchLatitude: number;
    dispatchLongitude: number;
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

    const handleEditClick = (dispatchId: number) => {
        console.log("Edit button clicked for dispatch ID:", dispatchId);
    };

    const handleStatusChangeClick = (dispatchId: number) => {
        console.log("Edit button clicked for dispatch ID:", dispatchId);
        // Here you can implement your logic to change dispatch status
        // For simplicity, let's assume dispatchStatus is changed to "In Progress" if it was "Disabled" and vice versa
        const updatedDispatches = dispatches.map(dispatch => {
            if (dispatch.callId === dispatchId) {
                return { ...dispatch, dispatchStatus: dispatch.dispatchStatus === "Disabled" ? "In Progress" : "Disabled" };
            }
            return dispatch;
        });
        setDispatches(updatedDispatches);
    };


    const handleDeleteClick = (_id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this dispatch?");
        if (confirmDelete) {
            fetch(`${process.env.serverUrl}/api/v1/dispatches/${_id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        window.location.reload();
                    } else {
                        console.error('Failed to delete dispatch');
                    }
                })
                .catch(error => {
                    console.error('Error deleting dispatch:', error);
                });
        }
    };

    return (
        <div>
            <div className="grid grid-cols-3 gap-4">
                {dispatches.map((dispatch, index) => (
                    <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                        <p>Dispatch ID: {dispatch._id}</p>
                        <p>Type: {dispatch.dispatchType}</p>
                        <p>Status: {dispatch.dispatchStatus}</p>
                        <p>Latitude: {dispatch.dispatchLatitude.toFixed(4)}</p>
                        <p>Longitude: {dispatch.dispatchLongitude.toFixed(4)}</p>
                        <p>Fleets:</p>
                        <ul>
                            {dispatch.dispatchFleets.map((fleet, fleetIndex) => (
                                <li key={fleetIndex}>{fleet}</li>
                            ))}
                        </ul>
                        <button className="ml-1 mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleStatusChangeClick(dispatch.callId)}>
                            {dispatch.dispatchStatus}
                        </button>
                        <button className="ml-1 mt-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDeleteClick(dispatch._id)}>
                            Delete
                        </button>
                        <button className="ml-1 mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleEditClick(dispatch.callId)}>
                            Add Fleets
                        </button>
                        <button className="ml-1 mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleEditClick(dispatch.callId)}>
                            Remove Fleets
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}