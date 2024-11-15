// src/components/map/KoreaMap.jsx
import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MAJOR_CITIES } from '@/api/map/naverMapApi';

const MapContainer = styled(Box)({
  width: '500px',
  height: '350px',
  position: 'absolute',
  right: '50px',
  top: '-90px',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
});

const KoreaMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.naver) {
      console.error('Naver Maps API is not loaded');
      return;
    }

    const mapOptions = {
      center: new window.naver.maps.LatLng(36.5, 127.8),
      zoom: 7,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT
      }
    };

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);

    // 마커 생성
    MAJOR_CITIES.forEach(city => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(city.lat, city.lng),
        map: map,
        title: city.title
      });

      // 마커 클릭 이벤트
      window.naver.maps.Event.addListener(marker, 'click', () => {
        console.log(`${city.title} clicked!`);
      });
    });

    return () => {
      // cleanup
      map.destroy();
    };
  }, []);

  return <MapContainer ref={mapRef} />;
};

export default KoreaMap;