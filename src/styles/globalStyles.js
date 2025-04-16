import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Syncopate:wght@400;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    touch-action: none;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.tertiary};
    font-weight: 700;
    letter-spacing: 1.5px;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  button {
    font-family: ${({ theme }) => theme.fonts.secondary};
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  /* Removes blue highlight on Chrome for Android */
  * {
    -webkit-tap-highlight-color: transparent;
  }

  /* Game specific global styles */
  .neon-text {
    text-shadow: 0 0 5px ${({ theme }) => theme.colors.accent}, 
                 0 0 10px ${({ theme }) => theme.colors.accent}, 
                 0 0 20px ${({ theme }) => theme.colors.accent};
  }

  .neon-border {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.accent}, 
                0 0 10px ${({ theme }) => theme.colors.accent};
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes glow {
    0% {
      box-shadow: 0 0 5px ${({ theme }) => theme.colors.neonBlue};
    }
    50% {
      box-shadow: 0 0 20px ${({ theme }) => theme.colors.neonBlue}, 
                  0 0 30px ${({ theme }) => theme.colors.neonBlue};
    }
    100% {
      box-shadow: 0 0 5px ${({ theme }) => theme.colors.neonBlue};
    }
  }
`;

export default GlobalStyles; 