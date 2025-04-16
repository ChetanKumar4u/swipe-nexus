import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import GameBoard from '../components/game/GameBoard';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { getLevelById } from '../data/levels';
import useAudio from '../hooks/useAudio';

const GamePlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  width: 100%;
  height: 100%;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;

const LevelInfo = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 500px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const LevelName = styled.h2`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  letter-spacing: 1px;
`;

const PauseButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  width: 100%;
`;

const GamePlay = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const [level, setLevel] = React.useState(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const { playSound, pauseBackgroundMusic, resumeBackgroundMusic } = useAudio();
  
  // Load level data based on levelId param
  useEffect(() => {
    // If no levelId is provided, get the first level
    const id = levelId ? parseInt(levelId, 10) : 1;
    const levelData = getLevelById(id);
    
    if (levelData) {
      setLevel(levelData);
    } else {
      // Level not found, redirect to levels page
      navigate('/levels');
    }
  }, [levelId, navigate]);
  
  // Handle pause/resume
  const togglePause = () => {
    setIsPaused(prev => {
      const newIsPaused = !prev;
      
      if (newIsPaused) {
        pauseBackgroundMusic();
      } else {
        resumeBackgroundMusic();
      }
      
      playSound('CLICK');
      return newIsPaused;
    });
  };
  
  // Handle exit game
  const handleExitGame = () => {
    playSound('CLICK');
    navigate('/levels');
  };
  
  // No level data yet
  if (!level) {
    return null;
  }
  
  return (
    <Layout noPadding>
      <GamePlayContainer>
        <LevelInfo
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LevelName>{level.name}</LevelName>
          <PauseButton 
            onClick={togglePause}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPaused ? '▶' : '❚❚'}
          </PauseButton>
        </LevelInfo>
        
        <GameBoard level={level} isPaused={isPaused} onPause={togglePause} />
        
        <Modal
          isOpen={isPaused}
          onClose={togglePause}
          title="Game Paused"
          size="small"
          footer={
            <ModalButtons>
              <Button 
                variant="primary" 
                onClick={togglePause}
              >
                Resume
              </Button>
              <Button 
                variant="danger" 
                onClick={handleExitGame}
              >
                Exit Game
              </Button>
            </ModalButtons>
          }
        >
          <p>Game is paused. Take a break or continue your journey.</p>
        </Modal>
      </GamePlayContainer>
    </Layout>
  );
};

export default GamePlay; 