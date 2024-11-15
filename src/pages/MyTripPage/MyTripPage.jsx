import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '@/components/common/Navbar/Navbar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {detailData} from '@/data/tripDataDetail'

const StyledContainer = styled(Container)({
  maxWidth: '1200px !important',
  padding: '0 20px',
});

// 미리보기
const PreviewCard = styled(Paper)({
  height: '280px',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '10px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
});

// 미리보기 이미지
const ImageSection = styled(Box)({
  width: '60%',
  position: 'relative',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  },
});

const ContentSection = styled(Box)({
  width: '40%',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 20
});

// 추후 무조건 수정해햐 하는 부분 - *임시 데이터 관련*
// *************************************************************************
// *************************************************************************
// 임시 사용자 정보
const currentUser = {
  id: 1,
  name: "스키매니아",
};

// 현재 여행 목록의 데이터는 MainPage에서 가져오지 않음
// 임시 여행 데이터를 사용하고 있음
// 추후 개선 필요
// 
// id     = 여행의 고유 id
// name   = 여행의 이름
// userId = 여행 템플릿의 작성자 id
const tripData = [
  { id: 1, name: "파리 여행", userId: 1, image: trip1, date: "2024.12.20 - 2024.12.22" },
  { id: 2, name: "뉴욕 탐험", userId: 1, image: trip2, date: "2024.12.20 - 2024.12.22" },
  { id: 3, name: "도쿄 투어", userId: 1, image: trip3, date: "2024.12.20 - 2024.12.22" },
  { id: 4, name: "서울 관광", userId: 1, image: trip4, date: "2024.12.20 - 2024.12.22" },
  { id: 5, name: "런던 여행", userId: 1, image: trip5, date: "2024.12.20 - 2024.12.22" },
  { id: 6, name: "보이지 않는 여행", userId: 2, image: trip6, date: "2024.12.20 - 2024.12.22" },
];

// 이미지 import
import trip1 from '@/assets/images/main/trip1.png';
import trip2 from '@/assets/images/main/trip2.png';
import trip3 from '@/assets/images/main/trip3.png';
import trip4 from '@/assets/images/main/trip4.png';
import trip5 from '@/assets/images/main/trip5.png';
import trip6 from '@/assets/images/main/trip6.png';

// *************************************************************************

// *************************************************************************

const MyTripPage = () => {

  const navigate = useNavigate();
  //detail페이지로 이동하는 함수
  const handleClick = () => {
    navigate('/budget', { state: { detail: detailData[0] }  });
  };
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // 현재 사용자의 여행 목록 필터링
    const userTrips = tripData.filter(trip => trip.userId === currentUser.id);
    setTrips(userTrips);
  }, []);

  return (
    <StyledContainer>
      <Navbar />

      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {currentUser.name}님의 여행 목록
        </Typography>
        <List>
          {trips.map((trip) => (
            <PreviewCard elevation={2} onClick={handleClick}>
              <ImageSection>
                <img src={trip.image} alt={trip.title} />
              </ImageSection>
              <ListItem key={trip.id} sx={{ borderBottom: '1px solid #ccc' }}>
                <ContentSection>
                  <Typography variant="h2" component="h2">
                    {trip.name}
                  </Typography>
                  <Box>
                    O박 O일
                  </Box>
                  <Box sx={{  display: 'flex', 
                              alignItems: 'center',
                              color: '#666'
                    }}>
                    <CalendarMonthIcon sx={{ fontSize: 18, mr: 1 }} />
                    <Typography sx={{ fontSize: '14px' }}>
                      {trip.date}
                    </Typography>
                  </Box>
                </ContentSection>
              </ListItem>
            </PreviewCard>
          ))}
        </List>
      </Box>

    </StyledContainer>
  );
};

export default MyTripPage;
