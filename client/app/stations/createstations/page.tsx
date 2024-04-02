'use client'
import React, { useState } from 'react';

export default function CreateStations() {
    const [stationId, setStationId] = useState<number>(1);
    const [stationName, setStationName] = useState<string>('Chandler Fire Department Station No.1');
    const [address, setAddress] = useState<string>('1491 E Pecos Rd, Chandler, AZ 85225');
    const [latitude, setLatitude] = useState<number>(33.29095993606609);
    const [longitude, setLongitude] = useState<number>(-111.81659271582987);
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newStation = {
            stationId: Number(stationId),
            stationName: stationName,
            address: address,
            latitude: Number(latitude),
            longitude: Number(longitude)
        };

        try {
            const response = await fetch(`${process.env.serverUrl}/api/v1/stations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStation)
            });

            if (response.ok) {
                setStationId(1);
                setStationName('');
                setAddress('');
                setLatitude(0);
                setLongitude(0);
                setMessage('Station created successfully!');
            } else {
                setMessage('Failed to create station');
            }
        } catch (error) {
            console.error('Error creating station:', error);
            setMessage('Error creating station');
        }
    };

    return (
        <div className="mt-5 ml-5 mr-5">
            {message && <p className="text-red-500">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Station ID</label>
                    <input
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={stationId}
                        onChange={(e) => setStationId(Number(e.target.value))}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Station Name</label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={stationName}
                        onChange={(e) => setStationName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Address</label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Latitude</label>
                    <input
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={latitude}
                        onChange={(e) => setLatitude(Number(e.target.value))}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Longitude</label>
                    <input
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={longitude}
                        onChange={(e) => setLongitude(Number(e.target.value))}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Create
                </button>
            </form>
        </div>
    );
}
