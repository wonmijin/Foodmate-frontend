import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
const { kakao } = window;

export const CurrentLocation = () => {
  const [myLocation, setMyLocation] = useState('');

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
          console.error('Error getting user location:', error);
        },
      );
    }
  }, []);

  useEffect(() => {
    if (myLocation) {
      // 지도 초기화
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: myLocation,
        level: 7,
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);

      // 현재 위치 마커 생성
      const userMarkerImage = new kakao.maps.MarkerImage(
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
        new kakao.maps.Size(24, 35),
        {
          offset: new kakao.maps.Point(12, 35),
        },
      );
      const userMarker = new kakao.maps.Marker({
        position: myLocation,
        image: userMarkerImage,
      });
      userMarker.setMap(map);

      // 현재 위치 원 그리기
      const circleOptions = {
        center: myLocation,
        radius: 5000,
        strokeWeight: 1,
        strokeColor: '#333',
        strokeOpacity: 0.7,
        fillColor: '#ddd',
        fillOpacity: 0.3,
      };
      const circle = new kakao.maps.Circle(circleOptions);
      circle.setMap(map);
    }
  }, [myLocation]);

  return (
    <>
      <KakaoMapWrap>
        <div id="map"></div>
      </KakaoMapWrap>
    </>
  );
};

const KakaoMapWrap = styled.div`
  #map {
    width: 100%;
    height: 90vh;
  }
`;
