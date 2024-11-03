import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { muiTheme } from './styles/theme';
import GlobalStyles from './styles/globalStyles';

// 페이지 컴포넌트 import
import BudgetPage from './pages/BudgetPage/BudgetPage';
import MainPage from './pages/MainPage/MainPage';
import MyTripPage from './pages/MyTripPage/MyTripPage';
import TripPlacePage from './pages/TripPlacePage/TripPlacePage';
import LoginPage from './pages/auth/LoginPage/LoginPage';
import SignupPage from './pages/auth/SignupPage/SignupPage';

function App() {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={muiTheme}>
        <CssBaseline />
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/my-trip" element={<MyTripPage />} />
            <Route path="/trip-place" element={<TripPlacePage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
          </Routes>
        </Router>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
