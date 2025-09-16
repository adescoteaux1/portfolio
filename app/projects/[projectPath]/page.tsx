'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import content from '../../content/content';
import SafeImage from '../../components/safeImage';
import Layout from '../../components/layout';

const ProjectDetail = () => {
  const params = useParams();
  const projectPath = params.projectPath;
  
  // Find the project with the matching path
  const project = content.projects.find(p => p.path === projectPath);
  
  // State for image carousel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
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
  
  // Function to navigate to next image
  const nextImage = useCallback(() => {
    if (!project?.coverPhotos || project.coverPhotos.length <= 1) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === (project.coverPhotos?.length ?? 0) - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 300);
  }, [project]);
  
  const prevImage = useCallback(() => {
    if (!project?.coverPhotos || project.coverPhotos.length <= 1) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? (project.coverPhotos?.length ?? 0) - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 300);
  }, [project]);
  
  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (!project?.coverPhotos || project.coverPhotos.length <= 1 || isTransitioning) return;
    
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [project, isTransitioning, nextImage]);
  
  // If project not found, show error message
  if (!project) {
    return (
      <Layout>
        <div className="py-16 text-center">
          <h1 className="text-3xl font-bold mb-6">Project Not Found</h1>
          <p className="mb-8">Sorry, we couldn&apos;t find the project you&apos;re looking for.</p>
          <Link 
            href="/projects"
            className="inline-flex items-center px-6 py-3 rounded-md font-medium"
            style={{ backgroundColor: colors.darkGreen, color: 'white' }}
          >
            <ArrowLeft size={18} className="mr-2" /> Back to Projects
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Prepare gallery images array
  const galleryImages = project.coverPhotos && project.coverPhotos.length > 0 
    ? project.coverPhotos 
    : [project.cardPhoto];
  
  return (
    <Layout>
      <div>
        {/* Project Header */}
        <div className="mb-12">
          <Link 
            href="/projects"
            className="inline-flex items-center mb-8 text-gray-600 hover:text-gray-900 transition-colors hover:underline cursor-pointer"
          >
            <ArrowLeft size={18} className="mr-2" /> Back to Projects
          </Link>
          
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-3">{project.emoji}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ color: colors.darkBrown }}>{project.name}</h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-gray-600">{project.dates}</span>
            {project.deployed && (
              <span 
                style={{ 
                  backgroundColor: colors.mediumGreen,
                  color: "white" 
                }}
                className="px-3 py-1 text-sm rounded-full"
              >
                Deployed
              </span>
            )}
            {project.featured && (
              <span 
                style={{ 
                  backgroundColor: colors.darkGreen,
                  color: "white" 
                }}
                className="px-3 py-1 text-sm rounded-full"
              >
                Featured Project
              </span>
            )}
          </div>
        </div>
        
        {/* Project Hero Image */}
        <div className="mb-12">
          <div 
            style={{ 
              padding: "6px",
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${colors.lightGreen}, ${colors.mediumGreen})`,
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)"
            }}
            className="p-1"
          >
            <div className="rounded-lg overflow-hidden border-4 flex justify-center" style={{ borderColor: "white" }}>
              <SafeImage
                src={project.cardPhoto || "/api/placeholder/1200/600"}
                alt={project.name}
                className="w-full h-auto max-h-[500px] object-contain"
                fallbackSrc="/api/placeholder/1200/600"
              />
            </div>
          </div>
        </div>
        
        {/* Project Details */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Project Overview */}
          <div className="flex-grow order-2 md:order-1 w-full">
            <div 
              style={{ 
                backgroundColor: "white",
                borderRadius: "8px",
                border: `1px solid ${colors.lightBrown}`,
                padding: "24px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
              }}
              className="w-full"
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.darkBrown }}>
                Overview
              </h2>
              <div className="prose prose-lg w-full max-w-none text-gray-700">
                <p className="mb-6">{project.longDescription}</p>
                
                {/* Project Details Content */}
                <div className="w-full">
                  {project.details}
                </div>
                
                {/* Future Plans (if any) */}
                {project.future && (
                  <>
                    <h3 className="text-xl font-bold mt-8 mb-4">
                      Future Plans
                    </h3>
                    <div className="w-full">
                      {project.future}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="w-full md:w-80 flex-shrink-0 order-1 md:order-2">
            {/* Project Links */}
            <div 
              style={{ 
                backgroundColor: "white",
                borderRadius: "8px",
                border: `1px solid ${colors.lightBrown}`,
                padding: "20px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                marginBottom: "24px"
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.darkBrown }}>
                Project Links
              </h3>
              <div className="space-y-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center py-2 px-4 rounded-md transition-colors w-full hover:opacity-80"
                    style={{ 
                      border: `1px solid ${colors.darkGreen}`,
                      color: colors.darkGreen 
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    GitHub Repository
                  </a>
                )}
                {project.url && project.deployed && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center py-2 px-4 rounded-md transition-colors w-full hover:brightness-110"
                    style={{ 
                      backgroundColor: colors.darkGreen,
                      color: "white" 
                    }}
                  >
                    <ExternalLink size={20} className="mr-2" />
                    View Live Project
                  </a>
                )}
                {project.presentation && (
                  <a
                    href={project.presentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center py-2 px-4 rounded-md transition-colors w-full hover:brightness-110"
                    style={{ 
                      backgroundColor: colors.darkGreen,
                      color: "white" 
                    }}
                  >
                    <ExternalLink size={20} className="mr-2" />
                    View Presentation
                  </a>
                )}
              </div>
            </div>
            
            {/* Technologies */}
            <div 
              style={{ 
                backgroundColor: "white",
                borderRadius: "8px",
                border: `1px solid ${colors.lightBrown}`,
                padding: "20px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                marginBottom: "24px"
              }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.darkBrown }}>
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <span
                    key={index}
                    style={{ 
                      backgroundColor: colors.lightGreen,
                      color: colors.darkGreen
                    }}
                    className="px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Image Carousel */}
            {galleryImages.length > 0 && (
              <div 
                style={{ 
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: `1px solid ${colors.lightBrown}`,
                  padding: "20px",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)"
                }}
              >
                <h3 className="text-lg font-bold mb-4" style={{ color: colors.darkBrown }}>
                  Project Gallery
                </h3>
                <div className="relative">
                  {/* Image container with fixed dimensions */}
                  <div 
                    className="rounded-lg overflow-hidden relative bg-gray-100"
                    style={{ 
                      height: "220px",  // Fixed height
                      width: "100%"     // Full width of container
                    }}
                  >
                    {galleryImages.map((photo, index) => (
                      <div 
                        key={index} 
                        style={{
                          opacity: index === currentImageIndex ? (isTransitioning ? 0.5 : 1) : 0,
                          transition: 'opacity 0.3s ease-in-out',
                          zIndex: index === currentImageIndex ? 10 : 0
                        }}
                        className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                      >
                        <SafeImage
                          src={photo}
                          alt={`${project.name} screenshot ${index + 1}`}
                          className="max-w-full max-h-full w-auto h-auto object-contain"
                          fallbackSrc="/api/placeholder/600/400"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Navigation arrows */}
                  {galleryImages.length > 1 && (
                    <>
                      <button 
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition-colors"
                        onClick={prevImage}
                        aria-label="Previous image"
                        disabled={isTransitioning}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition-colors"
                        onClick={nextImage}
                        aria-label="Next image"
                        disabled={isTransitioning}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                  
                  {/* Image indicators */}
                  {galleryImages.length > 1 && (
                    <div className="flex justify-center mt-3 space-x-2">
                      {galleryImages.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentImageIndex 
                              ? 'bg-gray-800' 
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          onClick={() => {
                            if (!isTransitioning) {
                              setIsTransitioning(true);
                              setTimeout(() => {
                                setCurrentImageIndex(index);
                                setIsTransitioning(false);
                              }, 300);
                            }
                          }}
                          disabled={isTransitioning}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigate to Other Projects */}
        <div className="mt-12 py-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.darkBrown }}>
            Other Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.projects
              .filter(p => p.path !== project.path)
              .slice(0, 3)
              .map((otherProject) => (
                <Link
                  key={otherProject.path}
                  href={`/projects/${otherProject.path}`}
                  style={{ 
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: `1px solid ${colors.lightBrown}`,
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  className="flex flex-col hover:shadow-md hover:scale-105"
                >
                  <div className="h-40 overflow-hidden">
                    <SafeImage
                      src={otherProject.cardPhoto || "/api/placeholder/400/200"}
                      alt={otherProject.name}
                      className="w-full h-full object-cover"
                      fallbackSrc="/api/placeholder/400/200"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">{otherProject.emoji}</span>
                      <h3 className="font-bold" style={{ color: colors.lightBrown }}>{otherProject.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;