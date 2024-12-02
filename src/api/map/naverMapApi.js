import { PHOTO_SPOTS } from '../../data/photoSpotData'; 

export const MAJOR_CITIES = [
  { title: '서울', lat: 37.5665, lng: 126.9780 },
  { title: '부산', lat: 35.1796, lng: 129.0756 },
  { title: '대구', lat: 35.8714, lng: 128.6014 },
  { title: '인천', lat: 37.4563, lng: 126.7052 },
  { title: '광주', lat: 35.1595, lng: 126.8526 },
  { title: '대전', lat: 36.3504, lng: 127.3845 },
  { title: '울산', lat: 35.5384, lng: 129.3114 },
  { title: '제주', lat: 33.4996, lng: 126.5312 }
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

export const createPhotoSpotMarker = (map, spot, onClick) => {
  const marker = new window.naver.maps.Marker({
    position: new window.naver.maps.LatLng(spot.lat, spot.lng),
    map: map,
    icon: {
      content: `
        <div style="
          width: 30px;
          height: 30px;
          background-color: #2196F3;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        ">
          📸
        </div>
      `,
      size: new window.naver.maps.Size(30, 30),
      anchor: new window.naver.maps.Point(15, 15)
    }
  });

  if (onClick) {
    window.naver.maps.Event.addListener(marker, 'click', () => onClick(spot));
  }

  return marker;
};

export const createPersonSpotMarker = (map, personSpot, onClick) => {
  const marker = new window.naver.maps.Marker({
    position: new window.naver.maps.LatLng(personSpot.lat, personSpot.lng),
    map: map,
    icon: {
      content: `
        <div style="
          width: 24px;
          height: 24px;
          background-color: #4CAF50;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        ">
          👤
        </div>
      `,
      size: new window.naver.maps.Size(24, 24),
      anchor: new window.naver.maps.Point(12, 12)
    }
  });

  if (onClick) {
    window.naver.maps.Event.addListener(marker, 'click', () => onClick(personSpot));
  }

  return marker;
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

export const getPhotoSpots = (city, category = 'all') => {
  const spots = PHOTO_SPOTS[city] || [];
  if (category === 'all') return spots;
  return spots.filter(spot => spot.category.includes(category));
};

export const PHOTO_SPOT_CATEGORIES = [
  { id: 'all', name: '전체' },
  { id: 'sunrise', name: '일출' },
  { id: 'sunset', name: '일몰' },
  { id: 'night', name: '야경' },
  { id: 'nature', name: '자연경관' },
  { id: 'architecture', name: '건축물' },
  { id: 'culture', name: '문화' }
];

// 마커를 관리하기 위한 유틸리티 함수들
export const clearMarkers = (markers) => {
  if (markers && markers.length) {
    markers.forEach(marker => {
      if (marker) marker.setMap(null);
    });
  }
};

export const updateMapBounds = (map, markers) => {
  if (!map || !markers || !markers.length) return;

  const bounds = new window.naver.maps.LatLngBounds();
  markers.forEach(marker => {
    bounds.extend(marker.getPosition());
  });
  map.fitBounds(bounds);
};

export const moveToLocation = (map, panorama, location) => {
  const position = new window.naver.maps.LatLng(location.lat, location.lng);
  map?.setCenter(position);
  panorama?.setPosition(position);
};

export default {
  MAJOR_CITIES,
  NAVER_MAP_CENTER,
  PHOTO_SPOT_CATEGORIES,
  loadNaverMapScript,
  initializeMap,
  initializePanorama,
  createMarker,
  createPhotoSpotMarker,
  createPersonSpotMarker,
  geocodeAddress,
  getPhotoSpots,
  clearMarkers,
  updateMapBounds,
  moveToLocation
};