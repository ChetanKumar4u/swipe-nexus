import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import LevelMap from '../components/game/LevelMap';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import { getAllLevels } from '../data/levels';
import useAudio from '../hooks/useAudio';

const LevelSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
`;

const BackgroundGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 30%,
    ${({ theme }) => `${theme.colors.primary}20`} 0%,
    transparent 60%
  );
  pointer-events: none;
  z-index: 0;
`;

const LevelDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.backgroundAlt};
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const DetailValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const DifficultyIndicator = styled.div`
  display: flex;
  gap: 2px;
`;

const DifficultyDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ active, theme }) => 
    active ? theme.colors.accent : 'rgba(255, 255, 255, 0.2)'};
`;

const LevelSelect = () => {
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showLevelDetails, setShowLevelDetails] = useState(false);
  const { playSound } = useAudio();
  
  // Load levels data
  useEffect(() => {
    const levelsData = getAllLevels();
    
    // Load user progress from localStorage
    const userProgress = JSON.parse(localStorage.getItem('swipeNexus_levels') || '{}');
    
    // Combine level data with user progress
    const processedLevels = levelsData.map(level => {
      const progress = userProgress[level.id] || { 
        highScore: 0, 
        stars: 0, 
        isCompleted: false,
        isLocked: level.id !== 1 // Only first level is unlocked by default
      };
      
      // For demo, unlock first two levels
      let isLocked = level.id > 2;
      
      // If previous level is completed, unlock this one
      if (level.id > 1 && userProgress[level.id - 1]?.isCompleted) {
        isLocked = false;
      }
      
      return {
        ...level,
        highScore: progress.highScore || 0,
        stars: progress.stars || 0,
        isCompleted: progress.isCompleted || false,
        isLocked: isLocked
      };
    });
    
    setLevels(processedLevels);
  }, []);
  
  // Handle level selection
  const handleLevelSelect = (level) => {
    if (level.isLocked) {
      playSound('CLICK');
      return;
    }
    
    setSelectedLevel(level);
    setShowLevelDetails(true);
    playSound('CLICK');
  };
  
  // Close level details modal
  const handleCloseDetails = () => {
    setShowLevelDetails(false);
    playSound('CLICK');
  };
  
  // Render difficulty indicator dots
  const renderDifficultyDots = (difficultyLevel) => {
    return Array(5).fill(0).map((_, index) => (
      <DifficultyDot key={index} active={index < difficultyLevel} />
    ));
  };
  
  return (
    <Layout>
      <LevelSelectContainer>
        <BackgroundGlow />
        
        <LevelMap 
          levels={levels} 
          onLevelSelect={handleLevelSelect}
        />
        
        {selectedLevel && (
          <Modal
            isOpen={showLevelDetails}
            onClose={handleCloseDetails}
            title={selectedLevel.name}
            size="small"
            footer={
              <ModalActions>
                <Button 
                  variant="ghost" 
                  onClick={handleCloseDetails}
                >
                  Cancel
                </Button>
                <Button 
                  variant="accent" 
                  as="a" 
                  href={`/play/${selectedLevel.id}`}
                  onClick={() => playSound('CLICK')}
                >
                  Play Level
                </Button>
              </ModalActions>
            }
          >
            <LevelDetails>
              <DetailItem>
                <DetailLabel>Description</DetailLabel>
                <DetailValue>{selectedLevel.description}</DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel>Difficulty</DetailLabel>
                <DifficultyIndicator>
                  {renderDifficultyDots(selectedLevel.difficultyLevel)}
                </DifficultyIndicator>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel>High Score</DetailLabel>
                <DetailValue>{selectedLevel.highScore}</DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel>Stars</DetailLabel>
                <DetailValue>{selectedLevel.stars}/3</DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel>Status</DetailLabel>
                <DetailValue>
                  {selectedLevel.isCompleted 
                    ? 'Completed' 
                    : selectedLevel.highScore > 0
                      ? 'In Progress'
                      : 'Not Started'}
                </DetailValue>
              </DetailItem>
              
              <DetailItem>
                <DetailLabel>Target Score</DetailLabel>
                <DetailValue>{selectedLevel.targetScore}</DetailValue>
              </DetailItem>
            </LevelDetails>
          </Modal>
        )}
      </LevelSelectContainer>
    </Layout>
  );
};

export default LevelSelect; 