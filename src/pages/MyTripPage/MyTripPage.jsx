import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  Tabs,
  Tab,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '@/components/common/Navbar/Navbar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { detailData } from '@/data/tripDataDetail';
import TabContent from '@/components/common/TabContent/TabContent';

// 스타일 적용
const StyledContainer = styled(Container)({
  maxWidth: '1200px !important',
  padding: '0 20px',
});

const PreviewCard = styled(Paper)({
  height: '180px',
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
  gap: 20,
});

// 임시 사용자 정보
const currentUser = {
  id: 1,
  name: '스키매니아',
};

// 여행 데이터
const tripData = [
  { id: 1, name: '파리 여행', userId: 1, image: trip1, date: '2024.12.20 - 2024.12.22' },
  { id: 2, name: '뉴욕 탐험', userId: 1, image: trip2, date: '2024.12.20 - 2024.12.22' },
  { id: 3, name: '도쿄 투어', userId: 1, image: trip3, date: '2024.12.20 - 2024.12.22' },
  { id: 4, name: '서울 관광', userId: 1, image: trip4, date: '2024.12.20 - 2024.12.22' },
  { id: 5, name: '런던 여행', userId: 1, image: trip5, date: '2024.12.20 - 2024.12.22' },
  { id: 6, name: '보이지 않는 여행', userId: 2, image: trip6, date: '2024.12.20 - 2024.12.22' },
];

// 이미지 import
import trip1 from '@/assets/images/main/trip1.png';
import trip2 from '@/assets/images/main/trip2.png';
import trip3 from '@/assets/images/main/trip3.png';
import trip4 from '@/assets/images/main/trip4.png';
import trip5 from '@/assets/images/main/trip5.png';
import trip6 from '@/assets/images/main/trip6.png';

const MyTripPage = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [tabValue, setTabValue] = useState(0); // 탭 상태 관리

  // 현재 탭 변경 함수
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // 상세 페이지로 이동
  const handleClick = () => {
    navigate('/budget', { state: { detail: detailData[0] } });
  };

  useEffect(() => {
    // 현재 사용자의 여행 목록 필터링
    const userTrips = tripData.filter((trip) => trip.userId === currentUser.id);
    setTrips(userTrips);
  }, []);

  const tabData = [
    { id: 0, label: '내 여행', data: trips },
    { id: 1, label: '작성한 글', data: [] }, // 작성한 글 데이터 추가 가능
    { id: 2, label: '좋아요 한 글', data: [] }, // 좋아요 한 글 데이터 추가 가능
  ];

  return (
    <StyledContainer>
      <Navbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {currentUser.name}님의 목록
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" sx={{ marginBottom: 3 }}>
          {tabData.map((tab) => (
            <Tab key={tab.id} label={tab.label} />
          ))}
        </Tabs>

        <TabContent data={tabData[tabValue].data} onCardClick={handleClick} />
      </Box>
    </StyledContainer>
  );
};

export default MyTripPage;