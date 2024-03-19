'use client'
import { useRef } from 'react';
import Map, { GeolocateControl, GeolocateResultEvent, useMap } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

const geoLocaleOptions = {
    positionOptions: { enableHighAccuracy: true },
    fitBoundsOptions: { maxZoom: 15 },
    trackUserLocation: true,
    showUserHeading: true
}

export default function Mapbox2() {

    console.log('Hi from Mapbox 2')
    const { map } = useMap()
    const geoControlRef = useRef<mapboxgl.GeolocateControl>(null)

    const onGeolocate = async (e: GeolocateResultEvent) => {
        const userLocation = {
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
            heading: e.coords.heading ?? 0,
        };

        // send location information to server
        try {
            const response = await fetch('http://localhost:4000/api/v1/locations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userLocation),
            });

            if (response.ok) {
                console.log('User location sent to the server successfully.');
            } else {
                console.error('Failed to send user location to the server.');
            }
        } catch (error) {
            console.error('Error sending user location:', error);
        }


        map?.easeTo({
            center: { lat: e.coords.latitude, lng: e.coords.longitude },
            bearing: e.coords.heading ?? 0
        })
    }

    const onLoad = () => {
        if (!geoControlRef.current?.trigger()) {
            geoControlRef.current?.trigger()
        }
    }

    return (
        <Map
            id='map'
            mapboxAccessToken={process.env.MAPBOX_TOKEN}
            initialViewState={{
                longitude: -111.79,
                latitude: 33.25,
                zoom: 12
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            style={{ width: '100%', height: '60vh' }}
            onLoad={onLoad}
        >
            <GeolocateControl
                ref={geoControlRef}
                {...geoLocaleOptions}
                onGeolocate={e => {
                    onGeolocate(e)
                }}
                onError={e => {
                    errorMsg(e)
                }}
            />



        </Map>
    );
}



/**
 * Error alert when geolocation is acquired.
 * @param error
 */
const errorMsg = (error: { code: number }): void => {
    // 0:UNKNOWN_ERROR			
    // 1:PERMISSION_DENIED		
    // 2:POSITION_UNAVAILABLE		
    // 3:TIMEOUT					

    const errorInfo = [
        'An error of unknown cause has occurred.',
        'Location data acquisition is not permitted.',
        'Location information could not be obtained due to signal conditions or other reasons.',
        'Location acquisition took too long and timed out.'
    ]

    const errorMessage = '[Error number: ' + error.code + ']\n' + errorInfo[error.code]
    alert(errorMessage)
}