import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const LevelMapContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const LevelTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.tertiary};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
`;

const LevelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const LevelCard = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.colors.backgroundAlt} 0%,
    ${({ theme }) => theme.colors.background} 100%
  );
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme, isLocked }) => 
    isLocked ? theme.colors.gray : theme.colors.primary}50;
  padding: ${({ theme }) => theme.spacing.lg};
  height: 220px;
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  ${({ isLocked }) => !isLocked && `
    cursor: pointer;
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme, isCompleted }) => 
      isCompleted 
        ? `linear-gradient(135deg, ${theme.colors.success}10 0%, transparent 50%)`
        : 'transparent'};
    pointer-events: none;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(
      to right,
      ${({ theme, isCompleted, isLocked }) => 
        isLocked 
          ? theme.colors.gray 
          : isCompleted
            ? theme.colors.success
            : theme.colors.accent},
      transparent
    );
    z-index: 2;
  }
`;

const LevelNumber = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ theme, isLocked }) => 
    isLocked ? theme.colors.gray : theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.md};
  box-shadow: 0 0 10px ${({ theme, isLocked }) => 
    isLocked ? 'transparent' : theme.colors.primary}80;
`;

const LevelInfo = styled.div`
  z-index: 3;
`;

const LevelName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme, isLocked }) => 
    isLocked ? theme.colors.textSecondary : theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  letter-spacing: 1px;
`;

const LevelDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, isLocked }) => 
    isLocked ? theme.colors.gray : theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.4;
`;

const LevelStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  
  svg {
    width: 14px;
    height: 14px;
  }
  
  span {
    color: ${({ theme, type, isLocked }) => {
      if (isLocked) return theme.colors.gray;
      switch (type) {
        case 'highscore':
          return theme.colors.warning;
        case 'stars':
          return theme.colors.accent;
        default:
          return theme.colors.textSecondary;
      }
    }};
  }
`;

const LockOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  
  svg {
    width: 40px;
    height: 40px;
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const BackButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const levelCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  }),
  hover: {
    y: -5,
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    borderColor: 'rgba(0, 255, 255, 0.5)',
    transition: {
      duration: 0.3
    }
  },
  tap: {
    scale: 0.98,
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.1
    }
  }
};

const LevelMap = ({ levels }) => {
  // If no levels are provided, use some default test data
  const levelData = levels || [
    {
      id: 1,
      name: 'Neural Gateway',
      description: 'Enter the digital realm and learn the basics of movement and energy collection.',
      difficulty: 'Easy',
      highScore: 0,
      stars: 0,
      isCompleted: false,
      isLocked: false
    },
    {
      id: 2,
      name: 'Data Stream',
      description: 'Navigate through faster data streams with increasing obstacles.',
      difficulty: 'Medium',
      highScore: 0,
      stars: 0,
      isCompleted: false,
      isLocked: true
    },
    {
      id: 3,
      name: 'Firewall Breach',
      description: 'Bypass security systems and avoid detection protocols.',
      difficulty: 'Hard',
      highScore: 0,
      stars: 0,
      isCompleted: false,
      isLocked: true
    },
    {
      id: 4,
      name: 'Quantum Maze',
      description: 'Master unpredictable quantum shifts and collect unstable energy patterns.',
      difficulty: 'Expert',
      highScore: 0,
      stars: 0,
      isCompleted: false,
      isLocked: true
    },
    {
      id: 5,
      name: 'Neon Nexus',
      description: 'Reach the core of the system where reality bends to your will.',
      difficulty: 'Insane',
      highScore: 0,
      stars: 0,
      isCompleted: false,
      isLocked: true
    }
  ];
  
  return (
    <LevelMapContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LevelTitle>Select Level</LevelTitle>
      
      <LevelsGrid>
        {levelData.map((level, index) => (
          <LevelCard
            key={level.id}
            isLocked={level.isLocked}
            isCompleted={level.isCompleted}
            variants={levelCardVariants}
            custom={index}
            initial="hidden"
            animate="visible"
            whileHover={!level.isLocked ? "hover" : undefined}
            whileTap={!level.isLocked ? "tap" : undefined}
          >
            <LevelNumber isLocked={level.isLocked}>
              {level.id}
            </LevelNumber>
            
            <LevelInfo>
              <LevelName isLocked={level.isLocked}>{level.name}</LevelName>
              <LevelDescription isLocked={level.isLocked}>
                {level.description}
              </LevelDescription>
              
              <LevelStats>
                <Stat type="difficulty" isLocked={level.isLocked}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {level.difficulty}
                </Stat>
                
                <Stat type="highscore" isLocked={level.isLocked}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.58984 13.5098L15.4198 17.4898" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.4098 6.50977L8.58984 10.4898" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Best: <span>{level.highScore}</span>
                </Stat>
                
                <Stat type="stars" isLocked={level.isLocked}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{level.stars}</span>/3
                </Stat>
              </LevelStats>
            </LevelInfo>
            
            {level.isLocked && (
              <LockOverlay>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </LockOverlay>
            )}
          </LevelCard>
        ))}
      </LevelsGrid>
      
      <Link to="/">
        <BackButton variant="accent">Back to Home</BackButton>
      </Link>
    </LevelMapContainer>
  );
};

export default LevelMap; 