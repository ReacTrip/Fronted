import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/globalStyles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BudgetPage from './pages/BudgetPage/BudgetPage';
import MainPage from './pages/MainPage/MainPage';
import MyTripPage from './pages/MyTripPage/MyTripPage';
import TripPlacePage from './pages/TripPlacePage/TripPlacePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/my-trip" element={<MyTripPage />} />
          <Route path="/trip-place" element={<TripPlacePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
