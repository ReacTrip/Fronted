import React from "react";
import { User } from "lucide-react";

const PoseGuide = ({ poses }) => {
  if (!poses || poses.length === 0) return null;

  return (
    <div className="space-y-4">
      {poses.map((pose, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-sm">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 mt-1" />
            <div>
              <h4 className="font-medium">{pose.name}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {pose.description}
              </p>
              {pose.tip && (
                <p className="text-sm text-blue-600 mt-2">
                  <span className="font-medium">Tip:</span> {pose.tip}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PoseGuide;