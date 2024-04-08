'use client'
import React, { useState, useEffect } from 'react';

interface Features {
    placeName: string;
    geometry: {
        type: string;
        coordinates: [number, number];
    };
}

interface Vehicles {
    vehicleId: string;
    vehicleType: string;
    _id: string;
    fleetId: string;
    fleetType: string
}

export default function CreateDispatches() {

    const [address, setAddress] = useState<string>('');
    const [placeName, setPlaceName] = useState<string>('');
    const [latitude, setLatitude] = useState<string>('');
    const [longitude, setLongitude] = useState<string>('');
    const [features, setFeatures] = useState<Features[]>([]);
    const [vehicles, setVehicles] = useState<Vehicles[]>([]);
    const [selectedVehicles, setSelectedVehicles] = useState<Vehicles[]>([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/v1/fleets/available')
            .then(response => response.json())
            .then(data => {
                setVehicles(data.availableFleets);
            })
            .catch(error => {
                console.error('Error fetching vehicles:', error);
            });
    }, []);


    useEffect(() => {
        console.log("vehicles", vehicles);
    }, [vehicles]);


    const handleSearch = async () => {
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_TOKEN}`);
            const data = await response.json();

            const extractedFeatures: Features[] = data.features.map((item: any) => ({
                placeName: item.place_name,
                geometry: item.geometry
            }));
            setFeatures(extractedFeatures);

        } catch (error) {
            console.error('Error fetching geocoding data:', error);
        }
    };

    const handleListItemClick = (item: Features) => {
        setPlaceName(item.placeName);
        setLatitude(item.geometry.coordinates[1].toString());
        setLongitude(item.geometry.coordinates[0].toString());
    };

    const handleVehicleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFleetIds = Array.from(event.target.selectedOptions, option => option.value); // Get all selected vehicle Id 
        const selectedVehicles = vehicles.filter(vehicle => selectedFleetIds.includes(vehicle._id));
        setSelectedVehicles(selectedVehicles);
    };

    const generateCallId = () => {
        // Generate a random callId, e.g., using timestamp or UUID
        return Date.now().toString();
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const formData = {
                callId: generateCallId(),
                dispatchType: event.currentTarget.dispatchType.value,
                dispatchAddress: event.currentTarget.dispatchAddress.value,
                dispatchLatitude: latitude,
                dispatchLongitude: longitude,
                dispatchFleets: selectedVehicles.map(vehicle => vehicle._id),
                dispatchStatus: "in progress"
            };

            console.log("form data is", formData);

            const response = await fetch('http://localhost:4000/api/v1/dispatches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Dispatch created successfully');
                alert('Dispatch created successfully');

                // Extract fleetIds from selectedVehicles
                const fleetIdsToUpdate = selectedVehicles.map(vehicle => vehicle._id);

                console.log("fleetIdsToupdate is ", fleetIdsToUpdate)

                // Update fleet status for each fleetId
                const fleetUpdatePromises = fleetIdsToUpdate.map(async (fleetId) => {
                    const fleetResponse = await fetch(`http://localhost:4000/api/v1/fleets/${fleetId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ fleetStatus: 'active' }) // Modify status as needed
                    });

                    if (fleetResponse.ok) {
                        console.log(`Fleet ${fleetId} status updated successfully`);
                    } else {
                        console.error(`Failed to update fleet ${fleetId} status`);
                    }
                });
                // Wait for all fleet update requests to complete
                await Promise.all(fleetUpdatePromises);

            } else {
                console.error('Failed to create dispatch');
            }
        } catch (error) {
            console.error('Error creating dispatch:', error);
        }
    };

    return (

        <div>
            <label htmlFor="callId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Address Search</label>
            <div className="grid gap-6 mb-1 md:grid-cols-3">
                <input
                    type="text"
                    className="col-span-3 md:col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button
                    className="col-span-3 md:col-span-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            <ul>
                {features.map((item, index) => (
                    <li key={index}
                        className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                        onClick={() => handleListItemClick(item)}>
                        <div>Place Name: {item.placeName}</div>
                        <div>Geometry: {JSON.stringify(item.geometry)}</div>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 mb-3 md:grid-cols-2">

                    <div className="mt-2">
                        <label htmlFor="callId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Call ID</label>
                        <input type="text" id="callId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Call ID" value={generateCallId()} readOnly required />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="dispatchType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Dispatch Type</label>
                        <select id="dispatchType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value="">Select Dispatch Type</option>
                            <option value="Fire">Fire</option>
                            <option value="Rescue">Rescue</option>
                            <option value="Medical Emergency">Emergency Medical Care</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="dispatchAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">dispatchAddress</label>
                        <input type="text" id="dispatchAddress" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address"
                            value={placeName}
                            onChange={(e) => setPlaceName(e.target.value)}
                            required />
                    </div>

                    <div>
                        <label htmlFor="dispatchLatitude" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Dispatch Latitude</label>
                        <input type="text" id="dispatchLatitude" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Latitude"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="dispatchLongitude" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Dispatch Longitude</label>
                        <input type="text" id="dispatchLongitude" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Longitude"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)} />
                    </div>

                </div>

                <div>
                    <label htmlFor="dispatchType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Select a Vehicle</label>
                    <select
                        multiple
                        className="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    )
}
