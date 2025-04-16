import { useState, useEffect, useCallback, useRef } from 'react';
import { ObstacleTypes } from '../components/game/Obstacle';

const GRID_WIDTH = 5;
const GRID_HEIGHT = 8;
const INITIAL_GAME_SPEED = 1000;
const MIN_GAME_SPEED = 300;
const SPEED_DECREASE_RATE = 50;
const OBSTACLE_GENERATION_CHANCE = 0.4;
const POWERUP_GENERATION_CHANCE = 0.2;

// Local storage key for high score
const HIGH_SCORE_KEY = 'swipeNexus_highScore';

const useGameLogic = () => {
  // Game state
  const [gameState, setGameState] = useState({
    isActive: false,
    isPaused: false,
    gameSpeed: INITIAL_GAME_SPEED,
    level: 1,
  });
  
  // Score state
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  });
  
  // Player state
  const [playerPosition, setPlayerPosition] = useState({ x: 2, y: 6 });
  const [playerHasShield, setPlayerHasShield] = useState(false);
  
  // Obstacles state
  const [obstacles, setObstacles] = useState([]);
  
  // Game loop reference
  const gameLoopRef = useRef(null);
  
  // Is game over
  const [isGameOver, setIsGameOver] = useState(false);
  
  // Load high score from local storage on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);
  
  // Save high score to local storage when it changes
  useEffect(() => {
    localStorage.setItem(HIGH_SCORE_KEY, highScore.toString());
  }, [highScore]);
  
  // Reset game state
  const resetGame = useCallback(() => {
    setGameState({
      isActive: false,
      isPaused: false,
      gameSpeed: INITIAL_GAME_SPEED,
      level: 1,
    });
    setScore(0);
    setPlayerPosition({ x: 2, y: 6 });
    setPlayerHasShield(false);
    setObstacles([]);
    setIsGameOver(false);
    
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, []);
  
  // Start the game
  const startGame = useCallback(() => {
    resetGame();
    setGameState(prev => ({ ...prev, isActive: true }));
  }, [resetGame]);
  
  // End the game
  const endGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isActive: false }));
    setIsGameOver(true);
    
    // Update high score if current score is higher
    if (score > highScore) {
      setHighScore(score);
    }
    
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, [score, highScore]);
  
  // Pause/Resume the game
  const togglePause = useCallback(() => {
    if (!gameState.isActive) return;
    
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
    
    if (gameState.isPaused) {
      // Resume game
      startGameLoop();
    } else {
      // Pause game
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }
  }, [gameState.isActive, gameState.isPaused]);
  
  // Move player
  const movePlayer = useCallback((direction) => {
    if (!gameState.isActive || gameState.isPaused || isGameOver) return;
    
    setPlayerPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;
      
      switch (direction) {
        case 'up':
          newY = Math.max(0, prev.y - 1);
          break;
        case 'down':
          newY = Math.min(GRID_HEIGHT - 1, prev.y + 1);
          break;
        case 'left':
          newX = Math.max(0, prev.x - 1);
          break;
        case 'right':
          newX = Math.min(GRID_WIDTH - 1, prev.x + 1);
          break;
        default:
          break;
      }
      
      return { x: newX, y: newY };
    });
  }, [gameState.isActive, gameState.isPaused, isGameOver]);
  
  // Check for collisions
  const checkCollisions = useCallback(() => {
    // Check if player collides with any obstacle
    const collision = obstacles.find(obstacle => 
      obstacle.position.x === playerPosition.x && 
      obstacle.position.y === playerPosition.y
    );
    
    if (collision) {
      switch (collision.type) {
        case ObstacleTypes.ENERGY:
          // Collect energy, increase score
          setScore(prev => prev + 1);
          // Remove the collected energy
          setObstacles(prev => prev.filter(o => 
            !(o.position.x === collision.position.x && o.position.y === collision.position.y)
          ));
          break;
        
        case ObstacleTypes.SPEED_BOOST:
          // Collect speed boost, increase game speed
          setGameState(prev => ({
            ...prev,
            gameSpeed: Math.max(MIN_GAME_SPEED, prev.gameSpeed - SPEED_DECREASE_RATE),
          }));
          // Remove the collected speed boost
          setObstacles(prev => prev.filter(o => 
            !(o.position.x === collision.position.x && o.position.y === collision.position.y)
          ));
          break;
        
        case ObstacleTypes.SHIELD:
          // Collect shield powerup
          setPlayerHasShield(true);
          // Remove the collected shield
          setObstacles(prev => prev.filter(o => 
            !(o.position.x === collision.position.x && o.position.y === collision.position.y)
          ));
          // Shield expires after 5 seconds
          setTimeout(() => {
            setPlayerHasShield(false);
          }, 5000);
          break;
        
        case ObstacleTypes.BARRIER:
          // Hit barrier, game over if no shield
          if (!playerHasShield) {
            endGame();
          } else {
            // Shield protects from one hit
            setPlayerHasShield(false);
            // Remove the barrier that was hit
            setObstacles(prev => prev.filter(o => 
              !(o.position.x === collision.position.x && o.position.y === collision.position.y)
            ));
          }
          break;
        
        default:
          break;
      }
    }
  }, [obstacles, playerPosition, playerHasShield, endGame]);
  
  // Move obstacles down
  const moveObstacles = useCallback(() => {
    setObstacles(prev => {
      // Move existing obstacles down
      const movedObstacles = prev.map(obstacle => ({
        ...obstacle,
        position: {
          ...obstacle.position,
          y: obstacle.position.y + 1,
        },
      })).filter(obstacle => obstacle.position.y < GRID_HEIGHT);
      
      // Generate new obstacles at the top
      const newObstacles = [];
      
      // Generate barriers with a certain probability
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (Math.random() < OBSTACLE_GENERATION_CHANCE) {
          // Decide type of obstacle
          let type = ObstacleTypes.BARRIER;
          
          // Sometimes generate powerups instead of barriers
          if (Math.random() < POWERUP_GENERATION_CHANCE) {
            const randomType = Math.random();
            if (randomType < 0.5) {
              type = ObstacleTypes.ENERGY;
            } else if (randomType < 0.8) {
              type = ObstacleTypes.SPEED_BOOST;
            } else {
              type = ObstacleTypes.SHIELD;
            }
          }
          
          newObstacles.push({
            type,
            position: { x, y: 0 },
          });
        }
      }
      
      // Make sure there's at least one possible path
      const hasBarrierInEveryColumn = Array(GRID_WIDTH).fill(false);
      
      newObstacles.forEach(obstacle => {
        if (obstacle.type === ObstacleTypes.BARRIER) {
          hasBarrierInEveryColumn[obstacle.position.x] = true;
        }
      });
      
      const allColumnsBlocked = hasBarrierInEveryColumn.every(Boolean);
      
      if (allColumnsBlocked) {
        // Remove a random barrier to ensure a path
        const barriersIndices = newObstacles
          .map((obstacle, index) => obstacle.type === ObstacleTypes.BARRIER ? index : -1)
          .filter(index => index !== -1);
        
        if (barriersIndices.length > 0) {
          const randomIndex = barriersIndices[Math.floor(Math.random() * barriersIndices.length)];
          newObstacles.splice(randomIndex, 1);
        }
      }
      
      return [...movedObstacles, ...newObstacles];
    });
  }, []);
  
  // Game loop
  const startGameLoop = useCallback(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    
    gameLoopRef.current = setInterval(() => {
      moveObstacles();
      checkCollisions();
    }, gameState.gameSpeed);
  }, [moveObstacles, checkCollisions, gameState.gameSpeed]);
  
  // Start/stop game loop based on game state
  useEffect(() => {
    if (gameState.isActive && !gameState.isPaused && !isGameOver) {
      startGameLoop();
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, [gameState.isActive, gameState.isPaused, isGameOver, startGameLoop]);
  
  // Check for collisions when player position changes
  useEffect(() => {
    if (gameState.isActive && !gameState.isPaused && !isGameOver) {
      checkCollisions();
    }
  }, [playerPosition, gameState.isActive, gameState.isPaused, isGameOver, checkCollisions]);
  
  return {
    gameState,
    score,
    highScore,
    playerPosition,
    playerHasShield,
    obstacles,
    isGameOver,
    isPaused: gameState.isPaused,
    startGame,
    endGame,
    movePlayer,
    togglePause,
  };
};

export default useGameLogic; 