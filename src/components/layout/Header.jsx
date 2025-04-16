import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const HeaderContainer = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.background},
    ${({ theme }) => theme.colors.backgroundAlt}
  );
  border-bottom: 1px solid rgba(138, 43, 226, 0.3);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.ui};
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      to right,
      transparent,
      ${({ theme }) => theme.colors.neonBlue},
      ${({ theme }) => theme.colors.neonPurple},
      ${({ theme }) => theme.colors.neonPink},
      transparent
    );
  }
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.fonts.tertiary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
`;

const LogoAccent = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, isActive }) => isActive ? theme.colors.accent : theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  position: relative;
  transition: color ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: ${({ isActive }) => isActive ? '100%' : '0'};
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transform: translateX(-50%);
    transition: width ${({ theme }) => theme.transitions.normal};
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
  }
`;

const Header = () => {
  const location = useLocation();
  
  return (
    <HeaderContainer
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <LogoContainer
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/">
          <Logo>
            Swipe<LogoAccent>Nexus</LogoAccent>
          </Logo>
        </Link>
      </LogoContainer>
      
      <Nav>
        <NavLink to="/" isActive={location.pathname === '/'}>
          Home
        </NavLink>
        <NavLink to="/play" isActive={location.pathname === '/play'}>
          Play
        </NavLink>
        <NavLink to="/levels" isActive={location.pathname === '/levels'}>
          Levels
        </NavLink>
        <NavLink to="/settings" isActive={location.pathname === '/settings'}>
          Settings
        </NavLink>
      </Nav>
      
      <MobileMenuButton aria-label="Menu">
        ≡
      </MobileMenuButton>
    </HeaderContainer>
  );
};

export default Header; 