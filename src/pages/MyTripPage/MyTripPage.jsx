import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { previewData } from '@/data/tripData'; // named import 사용

const StyledContainer = styled(Container)({
  maxWidth: '1200px !important',
  padding: '0 20px',
});

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

const currentUser = {
  id: 1,
  name: "스키매니아",
};

const MyTripPage = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [open, setOpen] = useState(false); // 다이얼로그 상태
  const [newTripTitle, setNewTripTitle] = useState('');
  const [newTripDate, setNewTripDate] = useState('');
  const [newTripTags, setNewTripTags] = useState('');

  useEffect(() => {
    // `previewData`에서 현재 사용자가 작성한 여행 필터링
    const userTrips = previewData.filter((trip) => trip.author === currentUser.name);
    setTrips(userTrips);
  }, []);

  const handleClick = (trip) => {
    navigate('/budget', { state: { detail: trip } });
  };

  const handleAddTrip = () => {
    if (newTripTitle && newTripDate) {
      const newTrip = {
        id: Date.now(),
        title: newTripTitle,
        author: currentUser.name,
        image: '/images/trip1.png', // 기본 이미지
        date: newTripDate,
        tags: newTripTags.split(',').map((tag) => tag.trim()), // 태그를 쉼표로 구분
      };
      setTrips([...trips, newTrip]); // 여행 추가
      setOpen(false); // 다이얼로그 닫기
      setNewTripTitle(''); // 입력 초기화
      setNewTripDate('');
      setNewTripTags('');
    }
  };

  return (
    <StyledContainer>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {currentUser.name}님의 여행 목록
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{ marginBottom: 2 }}
        >
          여행 추가
        </Button>
        <List>
          {trips.map((trip) => (
            <PreviewCard key={trip.id} elevation={2} onClick={() => handleClick(trip)}>
              <ImageSection>
                <img src={trip.image} alt={trip.title} />
              </ImageSection>
              <ListItem sx={{ borderBottom: '1px solid #ccc' }}>
                <ContentSection>
                  <Typography variant="h5" component="h5">
                    {trip.title}
                  </Typography>
                  <Box>
                    <Typography sx={{ fontSize: '14px' }}>{trip.date}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#666',
                    }}
                  >
                    <CalendarMonthIcon sx={{ fontSize: 18, mr: 1 }} />
                    <Typography sx={{ fontSize: '14px' }}>
                      {trip.tags.join(', ')}
                    </Typography>
                  </Box>
                </ContentSection>
              </ListItem>
            </PreviewCard>
          ))}
        </List>
      </Box>

      {/* 여행 추가 다이얼로그 */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>새로운 여행 추가</DialogTitle>
        <DialogContent>
          <TextField
            label="여행 이름"
            value={newTripTitle}
            onChange={(e) => setNewTripTitle(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="여행 날짜"
            value={newTripDate}
            onChange={(e) => setNewTripDate(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="여행 태그 (쉼표로 구분)"
            value={newTripTags}
            onChange={(e) => setNewTripTags(e.target.value)}
            fullWidth
            margin="dense"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTrip}
            sx={{ marginTop: 2 }}
          >
            추가
          </Button>
        </DialogContent>
      </Dialog>
    </StyledContainer>
  );
};

export default MyTripPage;
