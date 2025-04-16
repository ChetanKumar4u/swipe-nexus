import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/globalStyles';
import theme from './styles/theme';

// Pages
import Home from './pages/Home';
import GamePlay from './pages/GamePlay';
import LevelSelect from './pages/LevelSelect';
import Settings from './pages/Settings';
import Achievements from './pages/Achievements';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/:levelId" element={<GamePlay />} />
          <Route path="/play" element={<Navigate to="/play/1" />} />
          <Route path="/levels" element={<LevelSelect />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
