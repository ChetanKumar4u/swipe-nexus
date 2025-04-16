import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ScoreContainer = styled(motion.div)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 5;
`;

const ScoreValue = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.accent};
  letter-spacing: 1px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  span {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    opacity: 0.8;
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const HighScoreValue = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 1px;
  
  span {
    color: ${({ theme }) => theme.colors.warning};
  }
`;

// Score indicator that flashes when score increases
const ScoreIndicator = styled(motion.div)`
  position: absolute;
  top: -20px;
  right: 0;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.success};
  opacity: 0;
  pointer-events: none;
`;

const ScoreDisplay = ({ score, highScore }) => {
  const [prevScore, setPrevScore] = React.useState(score);
  const [isScoreIncreased, setIsScoreIncreased] = React.useState(false);
  
  React.useEffect(() => {
    if (score > prevScore) {
      // Score increased
      setIsScoreIncreased(true);
      
      // Reset after animation
      const timer = setTimeout(() => {
        setIsScoreIncreased(false);
      }, 1000);
      
      setPrevScore(score);
      
      return () => clearTimeout(timer);
    }
  }, [score, prevScore]);
  
  return (
    <ScoreContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <ScoreValue>
        <span>SCORE</span>
        {score}
        {isScoreIncreased && (
          <ScoreIndicator
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            +1
          </ScoreIndicator>
        )}
      </ScoreValue>
      
      <HighScoreValue>
        HIGH <span>{highScore}</span>
      </HighScoreValue>
    </ScoreContainer>
  );
};

export default ScoreDisplay; 