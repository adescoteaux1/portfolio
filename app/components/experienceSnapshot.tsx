import React from 'react';
import SafeImage from './safeImage';

interface ExperienceSnapshotProps {
  position: string;
  company: string;
  location: string;
  image?: string;
  date: string;
  category: string;
}

const ExperienceSnapshot: React.FC<ExperienceSnapshotProps> = ({ position, company, location, image, date, category }) => {
  // Color palette - soft greens and browns
  const colors = {
    darkGreen: '#5C6D63',
    mediumGreen: '#8BA888',
    lightGreen: '#C2D6C0',
    darkBrown: '#6D5C50',
    mediumBrown: '#A3917A',
    lightBrown: '#E0D6C8'
  };

  return (
    <div 
      style={{ 
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
        border: `1px solid ${colors.lightBrown}`
      }}
      className="p-4 h-full flex flex-col"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 flex-shrink-0 rounded overflow-hidden">
          <SafeImage
            src={image || "/api/placeholder/48/48"}
            alt={company}
            className="w-full h-full object-cover"
            fallbackSrc="/api/placeholder/48/48"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg" style={{ color: colors.darkBrown }}>
            {position}
          </h3>
          <p className="text-gray-700">{company}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
        <span>{location}</span>
        <span>{date}</span>
      </div>
      
      <div className="mt-auto pt-2">
        <span
          style={{ 
            backgroundColor: colors.lightGreen,
            color: colors.darkGreen 
          }}
          className="px-2 py-1 rounded-full text-xs"
        >
          {category}
        </span>
      </div>
    </div>
  );
};

export default ExperienceSnapshot;