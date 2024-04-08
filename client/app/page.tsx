'use client'
import React, { useState, useEffect } from 'react';
import Mapbox4 from './components/MapboxMarker';


interface Dispatch {
  _id: string;
  callId: string;
  dispatchType: string;
  dispatchAddress: string;
  dispatchLatitude: number;
  dispatchLongitude: number;
  dispatchFleets: string[];
  dispatchStatus: string;
  dispatchTime: string;
  __v: number;
}

interface Fleets {
  _id: string;
  fleetId: string;
  fleetType: string;
  stationId: string;
  fleetStatus: string;
}


export default function Home() {

  const [message, setMessage] = useState<string>("Loading");
  const [dispatches, setDispatches] = useState<Dispatch[]>([]);
  const [fleets, setFleets] = useState<Fleets[]>([]);
  const [availableFleets, setAvailableFleets] = useState<Fleets[]>([]);
  const [selectedDispatch, setSelectedDispatch] = useState<Dispatch | null>(null);


  useEffect(() => {
    fetch(`${process.env.serverUrl}/api/v1/dispatches`)
      .then(response => response.json())
      .then(
        (data: { message: string, count: number, dispatches: Dispatch[] }) => {
          console.log(data);
          setMessage(data.message);
          setDispatches(data.dispatches);
        })
  }, []);

  useEffect(() => {
    fetch(`${process.env.serverUrl}/api/v1/fleets/active`)
      .then(response => response.json())
      .then(
        (data: { message: string, count: number, activeFleets: Fleets[] }) => {
          console.log(data);
          setMessage(data.message);
          setFleets(data.activeFleets);
        })
  }, []);

  // Get available fleets
  useEffect(() => {
    fetch(`${process.env.serverUrl}/api/v1/fleets/available`)
      .then(response => response.json())
      .then((data: { message: string, count: number, availableFleets: Fleets[] }) => {
        console.log(data);
        setMessage(data.message);
        setAvailableFleets(data.availableFleets);
      })
  }, []);

  return (
    <div>

      <div className="mt-1 ml-10">
        {dispatches.length === 0 ? 'Loading dispatches...' : `${dispatches.length} dispatches are in active.`} <span className='mr-5'></span>
        <select
          value={selectedDispatch ? selectedDispatch._id : ""}
          onChange={(e) => {
            const selectedId = e.target.value;
            const selected = dispatches.find(dispatch => dispatch._id === selectedId);
            if (selected) {
              setSelectedDispatch(selected);
            }
          }}
          className="bg-gray-100 border border-gray-300 rounded-md p-2.5"
        >
          <option value="">Select a dispatch</option>
          {dispatches.map((dispatch, index) => (
            <option key={index} value={dispatch._id}>{dispatch._id}</option>
          ))}
        </select>
        <button
          onClick={() => setSelectedDispatch(null)}
          className="ml-3 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-md px-3 py-1.5"
        >
          Clear Selection
        </button>
      </div>

      {selectedDispatch && (
        <div className="mt-5">
          <div className="ml-5 mr-5 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p className="font-normal text-gray-700 dark:text-gray-200">Dispatch ID: {selectedDispatch._id}</p>
            <p className="font-normal text-gray-700 dark:text-gray-300">Dispatch Type: {selectedDispatch.dispatchType}</p>
            <p className="font-normal text-gray-700 dark:text-gray-300">Dispatch Address: {selectedDispatch.dispatchAddress}</p>
            <p className="font-normal text-gray-700 dark:text-gray-300">Dispatch Status: {selectedDispatch.dispatchStatus}</p>
            <p className="font-normal text-gray-700 dark:text-gray-300">Dispatch Time: {selectedDispatch.dispatchTime}</p>
            <p className="font-normal text-gray-700 dark:text-gray-300">Dispatch Latitude: {selectedDispatch.dispatchLatitude}</p>
            <p className="font-normal text-gray-700 dark:text-gray-300">Dispatch Longitude: {selectedDispatch.dispatchLongitude}</p>
            {/* Add more dispatch data as needed */}
          </div>
        </div>
      )}

      <div className="mt-1 ml-10">
        {fleets && fleets.length > 0 ? fleets.length + ' fleets are in active.   ' : 'Loading fleets...'} 
        {availableFleets && availableFleets.length > 0 ? availableFleets.length + ' fleets are available.' : 'Loading fleets...'}
      </div>

      <div className="mt-5 ml-5 mr-5 ">
        <Mapbox4 latitude={selectedDispatch?.dispatchLatitude || 0} longitude={selectedDispatch?.dispatchLongitude || 0} />
      </div>
    </div>

  );
}
