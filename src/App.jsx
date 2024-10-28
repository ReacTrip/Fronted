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

function App() {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={muiTheme}>
        <CssBaseline /> {/* MUI의 기본 스타일 초기화 */}
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/my-trip" element={<MyTripPage />} />
            <Route path="/trip-place" element={<TripPlacePage />} />
          </Routes>
        </Router>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
