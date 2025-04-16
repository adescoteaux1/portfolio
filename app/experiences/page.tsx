import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';
import content from "../content/content";
import SafeImage from '../components/safeImage';
import Layout from '../components/layout';

const ExperiencePage = () => {
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

  // Filter experience items based on selected filter
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
      
      {/* Filter Section */}
      <section className="py-8 bg-white border-b" style={{ borderColor: colors.lightBrown }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-medium mr-2">Filter by:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm transition-colors`}
              style={
                filter === 'all'
                  ? { backgroundColor: colors.darkGreen, color: 'white' }
                  : { backgroundColor: '#f3f4f6' }
              }
            >
              All Experience
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors`}
                style={
                  filter === category
                    ? { backgroundColor: colors.lightGreen, color: colors.darkGreen }
                    : { backgroundColor: '#f3f4f6' }
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative">
            {/* Timeline line */}
            <div 
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px transform md:-translate-x-1/2"
              style={{ backgroundColor: colors.mediumGreen }}
            ></div>
            
            {/* Experience Items */}
            <div className="relative z-10">
              {filteredExperience.map((item, index) => (
                <div 
                  key={index}
                  className={`mb-12 md:mb-0 md:pb-12 relative ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-auto md:mr-1/2' : 'md:pl-12 md:ml-1/2'
                  }`}
                  style={{ maxWidth: '50%' }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute md:left-0 left-0 top-0 w-6 h-6 rounded-full md:transform md:-translate-x-1/2"
                    style={{ 
                      backgroundColor: colors.darkGreen,
                      border: `2px solid ${colors.lightGreen}`,
                      [index % 2 === 0 ? 'right' : 'left']: '-3px',
                      display: 'none'  // Hide on mobile
                    }}
                  ></div>
                  
                  {/* Content Card */}
                  <div
                    style={{ 
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                      border: `1px solid ${colors.lightBrown}`
                    }}
                    className="p-6 ml-8 md:ml-0"
                  >
                    {/* Mobile timeline dot */}
                    <div
                      className="absolute left-0 top-6 w-6 h-6 rounded-full md:hidden"
                      style={{ 
                        backgroundColor: colors.darkGreen,
                        border: `2px solid ${colors.lightGreen}`
                      }}
                    ></div>
                    
                    {/* Content */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 flex-shrink-0 rounded overflow-hidden">
                        <SafeImage
                          src={item.image || "/api/placeholder/48/48"}
                          alt={item.company}
                          className="w-full h-full object-cover"
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
                      {(expandedItems[index] ? item.bullets : item.bullets.slice(0, 2)).map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-gray-700">{bullet}</li>
                      ))}
                    </ul>
                    
                    {/* Show More/Less Button */}
                    {item.bullets.length > 2 && (
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="mt-4 text-sm font-medium flex items-center"
                        style={{ color: colors.darkGreen }}
                      >
                        {expandedItems[index] ? (
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
                        style={{ color: colors.darkGreen }}
                      >
                        {item.linkText || item.company} <ArrowUpRight size={14} className="ml-1" />
                      </a>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        style={{ 
                          backgroundColor: colors.lightGreen,
                          color: colors.darkGreen 
                        }}
                        className="px-2 py-1 rounded-full text-xs"
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                  "Full-Stack Web Development",
                  "Data Engineering & Analysis",
                  "Database Design & Management",
                  "DevOps & Automation",
                  "Software Testing & Quality Assurance",
                  "Version Control (Git)"
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
      
      {/* Resume Download */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Want to see the full picture?</h2>
          <p className="text-lg mb-8">
            Download my complete resume for a comprehensive overview of my experience, 
            education, and skills.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/resume.pdf"
              target="_blank"
              style={{ backgroundColor: colors.darkBrown, color: "white" }}
              className="px-6 py-3 rounded-md font-medium flex items-center justify-center"
            >
              Download Resume
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
            <a 
              href="/contact"
              style={{ 
                backgroundColor: "transparent", 
                color: colors.darkBrown,
                border: `2px solid ${colors.darkBrown}`
              }}
              className="px-6 py-3 rounded-md font-medium"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default ExperiencePage;