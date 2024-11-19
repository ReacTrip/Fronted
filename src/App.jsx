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
import AddTripPage from './pages/MyTripPage/AddTripPage';
import TripPlacePage from './pages/TripPlacePage/TripPlacePage';
import LoginPage from './pages/auth/LoginPage/LoginPage';
import SignupPage from './pages/auth/SignupPage/SignupPage';
//각 여행지
import Jeju from './pages/TripPlacePage/Cities/Jeju';
import Seoul from './pages/TripPlacePage/Cities/Seoul';
import Busan from './pages/TripPlacePage/Cities/Busan';
import Daegu from './pages/TripPlacePage/Cities/Daegu';
import Gwangju from './pages/TripPlacePage/Cities/Gwangju';
import Daejeon from './pages/TripPlacePage/Cities/Daejeon';
import Incheon from './pages/TripPlacePage/Cities/Incheon';
import Ulsan from './pages/TripPlacePage/Cities/Ulsan';
import Pocheon from './pages/TripPlacePage/Cities/Pocheon';

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
            <Route path="/preference" element={<MyTripPage />} />
            <Route path="/my-trip" element={<MyTripPage />} />
            <Route path="/add-trip" element={<AddTripPage />} />
            <Route path="/trip-place" element={<TripPlacePage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
            {/* 도시 페이지 경로 추가 */}
            <Route path="/trip/jeju" element={<Jeju />} />
            <Route path="/trip/seoul" element={<Seoul />} />
            <Route path="/trip/busan" element={<Busan />} />
            <Route path="/trip/daegu" element={<Daegu />} />
            <Route path="/trip/gwangju" element={<Gwangju />} />
            <Route path="/trip/daejeon" element={<Daejeon />} />
            <Route path="/trip/incheon" element={<Incheon />} />
            <Route path="/trip/ulsan" element={<Ulsan />} />
            <Route path="/trip/pocheon" element={<Pocheon />} />
          </Routes>
        </Router>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
