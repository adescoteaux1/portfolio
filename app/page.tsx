"use client"
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects, Project } from './content/projects';
import { experience } from './content/experience';
import ExperienceSnapshot from './components/experienceSnapshot';
import ProjectFeature from './components/projectFeature';
import SafeImage from './components/safeImage';
import Layout from './components/layout';

const HomePage = () => {
  // Color palette - soft greens and browns
  const colors = {
    darkGreen: '#5C6D63',
    mediumGreen: '#8BA888',
    lightGreen: '#C2D6C0',
    darkBrown: '#6D5C50',
    mediumBrown: '#A3917A',
    lightBrown: '#E0D6C8'
  };

  // Filter for current experiences and featured projects
  const currentExperiences = experience.filter(exp => exp.date.includes('Present')).slice(0, 2);
  const featuredProjects = projects.filter(project => project.featured).slice(0, 2);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 md:py-32 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
        <div className="md:w-1/2 order-2 md:order-1">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            <span style={{ color: colors.darkGreen }}>Hi, I&apos;m Ally!</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-700">
            I&apos;m a student and aspiring software engineer with a passion for solving complex problems and creating innovative solutions. My love for mathematics and puzzles led me to computer science, where I enjoy applying analytical thinking to real-world challenges.
          </p>
          <div className="flex flex-wrap gap-4">
          <Link href="/about">
            <button
              style={{
                backgroundColor: "transparent",
                color: colors.darkBrown,
                border: `2px solid ${colors.darkBrown}`,
                transition: "all 0.3s ease"
              }}
              className="px-6 py-3 rounded-md font-medium hover:bg-opacity-10 hover:bg-gray-300 hover:scale-105"
            >
              About me...
            </button>
          </Link>
            <Link href="/projects">
              <button
                style={{
                  backgroundColor: colors.darkGreen,
                  color: "white",
                  transition: "all 0.3s ease"
                }}
                className="px-6 py-3 rounded-md font-medium flex items-center hover:shadow-lg hover:brightness-110 hover:scale-105"
              >
                See My Work <ArrowRight size={18} className="ml-2" />
              </button>
            </Link>
          </div>
        </div>
        
        <div className="md:w-1/2 order-1 md:order-2 flex justify-center">
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.lightGreen}, ${colors.mediumGreen})`,
              padding: "32px",
              borderRadius: "16px",
              position: "relative",
              overflow: "hidden",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
            }}
            className="shadow-lg"
          >
            {/* Decorative elements */}
            <div
              style={{
                position: "absolute",
                top: "-80px",
                right: "-80px",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                backgroundColor: colors.darkGreen,
                opacity: "0.2"
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: "-60px",
                left: "-60px",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                backgroundColor: colors.lightBrown,
                opacity: "0.3"
              }}
            ></div>
            
            {/* Additional decorative element */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "10%",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: `3px solid ${colors.darkBrown}`,
                opacity: "0.15"
              }}
            ></div>
            
            <SafeImage
              src="/HomeProfile.png"
              alt="Profile"
              className="rounded-lg relative z-10 w-full max-w-[600px]"  // Control width with CSS
              fallbackSrc="/api/placeholder/450/450"
            />
          </div>
        </div>
      </section>
      
      {/* Divider with skills */}
      <div 
        style={{ 
          backgroundColor: colors.lightBrown,
          borderRadius: "8px"
        }}
        className="p-8 my-12"
      >
        <h3 className="text-lg font-medium mb-4" style={{ color: colors.darkBrown }}>
          Technical Expertise
        </h3>
        
        <div className="flex flex-wrap gap-3">
          {["React", "Next.js", "TypeScript", "Node.js", "Go", "PostgreSQL", "MongoDB", "Java", "Python", "C#"].map((skill, index) => (
            <span
              key={index}
              style={{ 
                backgroundColor: colors.darkGreen,
                color: "white" 
              }}
              className="px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      {/* Current Experience Section */}
      <section className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: colors.darkBrown }}>
            Current Roles
          </h2>
          
          <Link href="/experiences">
            <span 
              className="text-sm font-medium flex items-center hover:underline cursor-pointer"
              style={{ color: colors.darkGreen }}
            >
              View All Experience <ArrowRight size={16} className="ml-1" />
            </span>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {currentExperiences.map((exp, index) => (
            <ExperienceSnapshot key={index} {...exp} />
          ))}
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section 
        style={{ 
          backgroundColor: colors.lightGreen,
          borderRadius: "12px",
          padding: "32px",
          marginTop: "48px",
          marginBottom: "48px"
        }}
      >
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.darkBrown }}>
            Featured Projects
          </h2>
          <p className="text-gray-700">Highlights from my recent work</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project: Project, index) => (
            <ProjectFeature key={index} project={project} />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/projects">
            <button 
              style={{ 
                backgroundColor: colors.darkBrown,
                color: "white",
                transition: "all 0.3s ease"
              }}
              className="px-6 py-3 rounded-md font-medium inline-flex items-center hover:shadow-lg hover:brightness-110 hover:scale-105 transition-transform"
            >
              Explore All Projects <ArrowRight size={18} className="ml-2" />
            </button>
          </Link>
        </div>
      </section>
      
      {/* About Me Brief */}
      <section className="py-12">
        <div className="md:flex md:items-center gap-12">
          <div className="md:w-2/5 mb-8 md:mb-0">
            <div 
              style={{ 
                backgroundColor: colors.mediumBrown,
                borderRadius: "8px",
                padding: "24px",
                position: "relative"
              }}
              className="text-white"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">About Me</h2>
              <p className="text-white text-opacity-90 mb-6">
                I&apos;m passionate about continuous learning and creative problem-solving. When I&apos;m not coding, you&apos;ll find me solving puzzles, exploring hiking trails, or experimenting with new baking recipes.
              </p>
              <Link href="/about">
                <button 
                  style={{ 
                    backgroundColor: colors.darkGreen,
                    color: "white",
                    transition: "all 0.3s ease"
                  }}
                  className="px-4 py-2 rounded-md text-sm font-medium inline-flex items-center hover:shadow-lg hover:brightness-110 hover:scale-105 transition-transform"
                >
                  Learn More
                </button>
              </Link>
              
              {/* Decorative element */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  border: `2px dashed ${colors.lightBrown}`,
                  opacity: "0.4"
                }}
              ></div>
            </div>
          </div>
          
          <div className="md:w-3/5">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: "Education",
                  content: "BS in Computer Science and Mathematics at Northeastern University"
                },
                {
                  title: "Interests",
                  content: "Reading, puzzles, baking, and outdoor activities"
                },
                {
                  title: "Current Focus",
                  content: "Full-stack development and DevOps automation"
                },
                {
                  title: "Location",
                  content: "Based in Boston, MA"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  style={{ 
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: `1px solid ${colors.lightBrown}`,
                    padding: "16px"
                  }}
                  className="shadow-sm"
                >
                  <h3 className="font-bold mb-2" style={{ color: colors.darkGreen }}>{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;