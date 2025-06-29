'use client';

import React, { useState } from 'react';
import content from "../content/content";
import ExperienceCard from '../components/experienceCard';
import Layout from '../components/layout';

const ExperiencePage: React.FC = () => {
  // Color palette - soft greens and browns
  const colors = {
    darkGreen: '#5C6D63',
    mediumGreen: '#8BA888',
    lightGreen: '#C2D6C0',
    darkBrown: '#6D5C50',
    mediumBrown: '#A3917A',
    lightBrown: '#E0D6C8',
    offWhite: '#F8F7F4',
    darkText: '#333333'
  };

  // Function to get color based on category
  const getCategoryColor = (category: string) => {
    const categoryColors = {
      'Work Experience': colors.darkGreen,
      'Academics': colors.mediumGreen,
      'Campus Experience': colors.lightGreen,
      'Projects': colors.darkBrown,
      'Volunteer': colors.mediumBrown,
    };
    
    // If category exists in mapping, return its color, otherwise use default
    return categoryColors[category as keyof typeof categoryColors] || colors.darkGreen;
  };

  // State to track which experience items are expanded
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  // Filter state
  const [filter, setFilter] = useState('all');

  // Get unique categories from all experience
  const categories = [...new Set(content.experience.map(item => item.category))];

  // Toggle expanded state for an experience item
  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const filteredExperience = filter === 'all'
    ? content.experience
    : content.experience.filter(item => item.category === filter);

  return (
    <Layout>
      <div style={{ backgroundColor: colors.offWhite, color: colors.darkText }}>
        {/* Header */}
        <section 
          style={{ 
            backgroundColor: colors.lightGreen,
            borderBottom: `8px solid ${colors.mediumGreen}`
          }} 
          className="py-16"
        >
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience</h1>
            <p className="text-xl max-w-3xl">
              My professional journey including work experience, academic achievements, and campus involvement.
            </p>
          </div>
        </section>
        
        {/* Diagonal Cascading Experience Section */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6">
            {/* Category color key */}
            <div className="mb-8 flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <div 
                  key={category}
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                  onClick={() => setFilter(category === filter ? 'all' : category)}
                  style={{ 
                    backgroundColor: filter === category || filter === 'all' ? getCategoryColor(category) : '#f3f4f6',
                    color: filter === category || filter === 'all' ? 'white' : '#4b5563',
                    cursor: 'pointer'
                  }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'white' }}></div>
                  {category}
                </div>
              ))}
              {filter !== 'all' && (
                <div 
                  className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700 cursor-pointer"
                  onClick={() => setFilter('all')}
                >
                  Clear Filter
                </div>
              )}
            </div>

            {/* Diagonal cascading layout */}
            <div className="flex flex-col">
              {filteredExperience.map((item, index) => {
                // Calculate left margin percentage - starts at 0% and increases by 5% each item
                // Capped at 50% to keep it in view
                const leftMargin = Math.min(index * 5, 50);
                
                return (
                  <ExperienceCard
                    key={index}
                    item={item}
                    index={index}
                    leftMargin={leftMargin}
                    isExpanded={!!expandedItems[index]}
                    toggleExpanded={toggleExpanded}
                    getCategoryColor={getCategoryColor}
                    colors={colors}
                  />
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section 
          style={{ 
            backgroundColor: colors.lightBrown,
            borderTop: `8px solid ${colors.mediumBrown}`,
            borderBottom: `8px solid ${colors.mediumBrown}`
          }}
          className="py-16"
        >
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-2">Skills Gained</h2>
            <div 
              style={{ backgroundColor: colors.darkBrown, height: "4px", width: "60px" }}
              className="mb-12"
            ></div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  category: "Technical Skills",
                  skills: [
                    "Full-Stack Web and Mobile Development",
                    "Data Engineering & Analysis",
                    "Database Design & Management",
                    "DevOps & Automation",
                    "Software Testing & Quality Assurance",
                    "Version Control (Git)",
                  ]
                },
                {
                  category: "Soft Skills",
                  skills: [
                    "Team Leadership",
                    "Project Management",
                    "Problem Solving",
                    "Technical Communication",
                    "Code Review",
                    "Time Management"
                  ]
                },
                {
                  category: "Domain Knowledge",
                  skills: [
                    "Carbon Accounting",
                    "Sustainability Metrics",
                    "Risk Analysis & Management",
                    "Financial Data Systems",
                    "Educational Technology",
                    "Enterprise Software Systems"
                  ]
                }
              ].map((category, index) => (
                <div
                  key={index}
                  style={{ 
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                    border: `1px solid ${colors.lightBrown}`
                  }}
                  className="p-6"
                >
                  <h3 className="text-xl font-bold mb-4" style={{ color: colors.darkBrown }}>
                    {category.category}
                  </h3>
                  <ul className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-start">
                        <div
                          style={{ 
                            backgroundColor: colors.lightGreen,
                            minWidth: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            marginTop: "8px",
                            marginRight: "10px"
                          }}
                        ></div>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ExperiencePage;