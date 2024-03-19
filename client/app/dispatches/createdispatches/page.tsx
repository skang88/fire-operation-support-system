'use client'
import React, { useState, useEffect } from 'react';
import Mapbox4 from '../../components/MapboxComponent';

interface Features {
    placeName: string;
    geometry: {
        type: string;
        coordinates: [number, number];
    };
}

export default function CreateDispatches() {

    const [address, setAddress] = useState<string>('');
    const [placeName, setPlaceName] = useState<string>('');
    const [latitude, setLatitude] = useState<string>('');
    const [longitude, setLongitude] = useState<string>('');
    const [features, setFeatures] = useState<Features[]>([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_TOKEN}`);
            const data = await response.json();

            console.log(data);
            console.log(data.features);

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



    return (

        <div>
            <h1> Create Dispatches </h1>
            <label htmlFor="callId" className="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-black">Address Search</label>
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
                    <li key={index} onClick={() => handleListItemClick(item)}>
                        <div>Place Name: {item.placeName}</div>
                        <div>Geometry: {JSON.stringify(item.geometry)}</div>
                    </li>
                ))}
            </ul>

            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">

                    <div className="mt-5">
                        <label htmlFor="callId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Call ID</label>
                        <input type="text" id="callId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Call ID" required />
                    </div>
                    <div className="mt-5">
                        <label htmlFor="dispatchType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Dispatch Type</label>
                        <select id="dispatchType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value="">Select Dispatch Type</option>
                            <option value="Type 1">Fire</option>
                            <option value="Type 2">Rescue</option>
                            <option value="Type 3">Emergency Medical Care</option>
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

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    )
}