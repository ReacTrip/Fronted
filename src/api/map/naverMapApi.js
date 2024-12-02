export const MAJOR_CITIES = [
  { title: '서울', lat: 37.5665, lng: 126.9780 },
  { title: '부산', lat: 35.1796, lng: 129.0756 },
  { title: '대구', lat: 35.8714, lng: 128.6014 },
  { title: '인천', lat: 37.4563, lng: 126.7052 },
  { title: '광주', lat: 35.1595, lng: 126.8526 },
  { title: '대전', lat: 36.3504, lng: 127.3845 },
  { title: '울산', lat: 35.5384, lng: 129.3114 }
];

export const NAVER_MAP_CENTER = { lat: 36.5, lng: 127.8 };

let naverMapScriptPromise = null;

export const loadNaverMapScript = () => {
  if (naverMapScriptPromise) {
    return naverMapScriptPromise;
  }

  naverMapScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_NAVER_MAP_CLIENT_ID}&submodules=panorama,geocoder`;
    script.async = true;

    script.onload = () => {
      resolve(window.naver.maps);
    };
    script.onerror = () => reject(new Error('Failed to load Naver Maps'));

    document.head.appendChild(script);
  });

  return naverMapScriptPromise;
};

export const initializeMap = (container, options = {}) => {
  const defaultOptions = {
    center: new window.naver.maps.LatLng(NAVER_MAP_CENTER.lat, NAVER_MAP_CENTER.lng),
    zoom: 16,
    mapTypeControl: true,
    zoomControl: true,
    zoomControlOptions: {
      position: window.naver.maps.Position.TOP_RIGHT
    }
  };

  return new window.naver.maps.Map(container, { ...defaultOptions, ...options });
};

export const initializePanorama = (container, options = {}) => {
  const defaultOptions = {
    position: new window.naver.maps.LatLng(MAJOR_CITIES[0].lat, MAJOR_CITIES[0].lng),
    pov: {
      pan: 0,
      tilt: 0,
      fov: 100
    },
    zoomControl: true,
    flightSpot: true
  };

  return new window.naver.maps.Panorama(container, { ...defaultOptions, ...options });
};

export const createMarker = (map, position, options = {}) => {
  return new window.naver.maps.Marker({
    map,
    position: new window.naver.maps.LatLng(position.lat, position.lng),
    ...options
  });
};

export const geocodeAddress = (query) => {
  return new Promise((resolve, reject) => {
    if (!window.naver.maps.Service) {
      reject(new Error('Geocoding service not loaded'));
      return;
    }

    window.naver.maps.Service.geocode({
      query: query
    }, (status, response) => {
      if (status !== window.naver.maps.Service.Status.OK) {
        reject(new Error('Geocoding failed'));
        return;
      }
      resolve(response);
    });
  });
};