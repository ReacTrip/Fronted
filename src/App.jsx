import React, { useEffect } from "react";
import { detailData } from "@/data/tripDataDetail";
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { muiTheme } from './styles/theme';
import GlobalStyles from './styles/globalStyles';
import City from './pages/TripPlacePage/City';

// 페이지 컴포넌트 import
import BudgetPage from './pages/BudgetPage/BudgetPage';
import MainPage from './pages/MainPage/MainPage';
import MyTripPage from './pages/MyTripPage/MyTripPage';
import TripPlacePage from './pages/TripPlacePage/TripPlacePage';
import LoginPage from './pages/auth/LoginPage/LoginPage';
import SignupPage from './pages/auth/SignupPage/SignupPage';
import InterestTestPage from './pages/InterestTestPage/InterestTestPage';
import PhotoSpotPage from './pages/PhotoSpotPage/PhotoSpotPage';

const App = () => {
  useEffect(() => {
    // 기존 로컬스토리지 초기화 및 초기값 설정
    localStorage.clear();
    localStorage.setItem('likedPlaces', JSON.stringify([]));
    localStorage.setItem('likes', JSON.stringify({
      서울: {
        attractions: [false, false, false],
        festivals: [false, false, false],
        foods: [false, false, false],
      },
      제주: {
        attractions: [false, false, false],
        festivals: [false, false, false],
        foods: [false, false, false],
      },
      광주: {
        attractions: [false, false, false],
        festivals: [false, false, false],
        foods: [false, false, false],
      },
      포천: {
        attractions: [false, false, false],
        festivals: [false, false, false],
        foods: [false, false, false],
      },
      울산: {
        attractions: [false, false, false],
        festivals: [false, false, false],
        foods: [false, false, false],
      },
      대구: {
        attractions: [false, false, false],
        festivals: [false, false, false],
        foods: [false, false, false],
      },
      부산: {
        attractions: [false, false, false],
        festivals: [false, false, false],
        foods: [false, false, false],
      },
      인천: {
        attractions: [false, false, false],
        festivals: [false, false, false],
        foods: [false, false, false],
      },
      대전: {
        attractions: [false, false, false],
        festivals: [false, false, false],
        foods: [false, false, false],
      },
    }));
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
           <Route path="/photo-spot" element={<PhotoSpotPage />} />
           
           {/* 인증 페이지 */}
           <Route path="/auth/login" element={<LoginPage />} />
           <Route path="/auth/signup" element={<SignupPage />} />
           
           {/* City 경로 설정 */}
           <Route path="/city" element={<City />} />
         </Routes>
       </Router>
     </StyledThemeProvider>
   </MuiThemeProvider>
 );
};

export default App;