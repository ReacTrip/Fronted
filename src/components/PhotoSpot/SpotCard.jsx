import React from 'react';
import { Camera, Clock } from 'lucide-react';

const SpotCard = ({ spot, isCurrentlyBest }) => {
  return (
    <div className={`p-6 border rounded-lg shadow-sm ${isCurrentlyBest ? 'border-blue-500 border-2' : ''}`}>
      <div className="flex items-center gap-2 mb-4">
        <Camera className="w-5 h-5" />
        <h3 className="text-lg font-semibold">{spot.name}</h3>
      </div>

      {/* 베스트 타임 정보 */}
      <div className="mb-4">
        <h4 className="font-medium flex items-center gap-2">
          <Clock className="w-4 h-4" />
          베스트 타임
        </h4>
        {spot.bestTimes.map((time, index) => (
          <div key={index} className="mt-2 text-sm">
            <p className="text-gray-700">{time.time}</p>
            <p className="text-gray-500 text-sm">{time.reason}</p>
          </div>
        ))}
      </div>

      {/* 카메라 설정 */}
      <div className="mb-4">
        <h4 className="font-medium">카메라 설정</h4>
        <div className="mt-2 text-sm grid grid-cols-3 gap-2">
          <div className="text-gray-600">f/{spot.cameraSettings.aperture}</div>
          <div className="text-gray-600">{spot.cameraSettings.shutterSpeed}</div>
          <div className="text-gray-600">ISO {spot.cameraSettings.iso}</div>
        </div>
      </div>

      {/* 포즈 가이드 */}
      <div>
        <h4 className="font-medium mb-2">추천 포즈</h4>
        {spot.poses.map((pose, index) => (
          <div key={index} className="text-sm mb-2">
            <p className="font-medium">{pose.name}</p>
            <p className="text-gray-500">{pose.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotCard;