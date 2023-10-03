import { GeocodeType } from '../../types/mapType';

const { kakao } = window;

const geocoder = new kakao.maps.services.Geocoder();

export const getGeocode = (address: string): Promise<GeocodeType> => {
  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, (result: { x: string; y: string }[], status: string) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = {
          La: result[0].x,
          Ma: result[0].y,
        };
        resolve(coords);
      } else {
        reject(status);
      }
    });
  });
};
