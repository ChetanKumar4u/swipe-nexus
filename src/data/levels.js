/**
 * Game levels configuration
 * Each level has different settings for difficulty and game mechanics
 */
const levels = [
  {
    id: 1,
    name: 'Neural Gateway',
    description: 'Enter the digital realm and learn the basics of movement and energy collection.',
    difficulty: 'Easy',
    difficultyLevel: 1,
    gameSpeed: 1000, // milliseconds between obstacle moves
    minSpeed: 800, // minimum speed the game can reach
    speedDecreaseRate: 20, // how much the speed decreases per energy collected
    obstacleChance: 0.3, // probability of generating an obstacle per column
    powerupChance: 0.4, // probability of a generated obstacle being a powerup
    energyFrequency: 0.4, // probability of a powerup being energy
    speedBoostFrequency: 0.3, // probability of a powerup being speed boost
    shieldFrequency: 0.3, // probability of a powerup being shield
    targetScore: 10, // score needed to complete the level
    backgroundImage: '/assets/images/level1_bg.jpg',
    isLocked: false,
    colorScheme: {
      primary: '#4A00E0',
      secondary: '#8A2BE2',
      accent: '#00FFFF',
    }
  },
  {
    id: 2,
    name: 'Data Stream',
    description: 'Navigate through faster data streams with increasing obstacles.',
    difficulty: 'Medium',
    difficultyLevel: 2,
    gameSpeed: 800,
    minSpeed: 600,
    speedDecreaseRate: 25,
    obstacleChance: 0.4,
    powerupChance: 0.35,
    energyFrequency: 0.4,
    speedBoostFrequency: 0.4,
    shieldFrequency: 0.2,
    targetScore: 15,
    backgroundImage: '/assets/images/level2_bg.jpg',
    isLocked: true,
    colorScheme: {
      primary: '#FF4500',
      secondary: '#FF8C00',
      accent: '#FFD700',
    }
  },
  {
    id: 3,
    name: 'Firewall Breach',
    description: 'Bypass security systems and avoid detection protocols.',
    difficulty: 'Hard',
    difficultyLevel: 3,
    gameSpeed: 700,
    minSpeed: 500,
    speedDecreaseRate: 30,
    obstacleChance: 0.5,
    powerupChance: 0.3,
    energyFrequency: 0.3,
    speedBoostFrequency: 0.5,
    shieldFrequency: 0.2,
    targetScore: 20,
    backgroundImage: '/assets/images/level3_bg.jpg',
    isLocked: true,
    colorScheme: {
      primary: '#FF0055',
      secondary: '#FF458C',
      accent: '#FFB6C1',
    }
  },
  {
    id: 4,
    name: 'Quantum Maze',
    description: 'Master unpredictable quantum shifts and collect unstable energy patterns.',
    difficulty: 'Expert',
    difficultyLevel: 4,
    gameSpeed: 600,
    minSpeed: 400,
    speedDecreaseRate: 35,
    obstacleChance: 0.55,
    powerupChance: 0.25,
    energyFrequency: 0.3,
    speedBoostFrequency: 0.4,
    shieldFrequency: 0.3,
    targetScore: 25,
    backgroundImage: '/assets/images/level4_bg.jpg',
    isLocked: true,
    colorScheme: {
      primary: '#00FF9D',
      secondary: '#00B8D4',
      accent: '#64FFDA',
    }
  },
  {
    id: 5,
    name: 'Neon Nexus',
    description: 'Reach the core of the system where reality bends to your will.',
    difficulty: 'Insane',
    difficultyLevel: 5,
    gameSpeed: 500,
    minSpeed: 300,
    speedDecreaseRate: 40,
    obstacleChance: 0.6,
    powerupChance: 0.2,
    energyFrequency: 0.2,
    speedBoostFrequency: 0.4,
    shieldFrequency: 0.4,
    targetScore: 30,
    backgroundImage: '/assets/images/level5_bg.jpg',
    isLocked: true,
    colorScheme: {
      primary: '#F000FF',
      secondary: '#8A00D4',
      accent: '#D6AEDD',
    }
  }
];

/**
 * Get level data by ID
 * @param {number} id - The level ID
 * @returns {Object|null} Level data or null if not found
 */
export const getLevelById = (id) => {
  return levels.find(level => level.id === id) || null;
};

/**
 * Get all available levels
 * @returns {Array} Array of level data
 */
export const getAllLevels = () => {
  return [...levels];
};

/**
 * Get unlocked levels
 * @returns {Array} Array of unlocked level data
 */
export const getUnlockedLevels = () => {
  return levels.filter(level => !level.isLocked);
};

export default levels; 