import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { getAllAchievements } from '../data/achievements';
import useAudio from '../hooks/useAudio';

const AchievementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const PageTitle = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.tertiary};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.neonBlue};
`;

const StatsContainer = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.backgroundAlt}80;
  backdrop-filter: blur(10px);
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
`;

const StatValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: bold;
`;

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;

const FilterButton = styled.button`
  background: ${({ isActive, theme }) => 
    isActive ? theme.colors.accent : theme.colors.backgroundAlt};
  color: ${({ isActive, theme }) => 
    isActive ? theme.colors.textInverse : theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.accent}80;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ isActive, theme }) => 
      isActive ? theme.colors.accent : theme.colors.accent}30;
  }
`;

const AchievementsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const AchievementCard = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ isUnlocked, theme }) => 
    isUnlocked ? theme.colors.backgroundAlt : theme.colors.background}CC;
  border: 1px solid ${({ isUnlocked, theme }) => 
    isUnlocked ? theme.colors.accent : theme.colors.gray}60;
  box-shadow: ${({ isUnlocked }) => 
    isUnlocked ? '0 0 15px rgba(96, 221, 255, 0.2)' : 'none'};
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  
  ${({ isSecret, isUnlocked }) => isSecret && !isUnlocked && `
    filter: blur(3px);
    &:hover {
      filter: blur(0);
    }
  `}
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ isUnlocked, theme }) => 
      isUnlocked ? `0 5px 20px ${theme.colors.accent}40` : '0 5px 15px rgba(0, 0, 0, 0.1)'};
  }
`;

const AchievementIcon = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${({ isUnlocked, theme }) => 
    isUnlocked ? theme.colors.accent : theme.colors.gray};
  
  ${({ isSecret, isUnlocked }) => isSecret && !isUnlocked && `
    &:after {
      content: '?';
      position: absolute;
      font-size: 2.5rem;
      opacity: 0.7;
    }
  `}
`;

const AchievementTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ isUnlocked, theme }) => 
    isUnlocked ? theme.colors.text : theme.colors.gray};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

const AchievementDescription = styled.p`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ isUnlocked, theme }) => 
    isUnlocked ? theme.colors.textSecondary : theme.colors.gray}80;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  ${({ isSecret, isUnlocked }) => isSecret && !isUnlocked && `
    content: 'This achievement is still a mystery...';
  `}
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 3px;
  overflow: hidden;
  margin-top: auto;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.accent};
  width: ${({ progress }) => `${progress}%`};
  transition: width 0.5s ease;
`;

const SecretBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.warning}80;
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.xs}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const ButtonContainer = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const EmptyStateContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const EmptyStateText = styled.p`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 500px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Achievements = () => {
  const { playSound } = useAudio();
  const [achievements, setAchievements] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'unlocked', 'locked'
  const [stats, setStats] = useState({
    total: 0,
    unlocked: 0,
    completion: 0
  });
  
  // Load achievements from data and localStorage on mount
  useEffect(() => {
    const allAchievements = getAllAchievements();
    
    // Try to load saved achievement progress from localStorage
    const savedProgress = JSON.parse(localStorage.getItem('swipeNexus_achievements') || '{}');
    
    // Merge saved progress with achievement data
    const mergedAchievements = allAchievements.map(achievement => {
      const savedAchievement = savedProgress[achievement.id];
      
      if (savedAchievement) {
        return {
          ...achievement,
          isUnlocked: savedAchievement.isUnlocked || achievement.isUnlocked,
          progress: savedAchievement.progress || achievement.progress
        };
      }
      
      return achievement;
    });
    
    setAchievements(mergedAchievements);
    
    // Calculate stats
    const unlocked = mergedAchievements.filter(a => a.isUnlocked).length;
    const total = mergedAchievements.length;
    const completion = total > 0 ? Math.round((unlocked / total) * 100) : 0;
    
    setStats({
      total,
      unlocked,
      completion
    });
  }, []);
  
  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    playSound('CLICK');
  };
  
  // Filter achievements based on current filter
  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return achievement.isUnlocked;
    if (filter === 'locked') return !achievement.isUnlocked;
    return true;
  });
  
  // Render achievement description based on if it's secret and unlocked
  const renderDescription = (achievement) => {
    if (achievement.isSecret && !achievement.isUnlocked) {
      return "This achievement is still a mystery...";
    }
    return achievement.description;
  };
  
  // Render achievement icon
  const renderIcon = (achievement) => {
    // This is a placeholder. In a real app, you would use actual icons.
    if (achievement.isSecret && !achievement.isUnlocked) {
      return "?";
    }
    return achievement.icon || "🏆";
  };
  
  return (
    <Layout>
      <AchievementsContainer>
        <PageTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Achievements
        </PageTitle>
        
        <StatsContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StatItem>
            <StatValue>{stats.unlocked}</StatValue>
            <StatLabel>Unlocked</StatLabel>
          </StatItem>
          
          <StatItem>
            <StatValue>{stats.total}</StatValue>
            <StatLabel>Total</StatLabel>
          </StatItem>
          
          <StatItem>
            <StatValue>{stats.completion}%</StatValue>
            <StatLabel>Completion</StatLabel>
          </StatItem>
        </StatsContainer>
        
        <FilterContainer>
          <FilterButton 
            isActive={filter === 'all'} 
            onClick={() => handleFilterChange('all')}
          >
            All
          </FilterButton>
          
          <FilterButton 
            isActive={filter === 'unlocked'} 
            onClick={() => handleFilterChange('unlocked')}
          >
            Unlocked
          </FilterButton>
          
          <FilterButton 
            isActive={filter === 'locked'} 
            onClick={() => handleFilterChange('locked')}
          >
            Locked
          </FilterButton>
        </FilterContainer>
        
        <AnimatePresence mode="wait">
          {filteredAchievements.length > 0 ? (
            <AchievementsGrid
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredAchievements.map((achievement) => (
                <AchievementCard 
                  key={achievement.id}
                  isUnlocked={achievement.isUnlocked}
                  isSecret={achievement.isSecret}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {achievement.isSecret && <SecretBadge>Secret</SecretBadge>}
                  
                  <AchievementIcon 
                    isUnlocked={achievement.isUnlocked}
                    isSecret={achievement.isSecret}
                  >
                    {renderIcon(achievement)}
                  </AchievementIcon>
                  
                  <AchievementTitle isUnlocked={achievement.isUnlocked}>
                    {achievement.isSecret && !achievement.isUnlocked 
                      ? "???" 
                      : achievement.title}
                  </AchievementTitle>
                  
                  <AchievementDescription 
                    isUnlocked={achievement.isUnlocked}
                    isSecret={achievement.isSecret}
                  >
                    {renderDescription(achievement)}
                  </AchievementDescription>
                  
                  {!achievement.isUnlocked && (
                    <ProgressContainer>
                      <ProgressBar progress={achievement.progress || 0} />
                    </ProgressContainer>
                  )}
                </AchievementCard>
              ))}
            </AchievementsGrid>
          ) : (
            <EmptyStateContainer
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyStateIcon>🔍</EmptyStateIcon>
              <EmptyStateText>
                {filter === 'unlocked'
                  ? "You haven't unlocked any achievements yet. Keep playing to earn your first achievement!"
                  : filter === 'locked'
                  ? "No locked achievements found. You've mastered everything!"
                  : "No achievements found. Start playing to discover achievements!"}
              </EmptyStateText>
            </EmptyStateContainer>
          )}
        </AnimatePresence>
        
        <ButtonContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/">
            <Button 
              variant="accent" 
              onClick={() => playSound('CLICK')}
            >
              Back to Home
            </Button>
          </Link>
        </ButtonContainer>
      </AchievementsContainer>
    </Layout>
  );
};

export default Achievements; 