import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Grid, Box, Typography, Button, Card as MuiCard, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 훅
import { usePlaceInfo } from '@/hooks/usePlaceInfo';
import { ResultSection } from '@/components/InterestTest/ResultSection';

import backgroundImage from "@/assets/images/background.jpg"; // 배경 이미지
import hotAirBalloonImage from "@/assets/images/hot-air-balloon.png"; // 열기구 이미지
import anniversaryLogo from "@/assets/images/Timmerman.png"; 

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
    fill: ${(props) => (props.$liked ? 'red' : 'rgba(0, 0, 0, 0.2)')};
    color: #ccc;
    transition: fill 0.3s ease;
  }

  &:hover svg {
    fill: red;
  }
`;

// CardWithHeart 컴포넌트에서 liked 속성을 $liked로 변경
const CardWithHeart = ({ image, title, liked, onHeartClick }) => (
  <StyledCard>
    <HeartIcon $liked={liked} onClick={onHeartClick}>
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
  const [searchInput, setSearchInput] = useState('');
  const { placeInfo, isLoading, error, activeCategory, setActiveCategory, fetchPlaceInfo, resetPlaceInfo } = usePlaceInfo();
  
  const [likedPlaces, setLikedPlaces] = useState(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedPlaces')) || [];
    return savedLikes;
  });
  
  const [likes, setLikes] = useState(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likes')) || {
      attractions: new Array(3).fill(false),
      festivals: new Array(3).fill(false),
      foods: new Array(3).fill(false),
    };
    return savedLikes;
  });

  useEffect(() => {
    localStorage.setItem('likedPlaces', JSON.stringify(likedPlaces));
  }, [likedPlaces]);
  
  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  const toggleLike = (section, index, title) => {
    setLikes((prevLikes) => {
      const updatedLikes = {
        ...prevLikes,
        [section]: prevLikes[section].map((liked, i) =>
          i === index ? !liked : liked
        ),
      };
      localStorage.setItem('likes', JSON.stringify(updatedLikes)); // 로컬 스토리지 업데이트
      return updatedLikes;
    });
  
    setLikedPlaces((prevLikedPlaces) => {
      let updatedLikedPlaces;
      if (prevLikedPlaces.includes(title)) {
        updatedLikedPlaces = prevLikedPlaces.filter((place) => place !== title);
      } else {
        updatedLikedPlaces = [...prevLikedPlaces, title];
      }
      localStorage.setItem('likedPlaces', JSON.stringify(updatedLikedPlaces)); // 로컬 스토리지에 바로 저장
      return updatedLikedPlaces;
    });
  };

  useEffect(() => {
    if (likedPlaces.length > 0) {
      localStorage.setItem('likedPlaces', JSON.stringify(likedPlaces));
    }
  }, [likedPlaces]);
  
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchPlaceInfo(searchInput, activeCategory);
    }
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
          <Input value={searchInput} onChange={handleSearchChange} placeholder="가고 싶은 곳, 하고 싶은 것을 검색해보세요." />
          <SearchButton onClick={handleSearch}>🔍</SearchButton>
        </SearchBox>
      </SearchContainer>

      <ResultSection
        result={searchInput}
        placeInfo={placeInfo}
        isLoading={isLoading}
        error={error}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onReset={resetPlaceInfo}
        onPlaceInfoRequest={fetchPlaceInfo}
      />

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
        
        {/* 관광지 섹션 */}
        <SectionTitle>관광지</SectionTitle>
        <GridContainer>
          {attractions.map((attraction, index) => (
            <CardWithHeart
              key={index}
              image={attraction.image}
              title={attraction.title}
              liked={likes.attractions[index]}
              onHeartClick={() => toggleLike('attractions', index, attraction.title)}
            />
          ))}
        </GridContainer>

        {/* 축제 섹션 */}
        <SectionTitle>축제</SectionTitle>
        <GridContainer>
          {festivals.map((festival, index) => (
            <CardWithHeart
              key={index}
              image={festival.image}
              title={festival.title}
              liked={likes.festivals[index]}
              onHeartClick={() => toggleLike('festivals', index, festival.title)}
            />
          ))}
        </GridContainer>

        {/* 음식 섹션 */}
        <SectionTitle>음식</SectionTitle>
        <GridContainer>
          {foods.map((food, index) => (
            <CardWithHeart
              key={index}
              image={food.image}
              title={food.title}
              liked={likes.foods[index]}
              onHeartClick={() => toggleLike('foods', index, food.title)}
            />
          ))}
        </GridContainer>
      </StyledContainer>
    </>
  );
};

export default Busan;