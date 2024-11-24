import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import { Grid, Box, Typography, Button, Card as MuiCard, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅

import backgroundImage from "@/assets/images/background.jpg"; // 배경 이미지
import hotAirBalloonImage from "@/assets/images/hot-air-balloon.png"; // 열기구 이미지
import anniversaryLogo from "@/assets/images/Timmerman.png"; 

// 랜드마크 이미지 배열
import busanRandmark1 from '@/assets/images/TripPlace/busan/busanRandmark1.png';
import busanRandmark2 from '@/assets/images/TripPlace/busan/busanRandmark2.png';
import busanRandmark3 from '@/assets/images/TripPlace/busan/busanRandmark3.png';

// 추가된 이미지
import koreaImage from '@/assets/images/TripPlace/Korea.png';

// 관광지, 축제, 음식 이미지 배열
import busanAttraction1 from '@/assets/images/TripPlace/busan/busanAttraction1.png';
import busanAttraction2 from '@/assets/images/TripPlace/busan/busanAttraction2.png';
import busanAttraction3 from '@/assets/images/TripPlace/busan/busanAttraction3.png';

import busanFestival1 from '@/assets/images/TripPlace/busan/busanFestival1.png';
import busanFestival2 from '@/assets/images/TripPlace/busan/busanFestival2.png';
import busanFestival3 from '@/assets/images/TripPlace/busan/busanFestival3.png';

import busanFood1 from '@/assets/images/TripPlace/busan/busanFood1.png';
import busanFood2 from '@/assets/images/TripPlace/busan/busanFood2.png';
import busanFood3 from '@/assets/images/TripPlace/busan/busanFood3.png';

// 랜드마크 배열
const landmarkImages = [busanRandmark1, busanRandmark2, busanRandmark3];

// "어디로 갈까요?" 스타일 추가
const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${backgroundImage}) no-repeat center center/cover;
  height: 40vh;
  color: white;
  text-align: center;
  padding: 20px;
  position: relative;
`;

const SearchLogo = styled.div`
  position: relative; /* 로고와 텍스트를 독립적으로 배치 */
  display: flex;
  justify-content: center; /* 텍스트를 부모 컨테이너 기준으로 중앙 정렬 */
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  position: absolute;
  left: -40px; /* 로고를 더 왼쪽으로 이동 */
  transform: translateX(-50%); /* 로고의 중심을 기준으로 이동 */
  max-width: 120px; /* 로고 크기 */
  margin-right: 10px; /* 로고와 텍스트 간격 */
`;

const SearchTitle = styled.h1`
  font-size: 3rem;
  margin: 30px 0; /* 로고와 간격을 줌 */
  text-align: center; /* 텍스트 자체를 중앙 정렬 */
  width: 100%; /* 부모 컨테이너 기준 중앙 정렬 */
`;

const SearchSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const Input = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: none;
  font-size: 1rem;
  outline: none;
`;

const SearchButton = styled.button`
  background: #00aaff;
  color: white;
  border: none;
  padding: 15px 20px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background: #0088cc;
  }
`;

const HotAirBalloon = styled.img`
  position: absolute;
  top: 20%;
  right: 10%;
  width: 150px;
`;

// 스타일 컴포넌트
const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  margin: 40px 0 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

// Card 컴포넌트 이름 변경 (StyledCard로 변경)
const StyledCard = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
`;

const StyledCardContent = styled.div` /* 이름 변경 */
  padding: 15px;
  text-align: center;
`;

const HeartIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 10;

  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  svg {
    font-size: 1.5rem;
    fill: ${(props) => (props.liked ? 'red' : 'rgba(0, 0, 0, 0.2)')};
    color: #ccc;
    transition: fill 0.3s ease;
  }

  &:hover svg {
    fill: red;
  }
`;

const CardWithHeart = ({ image, title, liked, onHeartClick }) => (
  <StyledCard> 
    <HeartIcon liked={liked} onClick={onHeartClick}>
      {liked ? <Favorite /> : <FavoriteBorder />}
    </HeartIcon>
    <CardImage src={image} alt={title} />
    <StyledCardContent>
      <h3>{title}</h3>
    </StyledCardContent>
  </StyledCard>
);

const Busan = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
  const [hoveredIndex, setHoveredIndex] = useState(null); // 인기 여행지 상태 관리
  const [likes, setLikes] = useState({
    attractions: new Array(3).fill(false),
    festivals: new Array(3).fill(false),
    foods: new Array(3).fill(false),
  });

  const toggleLike = (section, index) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [section]: prevLikes[section].map((liked, i) =>
        i === index ? !liked : liked
      ),
    }));
  };

  const attractions = [
    { image: busanAttraction1, title: '감천문화마을' },
    { image: busanAttraction2, title: '해운대 해수욕장' },
    { image: busanAttraction3, title: '송도 해상 케이블카' },
  ];

  const festivals = [
    { image: busanFestival1, title: '해운대 빛축제' },
    { image: busanFestival2, title: '부산불꽃축제' },
    { image: busanFestival3, title: '해운대 모래축제' },
  ];

  const foods = [
    { image: busanFood1, title: '초량밀면' },
    { image: busanFood2, title: '수변최고 돼지국밥' },
    { image: busanFood3, title: '해운대 씨앗호떡' },
  ];

  // 인기 여행지 데이터
  const popularPlaces = [
    { title: '감천문화마을', image: busanAttraction1 },
    { title: '해운대 해수욕장', image: busanAttraction2 },
    { title: '해운대 빛축제', image: busanFestival1 },
    { title: '초량밀면', image: busanFood1 },
    { title: '수변최고 돼지국밥', image: busanFood2 },
  ];

  return (
   
    <>
      <StyledContainer>
      <Navbar />
      </StyledContainer>
      {/* "어디로 갈까요?" UI */}
      <SearchContainer>
        <HotAirBalloon src={hotAirBalloonImage} alt="Hot Air Balloon" />
        <SearchLogo>
          <LogoImage src={anniversaryLogo} alt="Anniversary Logo" />
          <span>리엑트립과 여행을 함께해요</span>
        </SearchLogo>
        <SearchTitle>어디로 갈까요?</SearchTitle>
        <SearchSubtitle>당신이 꿈꾸는 여행을 저렴하면서도 간편하고 풍성하게!</SearchSubtitle>
        <SearchBox>
          <Input placeholder="가고 싶은 곳, 하고 싶은 것을 검색해보세요." />
          <SearchButton>🔍</SearchButton>
        </SearchBox>
      </SearchContainer>

      <StyledContainer>
        <Box sx={{ marginTop: '32px', marginBottom: '32px' }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <img
                  src={koreaImage}
                  alt="Korea landmarks"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Grid>

            {/* Right Section */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', marginBottom: '16px', lineHeight: 1.2 }}
              >
                한국을 여행하며<br /> 특별한 순간을 만들어 보세요.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: '#555', marginBottom: '24px', lineHeight: 1.6 }}
              >
                다양한 랜드마크, 음식, 축제를 통해 한국의 문화를 경험하세요. 플래너 기능으로 나만의 여행 계획을 만들어 보세요.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#ff6f61',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '12px 24px',
                  borderRadius: '24px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#ff3f30',
                  },
                }}
                onClick={() => navigate('/my-trip')} // 버튼 클릭 시 이동
              >
                플래너 시작하기
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* 인기 여행지 섹션 */}
        <SectionTitle>인기 여행지</SectionTitle>
        <Grid
          container
          spacing={2}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)', // 작은 화면에서는 2열
              sm: 'repeat(3, 1fr)', // 중간 화면에서는 3열
              md: 'repeat(7, 1fr)', // 기본: 7열
            },
            gap: 2,
          }}
        >
          {popularPlaces.map((place, index) => (
            <Grid
              item
              key={index}
              onMouseEnter={() => setHoveredIndex(index)} // 호버 시 인덱스 설정
              sx={{
                gridColumn: hoveredIndex === index ? 'span 3' : 'span 1', // 확장된 카드
                transition: 'grid-column 1.5s ease-in-out, transform 1.5s ease-in-out', // 옆으로 늘어나는 시간 조정
                height: '300px',
                overflow: 'hidden',
                position: 'relative',
                '&:hover': {
                  transform: 'scale(1.02)', // 확대 효과
                },
              }}
            >
              <MuiCard
                sx={{
                  height: '100%',
                  position: 'relative',
                  boxShadow: hoveredIndex === index ? 8 : 2,
                  border: hoveredIndex === index ? '2px solid #ff6f61' : '1px solid #ddd',
                  transition: 'all 1.5s ease-in-out', // 카드 전환 시간 조정
                }}
              >
                <CardMedia
                  component="img"
                  image={place.image}
                  alt={place.title}
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    filter: hoveredIndex === index ? 'brightness(85%)' : 'none',
                    transition: 'transform 1.5s ease-in-out', // 이미지 확대 전환 시간 동일하게 조정
                    transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
                <CardContent
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: hoveredIndex === index
                      ? 'rgba(0, 0, 0, 0.8)'
                      : 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    textAlign: 'center',
                    padding: '8px',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 1.5s ease-in-out', // 배경 전환 시간 조정
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: hoveredIndex === index ? '1.6rem' : '1rem',
                      transition: 'font-size 1.5s ease-in-out',
                    }}
                  >
                    {place.title}
                  </Typography>
                  {hoveredIndex === index && (
                    <Typography variant="body2" sx={{ marginTop: '8px', color: '#ccc' }}>
                      지금 가보세요! 인기 있는 여행지입니다.
                    </Typography>
                  )}
                </CardContent>
              </MuiCard>
            </Grid>
          ))}
        </Grid>

        <SectionTitle>랜드마크</SectionTitle>
        <div style={{ marginBottom: '32px', padding: '16px 64px' }}>
          <Carousel
            navButtonsAlwaysVisible={true} // 네비게이션 버튼 항상 표시
            indicators={true} // 하단 인디케이터 표시
            animation="slide" // 슬라이드 애니메이션
            duration={500} // 애니메이션 지속 시간 (500ms)
            autoPlay={true} // 자동 재생 활성화
            interval={4000} // 4초마다 슬라이드 전환
          >
            {landmarkImages.map((image, index) => (
              <div key={index} style={{ position: 'relative', textAlign: 'center' }}>
                <img
                  src={image}
                  alt={`랜드마크 ${index + 1}`}
                  style={{
                    width: '100%',
                    maxWidth: '1200px',
                    height: '300px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  랜드마크 {index + 1}
                </Typography>
              </div>
            ))}
          </Carousel>
        </div>
        
        {/* 기존 관광지, 축제, 음식 섹션 */}
        <SectionTitle>관광지</SectionTitle>
        <GridContainer>
          {attractions.map((attraction, index) => (
            <CardWithHeart
              key={index}
              image={attraction.image}
              title={attraction.title}
              liked={likes.attractions[index]}
              onHeartClick={() => toggleLike('attractions', index)}
            />
          ))}
        </GridContainer>

        <SectionTitle>축제</SectionTitle>
        <GridContainer>
          {festivals.map((festival, index) => (
            <CardWithHeart
              key={index}
              image={festival.image}
              title={festival.title}
              liked={likes.festivals[index]}
              onHeartClick={() => toggleLike('festivals', index)}
            />
          ))}
        </GridContainer>

        <SectionTitle>음식</SectionTitle>
        <GridContainer>
          {foods.map((food, index) => (
            <CardWithHeart
              key={index}
              image={food.image}
              title={food.title}
              liked={likes.foods[index]}
              onHeartClick={() => toggleLike('foods', index)}
            />
          ))}
        </GridContainer>
      </StyledContainer>
    </>
  );
};

export default Busan;
