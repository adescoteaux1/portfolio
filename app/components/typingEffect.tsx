'use client';

import React, { useState, useEffect } from 'react';

const TypingEffect = () => {
  const descriptions = [
    'problem solver',
    'creative thinker',
    'data enthusiast',
    'team player',
    'continuous learner'
  ];
  
  const [descriptionIndex, setDescriptionIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Color palette
  const colors = {
    darkGreen: '#5C6D63',
    mediumGreen: '#8BA888'
  };
  
  useEffect(() => {
    const currentDescription = descriptions[descriptionIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentDescription.substring(0, text.length + 1));
        
        // If word is complete
        if (text === currentDescription) {
          // Pause at end of word
          setTimeout(() => {
            setIsDeleting(true);
          }, 1500);
        }
      } else {
        setText(currentDescription.substring(0, text.length - 1));
        
        // If word is deleted
        if (text === '') {
          setIsDeleting(false);
          setDescriptionIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
        }
      }
    }, isDeleting ? 50 : 120);
    
    return () => clearTimeout(timer);
  }, [text, isDeleting, descriptionIndex, descriptions]);
  
  return (
    <div className="h-10 text-3xl tablet:text-4xl">
      <span style={{ color: colors.darkGreen }}>{text}</span>
      <span className="animate-pulse" style={{ color: colors.mediumGreen }}>|</span>
    </div>
  );
};

export default TypingEffect;