import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import useAudio from '../hooks/useAudio';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SettingsTitle = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.tertiary};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.neonBlue};
`;

const SettingsGroup = styled.div`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;

const SettingsGroupTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  letter-spacing: 1px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary}30;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary}20;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
`;

const SettingDescription = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: ${({ theme }) => theme.colors.accent};
  }
  
  &:checked + span:before {
    transform: translateX(30px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.gray};
  transition: all 0.3s ease;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: all 0.3s ease;
    border-radius: 50%;
  }
`;

const VolumeSlider = styled.input`
  -webkit-appearance: none;
  width: 150px;
  height: 8px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 5px;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    cursor: pointer;
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.accent};
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    cursor: pointer;
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.accent};
    border: none;
  }
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 300px;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Settings = () => {
  const { muted, volume, toggleMute, adjustVolume, playSound } = useAudio();
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [highPerformanceMode, setHighPerformanceMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  
  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('swipeNexus_settings') || '{}');
    
    if (savedSettings.vibrationEnabled !== undefined) {
      setVibrationEnabled(savedSettings.vibrationEnabled);
    }
    
    if (savedSettings.highPerformanceMode !== undefined) {
      setHighPerformanceMode(savedSettings.highPerformanceMode);
    }
    
    if (savedSettings.debugMode !== undefined) {
      setDebugMode(savedSettings.debugMode);
    }
  }, []);
  
  // Save settings to localStorage when they change
  useEffect(() => {
    const settings = {
      vibrationEnabled,
      highPerformanceMode,
      debugMode
    };
    
    localStorage.setItem('swipeNexus_settings', JSON.stringify(settings));
  }, [vibrationEnabled, highPerformanceMode, debugMode]);
  
  // Toggle vibration setting
  const handleToggleVibration = () => {
    setVibrationEnabled(prev => !prev);
    playSound('CLICK');
  };
  
  // Toggle high performance mode
  const handleToggleHighPerformance = () => {
    setHighPerformanceMode(prev => !prev);
    playSound('CLICK');
  };
  
  // Toggle debug mode
  const handleToggleDebugMode = () => {
    setDebugMode(prev => !prev);
    playSound('CLICK');
  };
  
  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    adjustVolume(newVolume);
  };
  
  // Handle reset game progress
  const handleResetProgress = () => {
    // Clear game progress from localStorage
    localStorage.removeItem('swipeNexus_levels');
    localStorage.removeItem('swipeNexus_highScore');
    
    // Close modal
    setShowResetModal(false);
    
    // Play sound
    playSound('CLICK');
  };
  
  return (
    <Layout>
      <SettingsContainer>
        <SettingsTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Settings
        </SettingsTitle>
        
        <SettingsGroup>
          <SettingsGroupTitle>Audio Settings</SettingsGroupTitle>
          
          <SettingItem>
            <div>
              <SettingLabel>Sound Effects</SettingLabel>
              <SettingDescription>Enable or disable all sound effects</SettingDescription>
            </div>
            <ToggleSwitch>
              <ToggleInput 
                type="checkbox" 
                checked={!muted} 
                onChange={toggleMute} 
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>
          
          <SettingItem>
            <div>
              <SettingLabel>Volume</SettingLabel>
              <SettingDescription>Adjust the volume level</SettingDescription>
            </div>
            <VolumeSlider 
              type="range" 
              min="0" 
              max="1" 
              step="0.1" 
              value={volume}
              onChange={handleVolumeChange}
              disabled={muted}
            />
          </SettingItem>
        </SettingsGroup>
        
        <SettingsGroup>
          <SettingsGroupTitle>Game Settings</SettingsGroupTitle>
          
          <SettingItem>
            <div>
              <SettingLabel>Vibration</SettingLabel>
              <SettingDescription>Enable or disable haptic feedback</SettingDescription>
            </div>
            <ToggleSwitch>
              <ToggleInput 
                type="checkbox" 
                checked={vibrationEnabled} 
                onChange={handleToggleVibration} 
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>
          
          <SettingItem>
            <div>
              <SettingLabel>High Performance Mode</SettingLabel>
              <SettingDescription>Reduce visual effects for better performance</SettingDescription>
            </div>
            <ToggleSwitch>
              <ToggleInput 
                type="checkbox" 
                checked={highPerformanceMode} 
                onChange={handleToggleHighPerformance} 
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>
        </SettingsGroup>
        
        <SettingsGroup>
          <SettingsGroupTitle>Developer Options</SettingsGroupTitle>
          
          <SettingItem>
            <div>
              <SettingLabel>Debug Mode</SettingLabel>
              <SettingDescription>Show debug information during gameplay</SettingDescription>
            </div>
            <ToggleSwitch>
              <ToggleInput 
                type="checkbox" 
                checked={debugMode} 
                onChange={handleToggleDebugMode} 
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingItem>
        </SettingsGroup>
        
        <ButtonsContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button 
            variant="danger" 
            isFullWidth
            onClick={() => {
              setShowResetModal(true);
              playSound('CLICK');
            }}
          >
            Reset Game Progress
          </Button>
          
          <Link to="/">
            <Button 
              variant="accent" 
              isFullWidth
              onClick={() => playSound('CLICK')}
            >
              Back to Home
            </Button>
          </Link>
        </ButtonsContainer>
        
        <Modal
          isOpen={showResetModal}
          onClose={() => {
            setShowResetModal(false);
            playSound('CLICK');
          }}
          title="Reset Game Progress"
          size="small"
          footer={
            <ModalActions>
              <Button 
                variant="ghost" 
                onClick={() => {
                  setShowResetModal(false);
                  playSound('CLICK');
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="danger" 
                onClick={handleResetProgress}
              >
                Reset Progress
              </Button>
            </ModalActions>
          }
        >
          <p>Are you sure you want to reset all game progress? This action cannot be undone.</p>
          <p>This will reset all level progress, high scores, and achievements.</p>
        </Modal>
      </SettingsContainer>
    </Layout>
  );
};

export default Settings; 