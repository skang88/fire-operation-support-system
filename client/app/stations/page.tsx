'use client'
import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

const api_key = process.env.MAPBOX_TOKEN

interface Station {
    _id: string;
    stationId: number;
    stationName: string;
    address: string;
    latitude: number;
    longitude: number;
    __v: number;
}


export default function Mapbox1() {

    const [viewState, setViewState] = useState({
        longitude: -111.79,
        latitude: 33.25,
        zoom: 12
    });

    const [message, setMessage] = useState("Data Loading...");
    const [stations, setStations] = useState<Station[]>([]);
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);


    useEffect(() => {
        console.log('Hi from Mapbox 1')
        fetch(`${process.env.serverUrl}/api/v1/stations`)
            .then(response => response.json())
            .then(
                (data) => {
                    console.log(data);
                    setMessage(`${data.stations.length} stations ${data.message}`);
                    setStations(data.stations || []);
                })
    }, []);

    const handleMarkerClick = (station: Station) => {
        console.log('Marker clicked:', station);
        console.log('Popup coordinates:', station.longitude, station.latitude);
        setSelectedStation(station);
    };

    return (
        <div className="mt-5 ml-5 mr-5">
            <div> {message} </div>

            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                mapboxAccessToken={api_key}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                style={{ width: '100%', height: '60vh' }}
            >

                {stations.map((station) => (
                    <Marker
                        key={station._id}
                        longitude={station.longitude}
                        latitude={station.latitude}
                        onClick={() => handleMarkerClick(station)}
                    >
                        <div
                            style={{
                                width: '15px',
                                height: '15px',
                                borderRadius: '50%',
                                backgroundColor: 'red', // You can customize this color or use station-specific color property
                                border: '2px solid white',
                                cursor: 'pointer',
                            }}
                        />
                    </Marker>
                ))}

                {selectedStation && (
                    <Popup
                        longitude={selectedStation.longitude}
                        latitude={selectedStation.latitude}
                        onClose={() => setSelectedStation(null)}
                        anchor="top"
                        closeOnClick={false}
                        closeButton={true}
                        style={{
                            padding: '10px',
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                            zIndex: 1000, // Ensure a higher zIndex
                        }}
                    >
                        <div>
                            <h2>{selectedStation.stationName}</h2>
                            <p>{selectedStation.address}</p>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
}