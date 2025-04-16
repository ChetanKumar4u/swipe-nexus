import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Layout from '../components/layout/Layout';
import useAudio from '../hooks/useAudio';

const HomeContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  height: 100%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      ${({ theme }) => `${theme.colors.primary}20`} 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: -1;
    animation: pulseGradient 8s ease-in-out infinite;
    
    @keyframes pulseGradient {
      0%, 100% {
        opacity: 0.6;
        transform: scale(1);
      }
      50% {
        opacity: 1;
        transform: scale(1.2);
      }
    }
  }
`;

const BackgroundGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(to right, ${({ theme }) => theme.colors.primary}10 1px, transparent 1px),
    linear-gradient(to bottom, ${({ theme }) => theme.colors.primary}10 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: -2;
  transform-origin: center;
  animation: gridMove 20s linear infinite;
  
  @keyframes gridMove {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(1deg) scale(1.05);
    }
    100% {
      transform: rotate(0deg) scale(1);
    }
  }
`;

const CyberLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -3;
  overflow: hidden;

  &::before, &::after {
    content: '';
    position: absolute;
    background: ${({ theme }) => theme.colors.accent}20;
    opacity: 0.5;
  }

  &::before {
    height: 2px;
    width: 100%;
    top: 30%;
    left: -100%;
    animation: slideLine 15s linear infinite;
  }

  &::after {
    height: 2px;
    width: 100%;
    top: 70%;
    right: -100%;
    animation: slideLineReverse 12s linear infinite;
  }

  @keyframes slideLine {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes slideLineReverse {
    0% {
      right: -100%;
    }
    100% {
      right: 100%;
    }
  }
`;

const FloatingDigitalElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -3;
  pointer-events: none;
`;

const DigitalElement = styled(motion.div)`
  position: absolute;
  color: ${({ theme }) => theme.colors.primary}30;
  font-family: monospace;
  font-size: ${props => props.size}px;
  opacity: ${props => props.opacity};
  user-select: none;
`;

const CornerAccents = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  
  &::before, &::after, & .corner-bottom-left, & .corner-bottom-right {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    border-color: ${({ theme }) => theme.colors.accent}40;
    opacity: 0.8;
    animation: pulseBorder 4s ease-in-out infinite;
  }
  
  &::before {
    top: 20px;
    left: 20px;
    border-top: 2px solid;
    border-left: 2px solid;
  }
  
  &::after {
    top: 20px;
    right: 20px;
    border-top: 2px solid;
    border-right: 2px solid;
  }
  
  & .corner-bottom-left {
    bottom: 20px;
    left: 20px;
    border-bottom: 2px solid;
    border-left: 2px solid;
    animation-delay: 1s;
  }
  
  & .corner-bottom-right {
    bottom: 20px;
    right: 20px;
    border-bottom: 2px solid;
    border-right: 2px solid;
    animation-delay: 1s;
  }
  
  @keyframes pulseBorder {
    0%, 100% {
      opacity: 0.3;
      width: 40px;
      height: 40px;
    }
    50% {
      opacity: 0.8;
      width: 60px;
      height: 60px;
    }
  }
`;

const Title = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.tertiary};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.neonBlue},
               0 0 20px ${({ theme }) => theme.colors.neonBlue};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const Tagline = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl};
  line-height: 1.6;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const ButtonsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 300px;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const GlowingButton = styled(Button)`
  animation: neonPulse 2s infinite alternate;
  
  @keyframes neonPulse {
    from {
      box-shadow: 0 0 10px ${({ theme }) => theme.colors.accent}80,
                  0 0 20px ${({ theme }) => theme.colors.accent}40;
    }
    to {
      box-shadow: 0 0 15px ${({ theme }) => theme.colors.accent}90,
                  0 0 30px ${({ theme }) => theme.colors.accent}60;
    }
  }
`;

const OrbitingParticles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: -2;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: ${props => props.color};
  filter: blur(2px);
  opacity: ${props => props.opacity};
`;

const StarField = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  perspective: 500px;
  z-index: -4;
  transform-style: preserve-3d;
`;

const Star = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  border-radius: 50%;
  filter: blur(0.5px);
  box-shadow: 0 0 ${props => props.size * 2}px ${props => props.size / 2}px ${props => props.color};
`;

const ShootingStar = styled(motion.div)`
  position: absolute;
  width: ${props => props.size * 3}px;
  height: ${props => props.size}px;
  background: linear-gradient(90deg, transparent, ${props => props.color} 20%, ${props => props.color});
  border-radius: 50px;
  filter: blur(0.5px);
`;

const Nebula = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    ${props => props.color}40 0%,
    ${props => props.color}20 40%,
    ${props => props.color}05 70%,
    transparent 100%
  );
  filter: blur(${props => props.blur}px);
  mix-blend-mode: screen;
  z-index: -5;
`;

const homeContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      duration: 0.5
    }
  }
};

const childVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

const createParticles = (count) => {
  const particles = [];
  const colors = ['#4DEEEA', '#F000FF', '#8A00D4', '#00FFFF', '#4A00E0'];
  
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 6 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = Math.random() * 0.5 + 0.2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particles.push({ size, color, opacity, x, y, duration, delay, id: i });
  }
  
  return particles;
};

const createDigitalElements = (count) => {
  const elements = [];
  const symbols = [
    '01', '10', '001', '110', '101', '<>', '</>', '{...}', '0x', '==>', '[]', 
    '()', 'fn()', 'async', 'true', 'false', '&&', '||', '=>', '++', '--'
  ];
  
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 10 + 8;
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const opacity = Math.random() * 0.3 + 0.1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 30 + 20;
    const delay = Math.random() * 10;
    
    elements.push({ size, symbol, opacity, x, y, duration, delay, id: i });
  }
  
  return elements;
};

const createNebulae = (count) => {
  const nebulae = [];
  const colors = ['#4A00E0', '#8A00D4', '#F000FF', '#4DEEEA', '#00FFFF', '#27296d', '#5e4ae3'];
  
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 300 + 200;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const blur = Math.random() * 30 + 20;
    const duration = Math.random() * 60 + 30;
    const delay = Math.random() * 5;
    
    nebulae.push({
      size,
      color,
      x,
      y,
      blur,
      duration,
      delay,
      id: i
    });
  }
  
  return nebulae;
};

const createStars = (count) => {
  const stars = [];
  const colors = ['#ffffff', '#f5f5f5', '#eeeeee', '#e0f7fa', '#e3f2fd', '#f3e5f5'];
  
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 2 + 0.5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const distance = Math.random() * 400 + 100;
    const angle = Math.random() * 360;
    const speed = Math.random() * 40 + 20;
    const delay = Math.random() * 2;
    const opacity = Math.random() * 0.7 + 0.3;
    
    // Add orbital variation
    const orbitType = Math.floor(Math.random() * 3); // 0: circular, 1: elliptical, 2: spiral
    const eccentricity = Math.random() * 0.5 + 0.5; // For elliptical orbits
    const spiralRate = Math.random() * 0.2 + 0.1; // For spiral orbits
    
    // Add depth layer for parallax effect
    const layer = Math.floor(Math.random() * 3); // 0: back, 1: middle, 2: front
    
    stars.push({ 
      size, 
      color, 
      distance, 
      angle, 
      speed, 
      delay, 
      opacity,
      orbitType,
      eccentricity,
      spiralRate,
      layer,
      id: i 
    });
  }
  
  return stars;
};

const createShootingStars = (count) => {
  const shootingStars = [];
  const colors = ['#ffffff', '#f5f5f5', '#e0f7fa', '#e3f2fd'];
  
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 2 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const angle = Math.random() * 45 + 20; // 20-65 degrees
    const distance = Math.random() * 150 + 100;
    const duration = Math.random() * 2 + 1;
    const delay = Math.random() * 10 + i;
    
    shootingStars.push({
      size,
      color,
      startX,
      startY,
      angle,
      distance,
      duration,
      delay,
      id: i
    });
  }
  
  return shootingStars;
};

const Home = () => {
  const particles = React.useMemo(() => createParticles(20), []);
  const digitalElements = React.useMemo(() => createDigitalElements(15), []);
  const stars = React.useMemo(() => createStars(70), []);
  const shootingStars = React.useMemo(() => createShootingStars(10), []);
  const nebulae = React.useMemo(() => createNebulae(4), []);
  const { playSound, startBackgroundMusic } = useAudio();
  
  useEffect(() => {
    // Start background music when component mounts
    startBackgroundMusic();
    
    // Play click sound on button hover for better user feedback
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => playSound('CLICK'));
    });
    
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', () => playSound('CLICK'));
      });
    };
  }, [playSound, startBackgroundMusic]);
  
  const getStarAnimation = (star) => {
    // Apply different speed based on layer (parallax effect)
    const layerMultiplier = star.layer === 0 ? 0.7 : star.layer === 1 ? 1 : 1.3;
    const adjustedDistance = star.distance * layerMultiplier;
    
    // Different animation paths based on orbit type
    switch (star.orbitType) {
      case 1: // Elliptical orbit
        return {
          x: `calc(50% + ${adjustedDistance * star.eccentricity * Math.cos(star.angle)}px)`,
          y: `calc(50% + ${adjustedDistance * Math.sin(star.angle)}px)`,
          scale: [0.8, 1, 0.8],
          opacity: [star.opacity * 0.7, star.opacity, star.opacity * 0.7]
        };
      case 2: // Spiral orbit
        return {
          x: [
            `calc(50% + ${adjustedDistance * 0.7 * Math.cos(star.angle)}px)`,
            `calc(50% + ${adjustedDistance * Math.cos(star.angle)}px)`,
            `calc(50% + ${adjustedDistance * 1.3 * Math.cos(star.angle)}px)`
          ],
          y: [
            `calc(50% + ${adjustedDistance * 0.7 * Math.sin(star.angle)}px)`,
            `calc(50% + ${adjustedDistance * Math.sin(star.angle)}px)`,
            `calc(50% + ${adjustedDistance * 1.3 * Math.sin(star.angle)}px)`
          ],
          scale: [0.8, 1, 0.8],
          opacity: star.opacity
        };
      default: // Circular orbit
        return {
          x: `calc(50% + ${adjustedDistance * Math.cos(star.angle)}px)`,
          y: `calc(50% + ${adjustedDistance * Math.sin(star.angle)}px)`,
          rotate: [0, 360],
          scale: 1,
          opacity: star.opacity
        };
    }
  };
  
  return (
    <Layout>
      <HomeContainer
        variants={homeContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {nebulae.map(nebula => (
          <Nebula
            key={`nebula-${nebula.id}`}
            size={nebula.size}
            color={nebula.color}
            blur={nebula.blur}
            initial={{ 
              x: `${nebula.x}%`,
              y: `${nebula.y}%`,
              opacity: 0,
              scale: 0.8
            }}
            animate={{ 
              opacity: 0.6,
              scale: [0.8, 1.1, 0.9, 1.0],
              x: [`${nebula.x}%`, `${(nebula.x + 5) % 100}%`, `${(nebula.x - 2) % 100}%`, `${nebula.x}%`],
              y: [`${nebula.y}%`, `${(nebula.y - 3) % 100}%`, `${(nebula.y + 4) % 100}%`, `${nebula.y}%`],
            }}
            transition={{ 
              duration: nebula.duration,
              delay: nebula.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
        
        <StarField>
          {stars.map(star => (
            <Star
              key={`star-${star.id}`}
              size={star.size}
              color={star.color}
              style={{ 
                zIndex: -4 - star.layer // Apply depth with z-index
              }}
              initial={{ 
                opacity: 0,
                x: '50%',
                y: '50%',
                scale: 0
              }}
              animate={getStarAnimation(star)}
              transition={{ 
                duration: star.speed,
                delay: star.delay,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
          
          {shootingStars.map(shootingStar => (
            <ShootingStar
              key={`shooting-star-${shootingStar.id}`}
              size={shootingStar.size}
              color={shootingStar.color}
              initial={{ 
                x: `${shootingStar.startX}%`,
                y: `${shootingStar.startY}%`,
                opacity: 0,
                rotate: shootingStar.angle,
                scale: 0
              }}
              animate={{ 
                x: `calc(${shootingStar.startX}% + ${Math.cos(shootingStar.angle * Math.PI / 180) * shootingStar.distance}px)`,
                y: `calc(${shootingStar.startY}% + ${Math.sin(shootingStar.angle * Math.PI / 180) * shootingStar.distance}px)`,
                opacity: [0, 1, 0],
                scale: 1
              }}
              transition={{ 
                duration: shootingStar.duration,
                delay: shootingStar.delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 15 + 5,
                ease: 'easeOut'
              }}
            />
          ))}
        </StarField>
        
        <BackgroundGrid />
        <CyberLines />
        
        <FloatingDigitalElements>
          {digitalElements.map(element => (
            <DigitalElement
              key={`code-${element.id}`}
              size={element.size}
              opacity={element.opacity}
              initial={{ 
                x: `${element.x}%`, 
                y: `${element.y}%`,
                opacity: 0
              }}
              animate={{ 
                x: `${element.x}%`,
                y: [`${element.y}%`, `${(element.y + 10) % 100}%`, `${element.y}%`],
                opacity: [0, element.opacity, 0]
              }}
              transition={{ 
                duration: element.duration,
                delay: element.delay,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              {element.symbol}
            </DigitalElement>
          ))}
        </FloatingDigitalElements>
        
        <CornerAccents>
          <div className="corner-bottom-left"></div>
          <div className="corner-bottom-right"></div>
        </CornerAccents>
        
        <OrbitingParticles>
          {particles.map(particle => (
            <Particle
              key={particle.id}
              size={particle.size}
              color={particle.color}
              opacity={particle.opacity}
              initial={{ 
                x: `${particle.x}%`, 
                y: `${particle.y}%`,
                scale: 0
              }}
              animate={{ 
                x: [`${particle.x}%`, `${(particle.x + 30) % 100}%`, `${(particle.x + 15) % 100}%`, `${particle.x}%`],
                y: [`${particle.y}%`, `${(particle.y + 20) % 100}%`, `${(particle.y + 30) % 100}%`, `${particle.y}%`],
                scale: [0, 1, 0.5, 0]
              }}
              transition={{ 
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </OrbitingParticles>
        
        <Title
          variants={childVariants}
          className="neon-text"
        >
          Swipe Nexus
        </Title>
        
        <Tagline variants={childVariants}>
          Navigate through the digital realm, collect energy orbs, and avoid obstacles in this futuristic swipe-based game.
        </Tagline>
        
        <ButtonsContainer variants={childVariants}>
          <Link to="/play">
            <GlowingButton 
              variant="accent" 
              size="large" 
              isFullWidth
              onClick={() => playSound('CLICK')}
            >
              Play Now
            </GlowingButton>
          </Link>
          
          <Link to="/levels">
            <Button 
              variant="secondary" 
              size="large" 
              isFullWidth
              onClick={() => playSound('CLICK')}
            >
              Levels
            </Button>
          </Link>
          
          <Link to="/settings">
            <Button 
              variant="ghost" 
              size="large" 
              isFullWidth
              onClick={() => playSound('CLICK')}
            >
              Settings
            </Button>
          </Link>
        </ButtonsContainer>
      </HomeContainer>
    </Layout>
  );
};

export default Home; 