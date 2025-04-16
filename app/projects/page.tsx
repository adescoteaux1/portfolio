"use client"
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import content from "../content/content";
import SafeImage from '../components/safeImage';
import Layout from '../components/layout';

const ProjectsPage = () => {
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

  // Filter state
  const [filter, setFilter] = useState('all');
  
  // Get unique skills from all projects
  const allSkills = [...new Set(content.projects.flatMap(project => project.skills))].sort();
  
  // Filter projects based on selected filter
  const filteredProjects = filter === 'all' 
    ? content.projects 
    : content.projects.filter(project => project.skills.includes(filter));

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
          <p className="text-xl max-w-3xl">
            A collection of my work in web development, data engineering, and software design. 
            Each project represents both technical challenges and creative solutions.
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
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === 'all'
                  ? `bg-${colors.darkGreen} text-white`
                  : `bg-gray-100 hover:bg-gray-200 text-gray-700`
              }`}
              style={
                filter === 'all'
                  ? { backgroundColor: colors.darkGreen, color: 'white' }
                  : {}
              }
            >
              All Projects
            </button>
            {allSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => setFilter(skill)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filter === skill
                    ? ``
                    : `bg-gray-100 hover:bg-gray-200 text-gray-700`
                }`}
                style={
                  filter === skill
                    ? { backgroundColor: colors.lightGreen, color: colors.darkGreen }
                    : {}
                }
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-600">No projects match the selected filter.</h3>
              <button
                onClick={() => setFilter('all')}
                className="mt-4 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                View All Projects
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.path}
                  style={{ 
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                    border: `1px solid ${colors.lightBrown}`
                  }}
                  className="flex flex-col overflow-hidden transition-transform hover:transform hover:scale-105"
                >
                  <div className="h-48 overflow-hidden">
                    <SafeImage
                      src={project.cardPhoto || "/api/placeholder/400/200"}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      fallbackSrc="/api/placeholder/40/40"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{project.emoji}</span>
                        <h3 className="text-xl font-bold">{project.name}</h3>
                      </div>
                      {project.featured && (
                        <span 
                          style={{ 
                            backgroundColor: colors.darkGreen,
                            color: "white" 
                          }}
                          className="text-xs px-2 py-1 rounded-full ml-2"
                        >
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4 flex-grow">{project.shortDescription}</p>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">{project.dates}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.skills.map((skill, index) => (
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
                    </div>
                    <div className="flex space-x-3 mt-auto">
                      <a
                        href={`/projects/${project.path}`}
                        style={{ 
                          backgroundColor: colors.darkGreen,
                          color: "white"
                        }}
                        className="px-4 py-2 rounded-md text-sm font-medium flex items-center"
                      >
                        View Details <ExternalLink size={14} className="ml-1" />
                      </a>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ 
                            color: colors.darkGreen,
                            border: `1px solid ${colors.darkGreen}`
                          }}
                          className="p-2 rounded-md text-sm font-medium flex items-center"
                          aria-label="GitHub Repository"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                        </a>
                      )}
                      {project.url && project.deployed && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ 
                            color: colors.darkGreen,
                            border: `1px solid ${colors.darkGreen}`
                          }}
                          className="px-4 py-2 rounded-md text-sm font-medium flex items-center"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Project Highlight */}
      {content.projects.filter(p => p.featured).length > 0 && (
        <section 
          style={{ 
            backgroundColor: colors.lightBrown,
            borderTop: `8px solid ${colors.mediumBrown}`,
            borderBottom: `8px solid ${colors.mediumBrown}`
          }}
          className="py-16"
        >
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-2">Featured Project Spotlight</h2>
            <div 
              style={{ backgroundColor: colors.darkBrown, height: "4px", width: "60px" }}
              className="mb-12"
            ></div>
            
            {content.projects.filter(p => p.featured)[0] && (
              <div className="md:flex gap-8">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  {content.projects.filter(p => p.featured)[0].coverPhotos && 
                   (content.projects.filter(p => p.featured)[0].coverPhotos ?? []).length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <SafeImage
                      src={
                        content.projects.filter(p => p.featured)[0]?.coverPhotos?.[0] || 
                        "/api/placeholder/600/400"
                      }
                      alt={content.projects.filter(p => p.featured)[0]?.name || "Placeholder"}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  ) : (
                    <SafeImage
                      src={content.projects.filter(p => p.featured)[0].cardPhoto || "/api/placeholder/600/400"}
                      alt={content.projects.filter(p => p.featured)[0].name}
                      className="w-full h-auto rounded-lg shadow-lg"
                      fallbackSrc="/api/placeholder/40/40"
                    />
                  )}
                </div>
                <div className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{content.projects.filter(p => p.featured)[0].emoji}</span>
                    <h3 className="text-2xl font-bold">{content.projects.filter(p => p.featured)[0].name}</h3>
                  </div>
                  <div className="mb-6">
                    <span 
                      style={{ 
                        backgroundColor: colors.darkGreen,
                        color: "white" 
                      }}
                      className="px-3 py-1 text-sm rounded-full"
                    >
                      Featured Project
                    </span>
                    <span className="text-gray-600 ml-3">{content.projects.filter(p => p.featured)[0].dates}</span>
                  </div>
                  <div className="prose prose-lg max-w-none mb-6">
                    <p>{content.projects.filter(p => p.featured)[0].longDescription}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {content.projects.filter(p => p.featured)[0].skills.map((skill, index) => (
                      <span
                        key={index}
                        style={{ 
                          backgroundColor: colors.mediumGreen,
                          color: "white"
                        }}
                        className="px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={`/projects/${content.projects.filter(p => p.featured)[0].path}`}
                      style={{ 
                        backgroundColor: colors.darkBrown,
                        color: "white"
                      }}
                      className="px-6 py-3 rounded-md font-medium flex items-center"
                    >
                      View Project Details <ExternalLink size={18} className="ml-2" />
                    </a>
                    {content.projects.filter(p => p.featured)[0].github && (
                      <a
                        href={content.projects.filter(p => p.featured)[0].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ 
                          color: colors.darkBrown,
                          border: `2px solid ${colors.darkBrown}`
                        }}
                        className="px-6 py-3 rounded-md font-medium flex items-center"
                      >
                        View Code
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Contact CTA */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Interested in working together?</h2>
          <p className="text-lg mb-8">
            I&apos;m always open to discussing new projects, work opportunities or potential collaborations.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/contact"
              style={{ backgroundColor: colors.darkBrown, color: "white" }}
              className="px-6 py-3 rounded-md font-medium"
            >
              Get in Touch
            </a>
            <a 
              href="/resume"
              style={{ 
                backgroundColor: "transparent", 
                color: colors.darkBrown,
                border: `2px solid ${colors.darkBrown}`
              }}
              className="px-6 py-3 rounded-md font-medium"
            >
              View Resume
            </a>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default ProjectsPage;