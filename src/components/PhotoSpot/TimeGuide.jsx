import React from 'react';
import { Sun, Cloud, CloudRain, Clock } from 'lucide-react';

const TimeGuide = ({ timeInfo, weatherTips }) => {
  const isCurrentlyRecommended = () => {
    if (!timeInfo?.bestTimes) return false;
    
    const now = new Date();
    const currentHour = now.getHours();
    
    return timeInfo.bestTimes.some(time => {
      const [startTime, endTime] = time.time.split('-');
      const [startHour] = startTime.split(':').map(Number);
      const [endHour] = endTime.split(':').map(Number);
      return currentHour >= startHour && currentHour <= endHour;
    });
  };

  const getWeatherIcon = () => {
    if (!weatherTips) return <Sun className="w-6 h-6 text-yellow-500" />;
    
    switch (weatherTips.condition) {
      case 'sunny': return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-6 h-6 text-blue-500" />;
      default: return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Clock className="w-6 h-6" />
        <div>
          <h4 className="font-medium">
            {isCurrentlyRecommended() 
              ? "지금이 촬영하기 좋은 시간이에요!" 
              : "다음 추천 시간을 확인해보세요"}
          </h4>
        </div>
      </div>

      {timeInfo?.bestTimes && (
        <div className="grid gap-3">
          {timeInfo.bestTimes.map((time, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{time.time}</p>
                  <p className="text-sm text-gray-600 mt-1">{time.reason}</p>
                </div>
                {isCurrentlyRecommended() && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    현재 시간대
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {weatherTips && (
        <div className="p-4 border rounded-lg shadow-sm mt-4">
          <div className="flex items-start gap-3">
            {getWeatherIcon()}
            <div>
              <h4 className="font-medium">날씨 팁</h4>
              <ul className="text-sm text-gray-600 mt-2 space-y-2">
                {weatherTips.tips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeGuide;