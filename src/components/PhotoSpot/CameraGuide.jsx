import React from 'react';
import { Aperture, Timer, Zap, Camera } from 'lucide-react';

const CameraGuide = ({ settings }) => {
  if (!settings) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <Aperture className="w-5 h-5" />
            <div>
              <p className="text-sm text-gray-600">조리개</p>
              <p className="font-medium">f/{settings.aperture}</p>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            <div>
              <p className="text-sm text-gray-600">셔터스피드</p>
              <p className="font-medium">{settings.shutterSpeed}</p>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <div>
              <p className="text-sm text-gray-600">ISO</p>
              <p className="font-medium">{settings.iso}</p>
            </div>
          </div>
        </div>
      </div>

      {settings.tips && (
        <div className="p-4 border rounded-lg shadow-sm">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Camera className="w-5 h-5" />
            촬영 팁
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            {settings.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span>•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CameraGuide;