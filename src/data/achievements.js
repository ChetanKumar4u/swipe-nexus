/**
 * Game achievements configuration
 * Each achievement has criteria for unlocking and rewards
 */
const achievements = [
  {
    id: 'first_game',
    title: 'Digital Novice',
    description: 'Play your first game.',
    icon: '🎮',
    criteria: {
      type: 'GAMES_PLAYED',
      target: 1
    },
    isSecret: false,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'collector',
    title: 'Energy Collector',
    description: 'Collect 10 energy orbs in a single game.',
    icon: '⚡',
    criteria: {
      type: 'ENERGY_COLLECTED',
      target: 10,
      inSingleGame: true
    },
    isSecret: false,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'master_collector',
    title: 'Energy Master',
    description: 'Collect 50 energy orbs in total.',
    icon: '🔋',
    criteria: {
      type: 'ENERGY_COLLECTED',
      target: 50
    },
    isSecret: false,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Collect 3 speed boosts in a single game.',
    icon: '⚡',
    criteria: {
      type: 'SPEED_BOOSTS_COLLECTED',
      target: 3,
      inSingleGame: true
    },
    isSecret: false,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'shield_master',
    title: 'Shield Bearer',
    description: 'Use a shield to survive a collision with a barrier.',
    icon: '🛡️',
    criteria: {
      type: 'SHIELD_BLOCKS',
      target: 1
    },
    isSecret: false,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'level_1_complete',
    title: 'Neural Explorer',
    description: 'Complete the Neural Gateway level.',
    icon: '🧠',
    criteria: {
      type: 'LEVEL_COMPLETED',
      target: 1
    },
    isSecret: false,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'level_2_complete',
    title: 'Data Surfer',
    description: 'Complete the Data Stream level.',
    icon: '🌊',
    criteria: {
      type: 'LEVEL_COMPLETED',
      target: 2
    },
    isSecret: false,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'level_3_complete',
    title: 'Firewall Hacker',
    description: 'Complete the Firewall Breach level.',
    icon: '🔥',
    criteria: {
      type: 'LEVEL_COMPLETED',
      target: 3
    },
    isSecret: false,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'level_4_complete',
    title: 'Quantum Navigator',
    description: 'Complete the Quantum Maze level.',
    icon: '🌀',
    criteria: {
      type: 'LEVEL_COMPLETED',
      target: 4
    },
    isSecret: false,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'level_5_complete',
    title: 'Neon Master',
    description: 'Complete the Neon Nexus level.',
    icon: '👑',
    criteria: {
      type: 'LEVEL_COMPLETED',
      target: 5
    },
    isSecret: false,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'high_score_20',
    title: 'Digital Prodigy',
    description: 'Reach a score of 20 in any level.',
    icon: '🏆',
    criteria: {
      type: 'HIGH_SCORE',
      target: 20
    },
    isSecret: false,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'high_score_50',
    title: 'Neon Legend',
    description: 'Reach a score of 50 in any level.',
    icon: '🌟',
    criteria: {
      type: 'HIGH_SCORE',
      target: 50
    },
    isSecret: false,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'perfect_run',
    title: 'Flawless Run',
    description: 'Complete a level without any collisions.',
    icon: '✨',
    criteria: {
      type: 'PERFECT_LEVEL',
      target: 1
    },
    isSecret: true,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'persistent',
    title: 'Digital Persistence',
    description: 'Play 10 games in total.',
    icon: '🔄',
    criteria: {
      type: 'GAMES_PLAYED',
      target: 10
    },
    isSecret: false,
    isUnlocked: false,
    progress: 0
  },
  {
    id: 'game_master',
    title: 'Swipe Nexus Master',
    description: 'Unlock all other achievements.',
    icon: '🏅',
    criteria: {
      type: 'ALL_ACHIEVEMENTS',
      target: 14 // Total number of other achievements
    },
    isSecret: true,
    isUnlocked: false,
    progress: 0
  }
];

/**
 * Achievement types enum
 */
export const AchievementTypes = {
  GAMES_PLAYED: 'GAMES_PLAYED',
  ENERGY_COLLECTED: 'ENERGY_COLLECTED',
  SPEED_BOOSTS_COLLECTED: 'SPEED_BOOSTS_COLLECTED',
  SHIELD_BLOCKS: 'SHIELD_BLOCKS',
  LEVEL_COMPLETED: 'LEVEL_COMPLETED',
  HIGH_SCORE: 'HIGH_SCORE',
  PERFECT_LEVEL: 'PERFECT_LEVEL',
  ALL_ACHIEVEMENTS: 'ALL_ACHIEVEMENTS'
};

/**
 * Get all achievements
 * @returns {Array} Array of all achievements
 */
export const getAllAchievements = () => {
  return [...achievements];
};

/**
 * Get unlocked achievements
 * @param {Array} userAchievements - User's achievements with unlock status
 * @returns {Array} Array of unlocked achievements
 */
export const getUnlockedAchievements = (userAchievements = achievements) => {
  return userAchievements.filter(achievement => achievement.isUnlocked);
};

/**
 * Get achievement by ID
 * @param {string} id - Achievement ID
 * @returns {Object|null} Achievement object or null if not found
 */
export const getAchievementById = (id) => {
  return achievements.find(achievement => achievement.id === id) || null;
};

export default achievements; 