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
  // disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  minZoom: 2,
  streetViewControl: false,
  zoomControlOptions: {
    position: google.maps.ControlPosition.TOP_LEFT, // google is undefined here
  },
};
const markerOptions = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
}

const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  })

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      options={options}
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
