import { useState, useEffect } from 'react';
import { GeocodeType } from '../types/mapType';
const { kakao } = window;

const useCurrentLocation = (): GeocodeType | null => {
  const [myLocation, setMyLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const userLocation = new kakao.maps.LatLng(userLat, userLng);
          setMyLocation(userLocation);
        },
        (error) => {
          console.error(error);
        },
      );
    }
  }, []);

  return myLocation;
};

export default useCurrentLocation;
