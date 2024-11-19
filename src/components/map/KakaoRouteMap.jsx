// src/components/map/KakaoRouteMap.jsx
import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const MapContainer = styled(Box)({
  width: '100%',
  height: '100%',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
});

const KakaoRouteMap = ({ routeData }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.naver) {
      console.error('Naver Maps API is not loaded');
      return;
    }

    const mapOptions = {
      center: new window.naver.maps.LatLng(
        routeData.routes[0].summary.origin.y,
        routeData.routes[0].summary.origin.x
      ),
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new window.naver.maps.Map(mapRef.current, mapOptions);

    // 경로 표시
    routeData.routes[0].sections.forEach((section) => {
      section.roads.forEach((road) => {
        const path = [];
        for (let i = 0; i < road.vertexes.length; i += 2) {
          path.push(
            new window.naver.maps.LatLng(road.vertexes[i + 1], road.vertexes[i])
          );
        }

        // Polyline 생성
        new window.naver.maps.Polyline({
          map: map,
          path: path,
          strokeColor: '#000000', // 경로 색상
          strokeWeight: 4, // 경로 두께
          strokeOpacity: 0.8, // 경로 투명도
        });
      });
    });

    // 마커 추가 (출발지, 경유지, 목적지)
    const addMarker = (x, y, title) => {
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(y, x),
        map: map,
        title: title,
      });
    };

    // 출발지
    const origin = routeData.routes[0].summary.origin;
    addMarker(origin.x, origin.y, '출발지');

    // 경유지
    routeData.routes[0].summary.waypoints.forEach((waypoint) => {
      addMarker(waypoint.x, waypoint.y, '경유지');
    });

    // 목적지
    const destination = routeData.routes[0].summary.destination;
    addMarker(destination.x, destination.y, '목적지');

    return () => {
      // Cleanup
      map.destroy();
    };
  }, [routeData]);

  return <MapContainer ref={mapRef} />;
};

export default KakaoRouteMap;
