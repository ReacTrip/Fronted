import React, { useEffect, useRef, useState } from 'react';
import { loadNaverMapScript, getPhotoSpots, createPhotoSpotMarker } from '../../api/map/naverMapApi';

const NaverStreetView = ({ location, onSpotSelect }) => {
  const mapRef = useRef(null);
  const panoInstance = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSpot, setCurrentSpot] = useState(null);

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

        // 현재 위치의 포토스팟 정보 표시
        if (location.city) {
          const nearbySpots = getPhotoSpots(location.city);
          nearbySpots.forEach(spot => {
            const marker = createPhotoSpotMarker(panoInstance.current, spot);
            window.naver.maps.Event.addListener(marker, 'click', () => {
              setCurrentSpot(spot);
              if (panoInstance.current) {
                panoInstance.current.setPosition(
                  new window.naver.maps.LatLng(spot.viewingSpot.lat, spot.viewingSpot.lng)
                );
              }
              if (onSpotSelect) {
                onSpotSelect(spot);
              }
            });
          });
        }

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
  }, [location, onSpotSelect]);

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <p>거리뷰를 불러오는 중...</p>
      </div>
    );
  }

  // 에러 상태 표시
  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // 포토스팟 상세 정보 표시
  if (currentSpot) {
    return (
      <div className="relative w-full h-full">
        <div ref={mapRef} className="w-full h-full rounded-lg" />
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
          <h3 className="text-lg font-bold mb-2">{currentSpot.title}</h3>
          <p className="text-sm mb-1">📸 추천 시간: {currentSpot.bestTime.join(', ')}</p>
          <p className="text-sm">{currentSpot.tips}</p>
        </div>
      </div>
    );
  }

  // 기본 거리뷰 표시
  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg"
    />
  );
};

export default NaverStreetView;