import { useState, useEffect } from 'react';
import { photoSpots, weatherRecommendations } from '../data/photoSpotData.js'

export const usePhotoSpot = (cityId, spotId) => {
  const [currentSpot, setCurrentSpot] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

// 포토스팟 정보 로드
  useEffect(() => {
    if (cityId && spotId) {
      const spot = photoSpots[cityId]?.[spotId];
      if (spot) {
        setCurrentSpot(spot);
      }
    }
    setLoading(false);
  }, [cityId, spotId]);

  // 현재 시간대의 최적 촬영 시간 계산
  const getBestTimeForNow = () => {
    if (!currentSpot) return null;
    
    const now = new Date();
    const currentHour = now.getHours();
    
    return currentSpot.bestSpots.find(spot => 
      spot.bestTimes.some(time => {
        const [start, end] = time.time.split('-');
        const [startHour] = start.split(':').map(Number);
        const [endHour] = end.split(':').map(Number);
        return currentHour >= startHour && currentHour <= endHour;
      })
    );
  };

  // 날씨에 따른 촬영 팁 제공
  const getCurrentWeatherTips = () => {
    if (!weather) return null;
    return weatherRecommendations[weather];
  };

  return {
    spot: currentSpot,
    bestTime: getBestTimeForNow(),
    weatherTips: getCurrentWeatherTips(),
    loading
  };
};