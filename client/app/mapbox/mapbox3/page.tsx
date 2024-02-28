'use client'
import * as React from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

const api_key = process.env.MAPBOX_TOKEN


// Example data array
const dataPoints = [
    { id: 1, longitude: -111.80, latitude: 33.26, color: 'red' },
    { id: 2, longitude: -111.78, latitude: 33.24, color: 'blue' },
    // Add more data points as needed
];


export default function Mapbox3() {
    console.log('Hi from Mapbox 3')
    const [viewState, setViewState] = React.useState({
        longitude: -111.79,
        latitude: 33.25,
        zoom: 12
    });

    return (
        <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapboxAccessToken={api_key}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            style={{ width: '100%', height: '60vh' }}
        >
            {dataPoints.map(point => (
                <Marker
                    key={point.id}
                    longitude={point.longitude}
                    latitude={point.latitude}
                >
                    <div
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: point.color,
                            border: '2px solid white',
                            cursor: 'pointer',
                        }}
                    />
                </Marker>
            ))}


        </Map>
    );
}

