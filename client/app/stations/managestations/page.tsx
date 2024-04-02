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
    const [editingStation, setEditingStation] = useState<Station | null>(null);
    const [updatedStation, setUpdatedStation] = useState<Station>({
        _id: "",
        stationName: "",
        address: "",
        longitude: 0,
        latitude: 0
    });

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

    const handleEdit = (station: Station) => {
        setEditingStation(station);
        setUpdatedStation(station);
    }

    const handleSave = () => {
        fetch(`${process.env.serverUrl}/api/v1/stations/${editingStation?._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedStation)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Station information updated successfully');
                    // Close modal or perform any other action after saving
                    setEditingStation(null);
                } else {
                    console.error('Failed to update station information');
                    // Handle error scenario
                }
            })
            .catch(error => {
                console.error('Error occurred while updating station information:', error);
                // Handle error scenario
            });
    }

    const handleCancel = () => {
        // Close modal or perform any other action when canceling editing
        setEditingStation(null);
    }

    const handleDelete = (stationId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this station?');
        if (confirmDelete) {
            fetch(`${process.env.serverUrl}/api/v1/stations/${stationId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Station deleted successfully');
                        // Fetch updated station information after deletion
                        fetchUpdatedStation();
                    } else {
                        console.error('Failed to delete station');
                        // Handle error scenario
                    }
                })
                .catch(error => {
                    console.error('Error occurred while deleting station:', error);
                    // Handle error scenario
                });
        }
    }

    const fetchUpdatedStation = () => {
        fetch(`${process.env.serverUrl}/api/v1/stations`)
            .then(response => response.json())
            .then(data => {
                setStation(data.stations);
            })
            .catch(error => {
                console.error('Error fetching updated station information:', error);
                // Handle error scenario
            });
    }

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
                            <button
                                className="ml-1 mt-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleEdit(station)}
                            >
                                Edit
                            </button>
                            <button
                                className="ml-1 mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleDelete(station._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for editing station information */}
            {editingStation && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    <div className="bg-white p-8 rounded-lg z-10 w-96">
                        <h2 className="text-lg font-semibold mb-4">Edit Station</h2>
                        <label className="block mb-2">Station Name</label>
                        <input
                            type="text"
                            className="border rounded-md mb-2 w-full p-2"
                            value={updatedStation.stationName}
                            onChange={(e) => setUpdatedStation({ ...updatedStation, stationName: e.target.value })}
                        />
                        <label className="block mb-2">Address</label>
                        <input
                            type="text"
                            className="border rounded-md mb-2 w-full p-2"
                            value={updatedStation.address}
                            onChange={(e) => setUpdatedStation({ ...updatedStation, address: e.target.value })}
                        />
                        <label className="block mb-2">Latitude</label>
                        <input
                            type="number"
                            className="border rounded-md mb-2 w-full p-2"
                            value={updatedStation.latitude}
                            onChange={(e) => setUpdatedStation({ ...updatedStation, latitude: Number(e.target.value) })}
                        />
                        <label className="block mb-2">Longitude</label>
                        <input
                            type="number"
                            className="border rounded-md mb-2 w-full p-2"
                            value={updatedStation.longitude}
                            onChange={(e) => setUpdatedStation({ ...updatedStation, longitude: Number(e.target.value) })}
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
