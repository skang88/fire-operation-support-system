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

interface Vehicles {
    vehicleId: string;
    vehicleType: string;
    _id: string;
    fleetId: string;
    fleetType: string
}


export default function ListDispatches() {

    const [message, setMessage] = useState("Loading");
    const [dispatches, setDispatches] = useState<Dispatch[]>([]);
    const [vehicles, setVehicles] = useState<Vehicles[]>([]);
    const [selectedVehicles, setSelectedVehicles] = useState<Vehicles[]>([]);

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

    useEffect(() => {
        fetch(`${process.env.serverUrl}/api/v1/fleets/available`)
            .then(response => response.json())
            .then(data => {
                setVehicles(data.availableFleets);
            })
            .catch(error => {
                console.error('Error fetching vehicles:', error);
            });
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

    const handleAddFleetsClick = (dispatchId: string, selectedVehicles: Vehicles[]) => {
        const confirmAddFleets = window.confirm("Are you sure you want to add these fleets to the dispatch?");
        if (confirmAddFleets) {
            const fleetIdsToAdd = selectedVehicles.map(vehicle => vehicle._id);
            fetch(`${process.env.serverUrl}/api/v1/dispatches/vehicles/${dispatchId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fleetIds: fleetIdsToAdd })
            })
                .then(response => {
                    if (response.ok) {
                        window.location.reload();
                    } else {
                        console.error('Failed to add fleets to dispatch');
                    }
                })
                .catch(error => {
                    console.error('Error adding fleets to dispatch:', error);
                });
        }
    };

    const handleVehicleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFleetIds = Array.from(event.target.selectedOptions, option => option.value); // Get all selected vehicle Id 
        const selectedVehicles = vehicles.filter(vehicle => selectedFleetIds.includes(vehicle._id));
        setSelectedVehicles(selectedVehicles);
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
                        <p className='mt-3'>Available Fleets (Select Vehicles) </p>
                        <div>

                            <select
                                multiple
                                className="mt-1 mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={handleVehicleSelect}
                            >
                                {vehicles.map(vehicle => (
                                    <option key={vehicle._id} value={vehicle._id}>
                                        {vehicle.fleetId} - {vehicle.fleetType}
                                    </option>
                                ))}
                            </select>
                            {/* List Selected Vehicles. */}
                            <ul className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {selectedVehicles.map((vehicle, index) => (
                                    <li key={index}>
                                        {vehicle.fleetId} - {vehicle.fleetType}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="ml-1 mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleStatusChangeClick(dispatch.callId)}>
                            {dispatch.dispatchStatus}
                        </button>
                        <button className="ml-1 mt-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDeleteClick(dispatch._id)}>
                            Delete
                        </button>
                        <button
                            className="ml-1 mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleAddFleetsClick(dispatch._id, selectedVehicles)}
                        >
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