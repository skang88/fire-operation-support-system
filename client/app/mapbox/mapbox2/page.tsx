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

    const onGeolocate = (e: GeolocateResultEvent) => {
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

    return <Map
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
    />;
}