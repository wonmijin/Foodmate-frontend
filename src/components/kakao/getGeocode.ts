const { kakao } = window;

const geocoder = new kakao.maps.services.Geocoder();

export const getGeocode = (address: string) => {
  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, (result: { x: unknown; y: unknown }[], status: unknown) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].x, result[0].y);
        resolve(coords);
      } else {
        reject(status);
      }
    });
  });
};
