"use client"

import React from 'react';
import content from "../content/content";
import SafeImage from '../components/safeImage';
import Layout from '../components/layout';


const AboutPage = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <div 
            style={{ backgroundColor: colors.darkBrown, height: "4px", width: "60px" }}
            className="mb-6"
          ></div>
        </div>
      </section>
      
      {/* Bio Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="md:flex items-start gap-12">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div 
                style={{ 
                  backgroundColor: colors.mediumGreen,
                  borderRadius: "8px",
                  padding: "8px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                }}
                className="mb-6"
              >
                <SafeImage 
                  src="/profile.png" 
                  alt="Profile" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <div 
                  style={{ 
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                    border: `1px solid ${colors.lightBrown}`
                  }}
                  className="p-4"
                >
                  <h3 className="font-bold mb-2" style={{ color: colors.darkGreen }}>Location</h3>
                  <p>Boston, Massachusetts</p>
                </div>
                <div 
                  style={{ 
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                    border: `1px solid ${colors.lightBrown}`
                  }}
                  className="p-4"
                >
                  <h3 className="font-bold mb-2" style={{ color: colors.darkGreen }}>Education</h3>
                  <p>Northeastern University</p>
                  <p className="text-sm text-gray-600">BS in Computer Science and Mathematics</p>
                </div>
                <div 
                  style={{ 
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                    border: `1px solid ${colors.lightBrown}`
                  }}
                  className="p-4"
                >
                  <h3 className="font-bold mb-2" style={{ color: colors.darkGreen }}>Contact</h3>
                  <a 
                    href="mailto:descoteaux.a@northeastern.edu" 
                    className="block mb-2 hover:text-opacity-80"
                    style={{ color: colors.darkGreen }}
                  >
                    descoteaux.a@northeastern.edu
                  </a>
                  <div className="flex space-x-4 mt-2">
                    <a 
                      href="https://github.com/adescoteaux1" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: colors.darkGreen }}
                      className="hover:opacity-80"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/alexandradescoteaux/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: colors.darkGreen }}
                      className="hover:opacity-80"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-6" style={{ color: colors.darkBrown }}>
                Hi, I&apos;m Ally Descoteaux 👋
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="mb-6">
                  I&apos;m a Computer Science and Mathematics student at Northeastern University with a passion for building innovative, user-centered web applications and exploring the intersection of technology and sustainability.
                </p>
                <p className="mb-6">
                  My journey in software development began during my first year at Northeastern, where I discovered my love for creating solutions that solve real-world problems. Since then, I&apos;ve had the opportunity to work on various projects, from building carbon accounting platforms to developing task management applications.
                </p>
                <p className="mb-6">
                  Through my co-op experiences at Verisk Extreme Events Solutions and TJX Companies, I&apos;ve gained valuable industry knowledge in DevOps, data engineering, and systems automation. These experiences have strengthened my technical skills and provided me with insights into how software development works in enterprise environments.
                </p>
                <p className="mb-6">
                  As a TA for Database Design, I&apos;ve developed a deeper understanding of data structures and enjoy helping others grasp complex concepts. My work with Generate, a student-led product development studio, has allowed me to lead engineering teams and collaborate with designers to bring innovative products to life.
                </p>
                <p className="mb-6">
                  When I&apos;m not coding or studying, I enjoy hiking, reading science fiction, and experimenting with new recipes. I believe that diverse interests and experiences contribute to creative problem-solving in technology.
                </p>
                <p>
                  I&apos;m currently seeking opportunities where I can apply my skills and continue to grow as a developer while making meaningful contributions to projects that have positive impacts.
                </p>
              </div>
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
          <h2 className="text-3xl font-bold mb-2">Skills & Technologies</h2>
          <div 
            style={{ backgroundColor: colors.darkGreen, height: "4px", width: "60px" }}
            className="mb-12"
          ></div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: colors.darkBrown }}>
                Programming Languages
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {content.skills.map((item, index) => (
                  <div 
                    key={index}
                    style={{ 
                      backgroundColor: "white",
                      border: `1px solid ${colors.mediumBrown}`,
                    }}
                    className="p-4 rounded-lg flex items-center"
                  >
                    <div className="w-10 h-10 mr-3 flex-shrink-0 flex items-center justify-center">
                      <SafeImage 
                        src={`/${item.image}`} 
                        alt={item.skill}
                        className="max-w-full max-h-full"
                        fallbackSrc="/api/placeholder/40/40"
                      />
                    </div>
                    <span className="font-medium">{item.skill}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: colors.darkBrown }}>
                Frameworks & Tools
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {content.frameworks.map((item, index) => (
                  <div 
                    key={index}
                    style={{ 
                      backgroundColor: "white",
                      border: `1px solid ${colors.mediumBrown}`,
                    }}
                    className="p-4 rounded-lg flex items-center"
                  >
                    <div className="w-10 h-10 mr-3 flex-shrink-0 flex items-center justify-center">
                      <SafeImage 
                        src={`/${item.image}`} 
                        alt={item.skill}
                        className="max-w-full max-h-full"
                        fallbackSrc="/api/placeholder/40/40"
                      />
                    </div>
                    <span className="font-medium">{item.skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Education Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2">Education</h2>
          <div 
            style={{ backgroundColor: colors.mediumGreen, height: "4px", width: "60px" }}
            className="mb-12"
          ></div>
          
          <div 
            style={{ 
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
              border: `1px solid ${colors.lightBrown}`
            }}
            className="p-6 md:p-8"
          >
            <div className="md:flex items-start">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <div className="w-16 h-16 mb-4 rounded-lg overflow-hidden">
                  <SafeImage 
                    src="/northeastern.png" 
                    alt="Northeastern University"
                    className="w-full h-full object-cover"
                    fallbackSrc="/api/placeholder/40/40"
                  />
                </div>
                <p className="text-sm text-gray-500">Sep 2022 - Present</p>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-2">Northeastern University</h3>
                <p className="text-lg mb-2" style={{ color: colors.darkGreen }}>
                  BS in Computer Science and Mathematics
                </p>
                <p className="mb-4">
                  GPA: 3.8/4.0 • Khoury Dean&apos;s List
                </p>
                <h4 className="font-bold mb-2">Relevant Coursework:</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Software Engineering",
                    "Algorithms and Data",
                    "Object-Oriented Design",
                    "Artificial Intelligence",
                    "Machine Learning",
                    "Database Design",
                    "Discrete Structures",
                    "Probability and Statistics"
                  ].map((course, index) => (
                    <span 
                      key={index}
                      style={{ 
                        backgroundColor: colors.lightGreen,
                        color: colors.darkGreen
                      }}
                      className="px-3 py-1 rounded-full text-sm"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Interests Section */}
      <section 
        style={{ backgroundColor: colors.lightGreen }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2">Interests & Hobbies</h2>
          <div 
            style={{ backgroundColor: colors.darkBrown, height: "4px", width: "60px" }}
            className="mb-12"
          ></div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Sustainable Technology",
                description: "Exploring how technology can address environmental challenges and promote sustainability.",
                icon: "🌱"
              },
              {
                title: "Data Visualization",
                description: "Creating effective visual representations of complex datasets to extract meaningful insights.",
                icon: "📊"
              },
              {
                title: "Hiking & Outdoor Activities",
                description: "Exploring nature trails and disconnecting from technology to recharge and find inspiration.",
                icon: "🥾"
              },
              {
                title: "Reading",
                description: "Reading about speculative futures that explore the impact of technology on society.",
                icon: "📚"
              },
              {
                title: "Baking",
                description: "Experimenting with recipes and techniques from different cuisines as a creative outlet.",
                icon: "🍳"
              },
              {
                title: "Open Source Contribution",
                description: "Collaborating with the global developer community to improve and maintain public codebases.",
                icon: "🤝"
              }
            ].map((interest, index) => (
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
                <div className="text-4xl mb-4">{interest.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.darkBrown }}>
                  {interest.title}
                </h3>
                <p className="text-gray-700">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Connect</h2>
          <p className="text-lg mb-8">
            I&apos;m always open to discussing new projects, opportunities, or just chatting about technology.
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
              href="/projects"
              style={{ 
                backgroundColor: "transparent", 
                color: colors.darkBrown,
                border: `2px solid ${colors.darkBrown}`
              }}
              className="px-6 py-3 rounded-md font-medium"
            >
              View My Projects
            </a>
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default AboutPage;