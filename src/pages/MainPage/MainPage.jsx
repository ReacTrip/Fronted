import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/common/Navbar/Navbar';
import TripCard from '@/components/common/TripCard/TripCard';
import KoreaMap from '@/components/map/KoreaMap';

const StyledContainer = styled(Container)({
  maxWidth: '1200px !important',
  padding: '0 20px',
});

const StartButton = styled(Button)({
  backgroundColor: '#000',
  color: '#fff',
  padding: '15px 30px',
  fontSize: '18px',
  '&:hover': {
    backgroundColor: '#333',
  },
});

const MainPage = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]); // 전체 여행 데이터
  const [visibleTrips, setVisibleTrips] = useState([]); // 현재 화면에 보여지는 여행 데이터
  const [visibleCount, setVisibleCount] = useState(4); // 한 번에 표시할 여행 개수

  useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const filteredTrips = storedTrips
      .filter(trip => trip.post === 1)
      .sort((a, b) => b.totalLike - a.totalLike);
  
    setTrips(filteredTrips);
  }, []); // 초기 로드 시 실행
  
  useEffect(() => {
    setVisibleTrips(trips.slice(0, visibleCount)); // trips 상태 변경 시 visibleTrips 업데이트
  }, [visibleCount, trips]); // visibleCount와 trips 의존성 추가

  // 좋아요 클릭 핸들러
  const handleLikeClick = (id) => {
    const updatedTrips = trips.map((trip) => {
      if (trip.id === id) {
        const isLiked = trip.like === 1;
        return {
          ...trip,
          like: isLiked ? 0 : 1,
          totalLike: isLiked ? trip.totalLike - 1 : trip.totalLike + 1,
        };
      }
      return trip;
    });

    setTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
  };

  const handleMoreClick = () => {
    // "더 많은 여행 보기" 버튼 클릭 시 표시 개수 증가
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleClick = (item) => {
    const { actions, ...data } = item;
    navigate('/budget', { state: { detail: data } });
  };

  return (
    <StyledContainer>
      <Navbar />

      <Box component="main" sx={{ textAlign: 'left', position: 'relative' }}>
        <Box sx={{ maxWidth: '600px' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '48px',
              marginBottom: '20px',
              fontWeight: 'bold',
              lineHeight: 1.2
            }}
          >
            기존에 경험하지 못한<br />
            새로운 여행 플래너
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '30px'
            }}
          >
            고민만 하던 여행 계획을 Reactrip를 통해 몇 분 만에 스케줄링 해보세요.
          </Typography>

          <StartButton variant="contained" disableElevation onClick={() => navigate('/my-trip')} >
            여행 계획 세우기
          </StartButton>
        </Box>

        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '500px'
        }}>
          <KoreaMap />
        </Box>

        <Box sx={{ mt: 6, mb: 6 }}>
          <Grid container spacing={3}>
            {[...visibleTrips]
              .sort((a, b) => b.totalLike - a.totalLike)
              .map((trip) => (
                <Grid item xs={6} key={trip.id}>
                  <TripCard
                    data={trip}
                    onLikeClick={handleLikeClick}
                    onCardClick={() => handleClick(trip)}
                  />
                </Grid>
            ))}
          </Grid>

          {visibleCount < trips.length && (
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              mt: 5
            }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '16px',
                  color: '#666',
                  mb: 2
                }}
              >
                더 많은 여행 일정이 준비되어 있습니다
              </Typography>
              <Button
                variant="outlined"
                onClick={handleMoreClick}
                sx={{
                  borderColor: '#000',
                  color: '#000',
                  padding: '12px 40px',
                  fontSize: '16px',
                  '&:hover': {
                    borderColor: '#333',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                더 많은 여행 보기
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default MainPage;
