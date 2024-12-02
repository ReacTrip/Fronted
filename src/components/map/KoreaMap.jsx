import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infowindowsRef = useRef([]);

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

        // 마커와 정보창 생성
        MAJOR_CITIES.forEach((city, index) => {
          const marker = createMarker(map, city, {
            title: city.title,
            clickable: true,
            animation: window.naver.maps.Animation.DROP
          });

          // 정보창 생성 - 스타일 개선
          const infowindow = new window.naver.maps.InfoWindow({
            content: `
              <div style="
                padding: 15px 20px;
                min-width: 180px;
                text-align: center;
                cursor: pointer;
                font-family: 'Pretendard', sans-serif;
                transition: background-color 0.3s;
              ">
                <h3 style="
                  margin: 0;
                  padding-bottom: 8px;
                  font-size: 18px;
                  color: #2196F3;
                  font-weight: 600;
                ">${city.title}</h3>
                <div style="
                  margin: 8px 0;
                  width: 30px;
                  height: 2px;
                  background: linear-gradient(90deg, #2196F3, #21CBF3);
                  display: inline-block;
                "></div>
                <p style="
                  margin: 0;
                  color: #666;
                  font-size: 14px;
                  font-weight: 500;
                ">클릭하여 둘러보기</p>
              </div>
            `,
            borderWidth: 0,
            disableAnchor: true,
            backgroundColor: "white",
            borderRadius: "12px",
            pixelOffset: new window.naver.maps.Point(0, -10),
            cssStyle: {
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            }
          });

          // 마커 클릭 이벤트
          window.naver.maps.Event.addListener(marker, 'click', () => {
            // 다른 모든 정보창 닫기
            infowindowsRef.current.forEach(iw => iw.close());
            
            // 현재 정보창 열기
            infowindow.open(map, marker);
            
            // 정보창 클릭 이벤트 및 호버 효과
            const infoElement = infowindow.getContentElement();
            if (infoElement) {
              // 호버 효과 추가
              infoElement.onmouseover = () => {
                infoElement.style.backgroundColor = '#f8f9fa';
              };
              infoElement.onmouseout = () => {
                infoElement.style.backgroundColor = 'white';
              };
              // 클릭 이벤트
              infoElement.onclick = () => {
                navigate('/city', { state: { cityName: city.title } });
              };
            }

            // 6초 후 자동으로 닫기
            setTimeout(() => {
              infowindow.close();
            }, 6000);
          });

          markersRef.current.push(marker);
          infowindowsRef.current.push(infowindow);
        });

        // 지도 클릭 이벤트
        window.naver.maps.Event.addListener(map, 'click', () => {
          infowindowsRef.current.forEach(infowindow => {
            infowindow.close();
          });
        });

        return () => {
          infowindowsRef.current.forEach(infowindow => {
            infowindow.close();
          });
          markersRef.current.forEach(marker => {
            marker.setMap(null);
          });
          map.destroy();
        };
      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
    };

    initializeMap();
  }, [navigate]);

  return <MapContainer ref={mapRef} />;
};

export default KoreaMap;