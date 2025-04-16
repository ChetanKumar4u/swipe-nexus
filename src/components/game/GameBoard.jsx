import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Player from './Player';
import Obstacle from './Obstacle';
import ScoreDisplay from './ScoreDisplay';
import useGameLogic from '../../hooks/useGameLogic';

const GameContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 80vh;
  margin: 0 auto;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.backgroundAlt} 0%,
    ${({ theme }) => theme.colors.background} 100%
  );
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.primary}50;
  box-shadow: 0 0 20px ${({ theme }) => theme.colors.primary}30;
  overflow: hidden;
  touch-action: none;
  z-index: ${({ theme }) => theme.zIndices.game};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      transparent 40%,
      ${({ theme }) => theme.colors.primary}10 100%
    );
    pointer-events: none;
  }
`;

const GameOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
  backdrop-filter: blur(5px);
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const GameTitle = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.tertiary};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.neonBlue},
               0 0 20px ${({ theme }) => theme.colors.neonBlue};
  letter-spacing: 3px;
  text-transform: uppercase;
`;

const GameOverMessage = styled(motion.h2)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.danger};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.neonPink};
`;

const FinalScore = styled(motion.div)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const GameControls = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 80%;
  max-width: 300px;
`;

const StartButton = styled(motion.button)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.accent}80;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.colors.accent};
    transition: transform 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 20px ${({ theme }) => theme.colors.accent};
    
    &::before {
      transform: translateX(100%);
    }
  }
`;

const GameInstructions = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xl};
  max-width: 80%;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(8, 1fr);
  width: 100%;
  height: 100%;
  position: relative;
`;

const GameBoard = () => {
  const {
    gameState,
    score,
    highScore,
    playerPosition,
    obstacles,
    startGame,
    endGame,
    movePlayer,
    isGameOver,
    isPaused
  } = useGameLogic();
  
  const boardRef = useRef(null);
  
  // Handle touch and mouse events for player movement
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (isGameOver || !gameState.isActive) return;
      
      const touch = e.touches[0];
      const startX = touch.clientX;
      const startY = touch.clientY;
      
      const handleTouchMove = (e) => {
        if (isGameOver || !gameState.isActive) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        
        // Determine direction based on the largest delta
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 20) {
            movePlayer('right');
          } else if (deltaX < -20) {
            movePlayer('left');
          }
        } else {
          // Vertical swipe
          if (deltaY > 20) {
            movePlayer('down');
          } else if (deltaY < -20) {
            movePlayer('up');
          }
        }
      };
      
      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
      
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    };
    
    const handleKeyDown = (e) => {
      if (isGameOver || !gameState.isActive) return;
      
      switch (e.key) {
        case 'ArrowUp':
          movePlayer('up');
          break;
        case 'ArrowDown':
          movePlayer('down');
          break;
        case 'ArrowLeft':
          movePlayer('left');
          break;
        case 'ArrowRight':
          movePlayer('right');
          break;
        default:
          break;
      }
    };
    
    const board = boardRef.current;
    if (board) {
      board.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      if (board) {
        board.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [gameState.isActive, isGameOver, movePlayer]);
  
  return (
    <GameContainer
      ref={boardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {!gameState.isActive && (
          <GameOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isGameOver ? (
              <>
                <GameOverMessage
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Game Over!
                </GameOverMessage>
                <FinalScore
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Final Score: {score} | High Score: {highScore}
                </FinalScore>
              </>
            ) : (
              <GameTitle
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Swipe Nexus
              </GameTitle>
            )}
            
            <GameControls
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <StartButton
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isGameOver ? 'Play Again' : 'Start Game'}
              </StartButton>
            </GameControls>
            
            <GameInstructions
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Swipe or use arrow keys to move your character. Collect energy orbs and avoid obstacles.
            </GameInstructions>
          </GameOverlay>
        )}
      </AnimatePresence>
      
      <Grid>
        {gameState.isActive && (
          <>
            <Player position={playerPosition} />
            
            {obstacles.map((obstacle, index) => (
              <Obstacle 
                key={`obstacle-${index}`}
                type={obstacle.type}
                position={obstacle.position}
              />
            ))}
          </>
        )}
      </Grid>
      
      <ScoreDisplay score={score} highScore={highScore} />
    </GameContainer>
  );
};

export default GameBoard; 