import { useEffect } from "react";
import { styled } from "styled-components";
const { kakao } = window;

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        kakao: any;
    }
}

export const KakaoMap = ({ geoCode }: { geoCode: string[] }) => {
    useEffect(() => {
        if (geoCode && geoCode.length === 2) {
            const [latitude, longitude] = geoCode;

            // 초기화
            const mapContainer = document.getElementById("map");
            const mapOption = {
                center: new kakao.maps.LatLng(latitude, longitude),
                level: 5,
            };
            const map = new kakao.maps.Map(mapContainer, mapOption);

            // 마커 생성
            const markerPosition = new kakao.maps.LatLng(latitude, longitude);
            const marker = new kakao.maps.Marker({
                position: markerPosition,
            });
            marker.setMap(map);

            // 마커가 가운데로 가도록
            map.setCenter(markerPosition);
        }
    }, [geoCode]);

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
        height: 200px;
    }
`;
