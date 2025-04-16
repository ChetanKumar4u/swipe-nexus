import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const ObstacleTypes = {
  BARRIER: 'barrier',
  ENERGY: 'energy',
  SPEED_BOOST: 'speed_boost',
  SHIELD: 'shield',
};

const ObstacleContainer = styled(motion.div)`
  position: absolute;
  width: ${({ type }) => type === ObstacleTypes.BARRIER ? '90%' : '30px'};
  height: ${({ type }) => type === ObstacleTypes.BARRIER ? '30px' : '30px'};
  border-radius: ${({ type, theme }) => 
    type === ObstacleTypes.BARRIER ? theme.borderRadius.sm : '50%'};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
  
  ${({ type, theme }) => {
    switch (type) {
      case ObstacleTypes.ENERGY:
        return css`
          background: radial-gradient(
            circle at center,
            ${theme.colors.accent} 0%,
            ${theme.colors.neonBlue} 70%
          );
          box-shadow: 0 0 10px ${theme.colors.accent},
                      0 0 20px ${theme.colors.neonBlue};
          animation: energyPulse 2s ease-in-out infinite;
          
          @keyframes energyPulse {
            0%, 100% {
              box-shadow: 0 0 10px ${theme.colors.accent},
                          0 0 20px ${theme.colors.neonBlue};
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 15px ${theme.colors.accent},
                          0 0 30px ${theme.colors.neonBlue};
              transform: scale(1.1);
            }
          }
          
          &::before {
            content: '';
            position: absolute;
            width: 60%;
            height: 60%;
            border-radius: 50%;
            background: white;
            opacity: 0.8;
            filter: blur(1px);
          }
        `;
      case ObstacleTypes.SPEED_BOOST:
        return css`
          background: radial-gradient(
            circle at center,
            ${theme.colors.success} 0%,
            ${theme.colors.neonPurple} 70%
          );
          box-shadow: 0 0 10px ${theme.colors.success},
                      0 0 20px ${theme.colors.neonPurple};
          animation: rotatePulse 3s linear infinite;
          
          @keyframes rotatePulse {
            0% {
              transform: rotate(0deg) scale(1);
            }
            50% {
              transform: rotate(180deg) scale(1.2);
            }
            100% {
              transform: rotate(360deg) scale(1);
            }
          }
          
          &::after {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 16px solid ${theme.colors.white};
            transform: rotate(45deg);
          }
        `;
      case ObstacleTypes.SHIELD:
        return css`
          background: radial-gradient(
            circle at center,
            ${theme.colors.warning} 0%,
            ${theme.colors.secondary} 70%
          );
          box-shadow: 0 0 10px ${theme.colors.warning},
                      0 0 20px ${theme.colors.secondary};
          
          &::before {
            content: '';
            position: absolute;
            width: 120%;
            height: 120%;
            border-radius: 50%;
            border: 2px solid ${theme.colors.warning};
            opacity: 0.6;
            animation: shieldPulse 2s ease-in-out infinite;
          }
          
          @keyframes shieldPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.3);
              opacity: 0;
            }
          }
        `;
      default: // BARRIER
        return css`
          background: linear-gradient(
            45deg,
            ${theme.colors.danger} 0%,
            ${theme.colors.neonPink} 100%
          );
          box-shadow: 0 0 10px ${theme.colors.danger},
                      0 0 20px ${theme.colors.neonPink};
          
          &::before, &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            background: ${theme.colors.white};
            opacity: 0.3;
          }
          
          &::before {
            top: 30%;
          }
          
          &::after {
            bottom: 30%;
          }
        `;
    }
  }}
`;

const Obstacle = ({ type = ObstacleTypes.BARRIER, position }) => {
  // Calculate position based on grid
  const left = `${position.x * 20}%`;
  const top = `${position.y * 12.5}%`;
  
  // Define animations based on obstacle type
  const getAnimationVariants = () => {
    switch (type) {
      case ObstacleTypes.ENERGY:
        return {
          initial: { opacity: 0, scale: 0 },
          animate: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.3 }
          },
          exit: { 
            opacity: 0, 
            scale: 0,
            transition: { duration: 0.2 }
          }
        };
      case ObstacleTypes.SPEED_BOOST:
        return {
          initial: { opacity: 0, y: -20 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, type: 'spring' }
          },
          exit: { 
            opacity: 0, 
            y: 20,
            transition: { duration: 0.2 }
          }
        };
      case ObstacleTypes.SHIELD:
        return {
          initial: { opacity: 0, scale: 1.5 },
          animate: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.5 }
          },
          exit: { 
            opacity: 0, 
            scale: 1.5,
            transition: { duration: 0.3 }
          }
        };
      default: // BARRIER
        return {
          initial: { opacity: 0, scaleX: 0 },
          animate: { 
            opacity: 1, 
            scaleX: 1,
            transition: { duration: 0.3 }
          },
          exit: { 
            opacity: 0, 
            scaleX: 0,
            transition: { duration: 0.2 }
          }
        };
    }
  };
  
  const animationVariants = getAnimationVariants();
  
  return (
    <ObstacleContainer
      type={type}
      style={{ left, top }}
      initial={animationVariants.initial}
      animate={animationVariants.animate}
      exit={animationVariants.exit}
    />
  );
};

export { Obstacle, ObstacleTypes };
export default Obstacle; 