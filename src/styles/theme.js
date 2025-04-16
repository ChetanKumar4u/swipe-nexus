const theme = {
  colors: {
    primary: '#4A00E0',
    secondary: '#8A2BE2',
    accent: '#00FFFF',
    background: '#0F0F1A',
    backgroundAlt: '#1A1A2E',
    text: '#FFFFFF',
    textSecondary: '#B3B3CC',
    success: '#00FF9D',
    warning: '#FFC700',
    danger: '#FF0055',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#7A7A8C',
    neonBlue: '#4DEEEA',
    neonPink: '#F000FF',
    neonPurple: '#8A00D4',
    darkPurple: '#29025A',
  },
  fonts: {
    primary: "'Orbitron', sans-serif",
    secondary: "'Rajdhani', sans-serif",
    tertiary: "'Syncopate', sans-serif",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem',
    xxxl: '3rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    circle: '50%',
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.14)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.16)',
    neon: (color) => `0 0 5px ${color}, 0 0 20px ${color}`,
    neonStrong: (color) => `0 0 10px ${color}, 0 0 30px ${color}, 0 0 50px ${color}`,
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  zIndices: {
    base: 0,
    game: 10,
    ui: 100,
    modal: 1000,
  },
};

export default theme; 