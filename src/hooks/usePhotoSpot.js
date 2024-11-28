import { useState, useEffect } from 'react';
import { photoSpots, weatherRecommendations } from '../data/photoSpotData.js'

export const usePhotoSpot = (cityId, spotId) => {
  const [currentSpot, setCurrentSpot] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cityId && spotId) {
      const spot = photoSpots[cityId]?.[spotId];
      if (spot) {
        setCurrentSpot(spot);
      }
    }
    setLoading(false);
  }, [cityId, spotId]);

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