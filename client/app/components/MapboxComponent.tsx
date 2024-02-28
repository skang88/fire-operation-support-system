// source: https://tsukurue.com/en/archives/808

import Map, { GeolocateControl, GeolocateResultEvent, useMap } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useRef } from 'react'

const geoLocaleOptions = {
  positionOptions: { enableHighAccuracy: true },
  fitBoundsOptions: { maxZoom: 15 },
  trackUserLocation: true,
  showUserHeading: true
}

/**
 * Display centred on the user's current position and rotate the map north in the direction they are heading, while tracking
 */
const Mapbox4 = () => {
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

  const api_key = process.env.MAPBOX_TOKEN

  return (
    <Map
      id='map'
      initialViewState={{
        longitude: -111.79134419888223,
        latitude: 33.257175468103014,
        zoom: 15
      }}
      style={{ width: '100%', height: '60vh' }}
      mapStyle={'mapbox://styles/mapbox/streets-v12'}
      mapboxAccessToken={api_key}
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
  )
}

export default Mapbox4

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