import React from 'react';
import { 
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  Chip,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/common/Navbar/Navbar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';

// 이미지 import
import trip1 from '@/assets/images/main/trip1.png';
import trip2 from '@/assets/images/main/trip2.png';
import trip3 from '@/assets/images/main/trip3.png';
import trip4 from '@/assets/images/main/trip4.png';
import trip5 from '@/assets/images/main/trip5.png';
import trip6 from '@/assets/images/main/trip6.png';

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

const StyledChip = styled(Chip)({
  borderRadius: '5px',
  height: '24px',
  '& .MuiChip-label': {
    padding: '0 8px',
    fontSize: '12px',
  },
});

const previewData = [
  {
    id: 1,
    title: "제주도 3박 4일 여행",
    author: "여행러버",
    image: trip1,
    date: "2024.11.01 - 2024.11.04",
    tags: ["제주도", "휴양", "맛집"],
  },
  {
    id: 2,
    title: "부산 여행 코스",
    author: "부산사람",
    image: trip2,
    date: "2024.11.10 - 2024.11.12",
    tags: ["부산", "해운대", "광안리"],
  },
  {
    id: 3,
    title: "강원도 겨울 여행",
    author: "스키매니아",
    image: trip3,
    date: "2024.12.20 - 2024.12.22",
    tags: ["스키", "겨울", "강원도"],
  },
  {
    id: 4,
    title: "서울 당일치기",
    author: "도시여행가",
    image: trip4,
    date: "2024.11.15",
    tags: ["서울", "도시", "데이트"],
  },
  {
    id: 5,
    title: "경주 역사 여행",
    author: "역사탐방러",
    image: trip5,
    date: "2024.11.05 - 2024.11.07",
    tags: ["경주", "역사", "문화"],
  },
  {
    id: 6,
    title: "전주 한옥마을",
    author: "먹방여행가",
    image: trip6,
    date: "2024.11.08 - 2024.11.09",
    tags: ["전주", "한옥", "맛집"],
  },
];

const MainPage = () => {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/trips');
  };

  return (
    <StyledContainer>
      <Navbar />
      
      <Box component="main" sx={{ textAlign: 'left' }}>
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

        <StartButton variant="contained" disableElevation>
          여행 계획 세우기
        </StartButton>
        
        <Box sx={{ mt: 6, mb: 6 }}>
          <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
            {previewData.map((preview) => (
              <Grid item xs={6} key={preview.id} sx={{ padding: '12px' }}>
                <PreviewCard elevation={2}>
                  <ImageSection>
                    <img src={preview.image} alt={preview.title} />
                  </ImageSection>
                  <ContentSection>
                    <Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontSize: '20px',
                          fontWeight: '600',
                          marginBottom: '12px'
                        }}
                      >
                        {preview.title}
                      </Typography>

                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 2,
                        color: '#666'
                      }}>
                        <PersonIcon sx={{ fontSize: 18, mr: 1 }} />
                        <Typography sx={{ fontSize: '14px' }}>
                          {preview.author}
                        </Typography>
                      </Box>

                      <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '6px', 
                        mb: 2 
                      }}>
                        {preview.tags.map((tag, i) => (
                          <StyledChip 
                            key={i}
                            label={tag}
                            variant="outlined"
                          />
                        ))}
                      </Box>

                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        color: '#666'
                      }}>
                        <CalendarMonthIcon sx={{ fontSize: 18, mr: 1 }} />
                        <Typography sx={{ fontSize: '14px' }}>
                          {preview.date}
                        </Typography>
                      </Box>
                    </Box>
                  </ContentSection>
                </PreviewCard>
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