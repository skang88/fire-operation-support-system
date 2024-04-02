'use client'
import React, { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css'
import Map, { Marker, GeolocateControl, GeolocateResultEvent, useMap } from 'react-map-gl'
import { useRef } from 'react'


const api_key = process.env.MAPBOX_TOKEN

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

export default function Home() {

  const [message, setMessage] = useState<string>("Loading");
  const [dispatches, setDispatches] = useState<Dispatch[]>([]);
  const [selectedDispatch, setSelectedDispatch] = useState<Dispatch | null>(null);
  const [viewState, setViewState] = useState({
    longitude: -111.79,
    latitude: 33.25,
    zoom: 12
  });

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

  const handleSelectDispatch = (dispatch: Dispatch) => {
    setSelectedDispatch(dispatch);
    setViewState({
      longitude: dispatch.dispatchLongitude,
      latitude: dispatch.dispatchLatitude,
      zoom: 12
    });
  };

  return (
    <div>

      <div className="mt-1 ml-10">
        {dispatches.length} dispatches are in active.  <span className='mr-5'></span>
        <select
          value={selectedDispatch ? selectedDispatch._id : ""}
          onChange={(e) => {
            const selectedId = e.target.value;
            const selected = dispatches.find(dispatch => dispatch._id === selectedId);
            if (selected) {
              handleSelectDispatch(selected);
            }
          }}
          className="bg-gray-100 border border-gray-300 rounded-md p-2.5"
        >
          <option value="">Select a dispatch</option>
          {dispatches.map((dispatch, index) => (
            <option key={index} value={dispatch._id}>{dispatch._id}</option>
          ))}
        </select>
      </div>
      {selectedDispatch && (
        <div className="mt-5">
          <div className="ml-5 mr-5 p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <p className="font-normal text-gray-700 dark:text-gray-300">Dispatch Type: {selectedDispatch.dispatchType}</p>
            <p className="font-normal text-gray-700 dark:text-gray-300">Dispatch Address: {selectedDispatch.dispatchAddress}</p>
            <p className="font-normal text-gray-700 dark:text-gray-300">Dispatch Status: {selectedDispatch.dispatchStatus}</p>
            <p className="font-normal text-gray-700 dark:text-gray-300">Dispatch Time: {selectedDispatch.dispatchTime}</p>
          </div>
        </div>
      )}

      <div className="mt-5 ml-5 mr-5">
        <Map
          {...viewState}
          id='map'
          style={{ width: '100%', height: '60vh' }}
          mapStyle={'mapbox://styles/mapbox/streets-v12'}
          mapboxAccessToken={api_key}
        >

          {selectedDispatch && (
            <Marker latitude={selectedDispatch.dispatchLatitude} longitude={selectedDispatch.dispatchLongitude}>
              <button
                className="bg-red-600 text-white rounded-full px-3 py-1"
                onClick={() => handleSelectDispatch(selectedDispatch)}
              >
                {selectedDispatch.dispatchType}
              </button>
            </Marker>
          )}

        </Map>

      </div>
    </div>

  );
}
