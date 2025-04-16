import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 50%,
      ${({ theme }) => `${theme.colors.primary}30`} 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.base};
  padding: ${({ theme, noPadding }) => noPadding ? '0' : theme.spacing.lg};
  overflow: hidden;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme, noPadding }) => noPadding ? '0' : theme.spacing.md};
  }
`;

const Layout = ({ children, noPadding = false }) => {
  return (
    <LayoutContainer>
      <Header />
      <Main noPadding={noPadding}>
        {children}
      </Main>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout; 