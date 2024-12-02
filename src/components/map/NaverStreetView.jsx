import React, { useEffect, useRef, useState } from 'react';
import { loadNaverMapScript } from '../../api/map/naverMapApi';

const NaverStreetView = ({ location }) => {
  const mapRef = useRef(null);
  const panoInstance = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        if (mapRef.current && panoInstance.current) {
          const container = mapRef.current;
          panoInstance.current.setSize(
            new window.naver.maps.Size(
              container.clientWidth,
              container.clientHeight
            )
          );
        }
      });
    };

    const initPanorama = async () => {
      try {
        setIsLoading(true);
        await loadNaverMapScript();
        
        if (!mapRef.current) return;

        // 파노라마(거리뷰) 생성
        const pano = new window.naver.maps.Panorama(mapRef.current, {
          position: new window.naver.maps.LatLng(location.lat, location.lng),
          pov: {
            pan: 0,
            tilt: 0,
            fov: 100
          },
          flightSpot: true,
          aroundControl: true,
          zoomControl: true
        });

        panoInstance.current = pano;

        // 초기화 후 크기 조정
        window.naver.maps.Event.once(pano, 'init', () => {
          handleResize();
        });

        window.addEventListener('resize', handleResize);

        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize street view:', err);
        setError('거리뷰를 불러오는데 실패했습니다.');
        setIsLoading(false);
      }
    };

    initPanorama();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (panoInstance.current) {
        panoInstance.current.destroy();
      }
    };
  }, [location]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg"
    />
  );
};

export default NaverStreetView;