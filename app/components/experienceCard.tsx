'use client';

import React from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import SafeImage from './safeImage';

// Define types for the component props
interface ExperienceCardProps {
  item: {
    position: string;
    company: string;
    location: string;
    category: string;
    image: string;
    date: string;
    linkText?: string;
    linkURL?: string;
    bullets: string[];
    showMore?: boolean;
  };
  index: number;
  leftMargin: number;
  isExpanded: boolean;
  toggleExpanded: (index: number) => void;
  getCategoryColor: (category: string) => string;
  colors: {
    darkGreen: string;
    mediumGreen: string;
    lightGreen: string;
    darkBrown: string;
    mediumBrown: string;
    lightBrown: string;
    offWhite: string;
    darkText: string;
  };
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  item,
  index,
  leftMargin,
  isExpanded,
  toggleExpanded,
  getCategoryColor,
  colors
}) => {
  return (
    <div
      className="mb-6 relative"
      style={{ 
        marginLeft: `${leftMargin}%`,
        width: `${100 - leftMargin}%`
      }}
    >
      {/* Connecting line to previous card */}
      {index > 0 && (
        <div 
          className="absolute top-0 left-0 w-4 h-4 -mt-6 -ml-2"
          style={{
            borderLeft: `2px dashed ${getCategoryColor(item.category)}`,
            borderBottom: `2px dashed ${getCategoryColor(item.category)}`,
            height: '24px',
            width: '24px'
          }}
        ></div>
      )}
      
      <div
        style={{ 
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
          border: `1px solid ${colors.lightBrown}`,
          borderLeft: `4px solid ${getCategoryColor(item.category)}`,
        }}
        className="p-6 transition-transform hover:shadow-lg"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 flex-shrink-0 rounded overflow-hidden flex items-center justify-center bg-gray-50">
            <SafeImage
              src={item.image || "/api/placeholder/48/48"}
              alt={item.company}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              fallbackSrc="/api/placeholder/40/40"
            />
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-bold" style={{ color: colors.darkBrown }}>
              {item.position}
            </h3>
            <p className="text-lg">{item.company}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <span>{item.location}</span>
              <span>•</span>
              <span>{item.date}</span>
            </div>
          </div>
        </div>
        
        {/* Bullets */}
        <ul className="space-y-2 list-disc pl-5">
          {(isExpanded ? item.bullets : item.bullets.slice(0, 2)).map((bullet, bulletIndex) => (
            <li key={bulletIndex} className="text-gray-700">{bullet}</li>
          ))}
        </ul>
        
        {/* Show More/Less Button */}
        {item.bullets.length > 2 && (
          <button
            onClick={() => toggleExpanded(index)}
            className="mt-4 text-sm font-medium flex items-center"
            style={{ color: getCategoryColor(item.category) }}
          >
            {isExpanded ? (
              <>Show Less <ChevronUp size={16} className="ml-1" /></>
            ) : (
              <>Show More <ChevronDown size={16} className="ml-1" /></>
            )}
          </button>
        )}
        
        {/* Link to Company */}
        {item.linkURL && (
          <a
            href={item.linkURL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm font-medium flex items-center"
            style={{ color: getCategoryColor(item.category) }}
          >
            {item.linkText || item.company} <ArrowUpRight size={14} className="ml-1" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;