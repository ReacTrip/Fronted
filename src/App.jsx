import React, { useEffect } from "react";
import { detailData } from "@/data/tripDataDetail";
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
import InterestTestPage from './pages/InterestTestPage/InterestTestPage';

// 각 여행지
import Jeju from './pages/TripPlacePage/Cities/Jeju';
import Seoul from './pages/TripPlacePage/Cities/Seoul';
import Busan from './pages/TripPlacePage/Cities/Busan';
import Daegu from './pages/TripPlacePage/Cities/Daegu';
import Gwangju from './pages/TripPlacePage/Cities/Gwangju';
import Daejeon from './pages/TripPlacePage/Cities/Daejeon';
import Incheon from './pages/TripPlacePage/Cities/Incheon';
import Ulsan from './pages/TripPlacePage/Cities/Ulsan';
import Pocheon from './pages/TripPlacePage/Cities/Pocheon';

const App = () => {
  useEffect(() => {
    // 항상 새로운 detailData로 덮어쓰기
    localStorage.setItem("trips", JSON.stringify(detailData));
  }, []);
  
  return (
    <MuiThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={muiTheme}>
        <CssBaseline />
        <GlobalStyles />
        <Router>
          <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<MainPage />} />
            
            {/* 기능 페이지 */}
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/interest-test" element={<InterestTestPage />} />
            <Route path="/my-trip" element={<MyTripPage />} />
            <Route path="/trip-place" element={<TripPlacePage />} />
            
            {/* 인증 페이지 */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
            
            {/* 도시 페이지 */}
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
};

export default App;