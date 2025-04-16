import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import SafeImage from './safeImage';

interface Project {
  cardPhoto?: string;
  name: string;
  emoji: string;
  shortDescription: string;
  skills: string[];
  path: string;
}

const ProjectFeature: React.FC<{ project: Project }> = ({ project }) => {
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
      className="flex flex-col h-full overflow-hidden"
    >
      <div className="h-48 overflow-hidden">
        <SafeImage
          src={project.cardPhoto || "/api/placeholder/400/200"}
          alt={project.name}
          className="w-full h-full object-cover"
          fallbackSrc="/api/placeholder/400/200"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{project.emoji}</span>
          <h3 className="text-lg font-bold">{project.name}</h3>
        </div>
        <p className="text-gray-600 mb-4 flex-grow line-clamp-2">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              style={{ 
                backgroundColor: colors.lightGreen,
                color: colors.darkGreen
              }}
              className="px-2 py-1 rounded-full text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          <Link
            href={`/projects/${project.path}`}
            style={{ 
              backgroundColor: colors.darkGreen,
              color: "white"
            }}
            className="px-4 py-2 rounded-md text-sm font-medium inline-flex items-center"
          >
            View Details <ExternalLink size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectFeature;