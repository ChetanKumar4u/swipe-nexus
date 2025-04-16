import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PlayerContainer = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      ${({ theme }) => theme.colors.neonBlue} 0%,
      ${({ theme }) => theme.colors.primary} 70%
    );
    box-shadow: 0 0 15px ${({ theme }) => theme.colors.neonBlue},
                0 0 30px ${({ theme }) => theme.colors.primary};
    animation: pulse 2s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 60%;
    border-radius: 50%;
    background: radial-gradient(
      circle at center,
      white 0%,
      ${({ theme }) => theme.colors.accent} 70%
    );
    filter: blur(1px);
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
  }
  
  /* Add a trail effect with pseudo elements */
  .trail {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary}50;
    animation: fadeOut 1s forwards;
    pointer-events: none;
  }
  
  @keyframes fadeOut {
    0% {
      opacity: 0.7;
      transform: scale(0.9);
    }
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
  }
`;

const Player = ({ position }) => {
  const playerRef = useRef(null);
  const trailsRef = useRef([]);
  const lastPositionRef = useRef(position);
  
  // Calculate position based on grid
  const left = `${position.x * 20}%`;
  const top = `${position.y * 12.5}%`;
  
  // Create trail effect
  useEffect(() => {
    // Only create trail if position has changed
    if (
      lastPositionRef.current.x !== position.x ||
      lastPositionRef.current.y !== position.y
    ) {
      const container = playerRef.current;
      if (!container) return;
      
      // Create trail element
      const trail = document.createElement('div');
      trail.className = 'trail';
      trail.style.left = '50%';
      trail.style.top = '50%';
      trail.style.transform = 'translate(-50%, -50%)';
      
      // Add to container
      container.appendChild(trail);
      
      // Add to refs array for cleanup
      trailsRef.current.push(trail);
      
      // Remove after animation
      setTimeout(() => {
        if (container.contains(trail)) {
          container.removeChild(trail);
        }
        trailsRef.current = trailsRef.current.filter(t => t !== trail);
      }, 1000);
      
      // Update last position
      lastPositionRef.current = { ...position };
    }
  }, [position]);
  
  // Cleanup trails on unmount
  useEffect(() => {
    return () => {
      trailsRef.current.forEach(trail => {
        const container = playerRef.current;
        if (container && container.contains(trail)) {
          container.removeChild(trail);
        }
      });
      trailsRef.current = [];
    };
  }, []);
  
  return (
    <PlayerContainer
      ref={playerRef}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        left,
        top,
        opacity: 1,
        scale: 1,
        transition: { 
          type: 'spring',
          stiffness: 500,
          damping: 30,
          opacity: { duration: 0.2 }
        }
      }}
      exit={{ opacity: 0, scale: 0 }}
    />
  );
};

export default Player; 