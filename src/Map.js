import React from 'react';
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useJsApiLoader,
} from '@react-google-maps/api';
// import mapStyle from './mapStyle';
import locations from './locations';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: -28.024,
  lng: 140.887,
};

const options = {
  // styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};
const markerOptions = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
}


const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  })

  // const [map, setMap] = React.useState(null)

  // const onMapLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, [])

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      options={options}
      // onLoad={onMapLoad}
      onClick={(event) => {
        console.log('event', event)
      }}
    >
      <MarkerClusterer options={markerOptions}>
        {(clusterer) =>
          locations.map((location, idx) => (
            <Marker
              key={idx}
              position={{ lat: location.lat, lng: location.lng }}
              icon={{
                url: '/marker-icon.png',
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              clusterer={clusterer}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  ) : <></>
};

export default Map;
