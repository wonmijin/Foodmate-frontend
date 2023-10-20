import { useEffect } from 'react';
import { styled } from 'styled-components';
import useCurrentLocation from '../../hooks/useCurrentLocation';
const { kakao } = window;

interface geoCodeArrType {
  latitude: string;
  longitude: string;
}

export const CurrentLocation = ({ geoCodeArr }: { geoCodeArr: geoCodeArrType[] }) => {
  const myLocation = useCurrentLocation();

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

      // 모임 마커 표시
      geoCodeArr.forEach(({ latitude, longitude }) => {
        const markerPosition = new kakao.maps.LatLng(Number(latitude), Number(longitude));
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    }
  }, [myLocation, geoCodeArr]);

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
