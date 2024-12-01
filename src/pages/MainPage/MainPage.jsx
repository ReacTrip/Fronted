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
  const [trips, setTrips] = useState([]); // 여행 데이터

  useEffect(() => {
    // 로컬 스토리지에서 데이터 로드 및 필터링
    const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const filteredTrips = storedTrips.filter(trip => trip.post === 1); // post 값이 1인 데이터만 필터링
    setTrips(filteredTrips);
  }, []);

  // 좋아요 클릭 핸들러
const handleLikeClick = (id) => {
  // 여행 데이터 업데이트
  const updatedTrips = trips.map((trip) => {
    if (trip.id === id) {
      const isLiked = trip.like === 1; // 현재 좋아요 여부 확인
      return {
        ...trip,
        like: isLiked ? 0 : 1, // like 상태 토글
        totalLike: isLiked ? trip.totalLike - 1 : trip.totalLike + 1, // totalLike 업데이트
      };
    }
    return trip;
  });

  setTrips(updatedTrips);
  localStorage.setItem("trips", JSON.stringify(updatedTrips)); // 업데이트된 여행 데이터 저장
};

  const handleMoreClick = () => {
    navigate('/trips');
  };

  // 상세 페이지로 이동
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
            {[...trips]
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
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default MainPage;
