import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MAJOR_CITIES, loadNaverMapScript, createMarker } from '../../api/map/naverMapApi';

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
  const markersRef = useRef([]);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        await loadNaverMapScript();

        if (!mapRef.current) return;

        const mapOptions = {
          center: new window.naver.maps.LatLng(36.5, 127.8),
          zoom: 7,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT
          },
          mapTypeControl: true,
          mapTypeControlOptions: {
            position: window.naver.maps.Position.TOP_LEFT
          }
        };

        const map = new window.naver.maps.Map(mapRef.current, mapOptions);

        // 마커 생성 및 저장
        markersRef.current = MAJOR_CITIES.map(city => {
          const marker = createMarker(map, city, {
            title: city.title,
            clickable: true,
            animation: window.naver.maps.Animation.DROP
          });

          // 마커 클릭 이벤트
          window.naver.maps.Event.addListener(marker, 'click', () => {
            console.log(`${city.title} clicked!`);
            const infowindow = new window.naver.maps.InfoWindow({
              content: `
                <div style="padding: 10px; min-width: 100px; text-align: center;">
                  <h3 style="margin: 0; padding-bottom: 5px;">${city.title}</h3>
                  <p style="margin: 0;">클릭하여 둘러보기</p>
                </div>
              `
            });
            
            infowindow.open(map, marker);
            
            // 3초 후 자동으로 닫기
            setTimeout(() => {
              infowindow.close();
            }, 3000);
          });

          return marker;
        });

        // 지도 클릭 이벤트
        window.naver.maps.Event.addListener(map, 'click', () => {
          markersRef.current.forEach(marker => {
            if (marker.infowindow) {
              marker.infowindow.close();
            }
          });
        });

        return () => {
          // 마커 제거
          markersRef.current.forEach(marker => {
            marker.setMap(null);
          });
          // 지도 제거
          map.destroy();
        };
      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
    };

    initializeMap();
  }, []);

  return <MapContainer ref={mapRef} />;
};

export default KoreaMap;