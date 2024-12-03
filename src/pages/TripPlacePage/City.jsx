import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Grid, Box, Typography, Button, Card as MuiCard, CardMedia, CardContent } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePlaceInfo } from '@/hooks/usePlaceInfo';
import { ResultSection } from '@/components/InterestTest/ResultSection';
import { placeData } from '@/data/placeData';
import StyledContainer from '@/components/tripPlace/StyledContainer';

import backgroundImage from "@/assets/images/background.jpg"; 
import hotAirBalloonImage from "@/assets/images/hot-air-balloon.png";
import anniversaryLogo from "@/assets/images/Timmerman.png"; 
import koreaImage from '@/assets/images/TripPlace/Korea.png';

// "어디로 갈까요?" 
// 검색 컨테이너 - 배경 이미지와 검색 UI를 포함

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${backgroundImage}) no-repeat center center/cover;
  height: 50vh;
  color: white;
  text-align: center;
  padding: 20px;
  position: relative;
`;

const SearchLogo = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  position: absolute;
  left: -40px;
  transform: translateX(-50%);
  max-width: 120px;
  margin-right: 10px;
`;

const SearchTitle = styled.h1`
  font-size: 3rem;
  margin: 30px 0;
  text-align: center;
  width: 100%;
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

const SectionTitle = styled.h2`
  margin: 40px 0 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

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

const StyledCardContent = styled.div` 
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

const City = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { cityName } = location.state || {};

  const [hoveredIndex, setHoveredIndex] = useState(null); // 인기 여행지 상태 관리
  const [searchInput, setSearchInput] = useState('');
  const { placeInfo, isLoading, error, activeCategory, setActiveCategory, fetchPlaceInfo, resetPlaceInfo } = usePlaceInfo();

  const [likedPlaces, setLikedPlaces] = useState(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likedPlaces')) || [];
    return savedLikes;
  });


  // 종아요 목록 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('likedPlaces', JSON.stringify(likedPlaces));
  }, [likedPlaces]);


  useEffect(() => {
    if (likedPlaces.length > 0) {
      localStorage.setItem('likedPlaces', JSON.stringify(likedPlaces));
    }
  }, [likedPlaces]);
  
  const [likes, setLikes] = useState(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likes')) || {};
    return savedLikes[cityName] || {
      attractions: new Array(attractions.length).fill(false),
      festivals: new Array(festivals.length).fill(false),
      foods: new Array(foods.length).fill(false),
    };
  });
  
  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem('likes')) || {};
    savedLikes[cityName] = likes;
    localStorage.setItem('likes', JSON.stringify(savedLikes));
  }, [likes, cityName]);

  const toggleLike = (section, index, title) => {
    setLikes((prevLikes) => {
      const updatedLikes = {
        ...prevLikes,
        [section]: prevLikes[section].map((liked, i) => (i === index ? !liked : liked)),
      };
      return updatedLikes;
    });
  
    setLikedPlaces((prevLikedPlaces) => {
      let updatedLikedPlaces;
      if (prevLikedPlaces.includes(title)) {
        updatedLikedPlaces = prevLikedPlaces.filter((place) => place !== title);
      } else {
        updatedLikedPlaces = [...prevLikedPlaces, title];
      }
      return updatedLikedPlaces;
    });
  };
  
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchPlaceInfo(searchInput, activeCategory);
    }
  };

  // 선택된 도시에 따라 placeData 필터링
  // 카테고리별 장소 필터링
  const attractions = placeData.filter((place) => place.place === cityName && place.category === 'touristAttraction');
  const festivals = placeData.filter((place) => place.place === cityName && place.category === 'festival');
  const foods = placeData.filter((place) => place.place === cityName && place.category === 'restaurant');

  const popularPlaces = [
    ...attractions.slice(0, 2),
    ...festivals.slice(0, 1),
    ...foods.slice(0, 2),
  ];

  return (
    <>
      <StyledContainer>
        <Navbar />
      </StyledContainer>
      <SearchContainer>
        <HotAirBalloon src={hotAirBalloonImage} alt="Hot Air Balloon" />
        <SearchLogo>
          <LogoImage src={anniversaryLogo} alt="Anniversary Logo" />
          <span>리액트립과 여행을 함께해요</span>
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
                onClick={() => navigate('/my-trip')}
              >
                플래너 시작하기
              </Button>
            </Grid>
          </Grid>
        </Box>

        <SectionTitle>인기 여행지</SectionTitle>
        <Grid
          container
          spacing={2}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(7, 1fr)',
            },
            gap: 2,
          }}
        >
          {popularPlaces.map((place, index) => (
            <Grid
              item
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              sx={{
                gridColumn: hoveredIndex === index ? 'span 3' : 'span 1',
                transition: 'grid-column 1.5s ease-in-out, transform 1.5s ease-in-out',
                height: '300px',
                overflow: 'hidden',
                position: 'relative',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <MuiCard
                sx={{
                  height: '100%',
                  position: 'relative',
                  boxShadow: hoveredIndex === index ? 8 : 2,
                  border: hoveredIndex === index ? '2px solid #ff6f61' : '1px solid #ddd',
                  transition: 'all 1.5s ease-in-out',
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
                    transition: 'transform 1.5s ease-in-out',
                    transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
                <CardContent
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'transparent',
                    color: 'white',
                    textAlign: 'center',
                    padding: '0',
                    backdropFilter: 'none',
                    transition: 'none',
                  }}
                >
                  {hoveredIndex === index && (
                    <Typography
                      sx={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        zIndex: 2,
                        textAlign: 'center',
                        opacity: hoveredIndex === index ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                      }}
                    >
                      {place.name}
                    </Typography>
                  )}
                </CardContent>
              </MuiCard>
            </Grid>
          ))}
        </Grid>
        
        <SectionTitle>관광지</SectionTitle>
        <GridContainer>
          {attractions.map((attraction, index) => (
            <CardWithHeart
              key={index}
              image={attraction.image}
              title={attraction.name}
              liked={likes.attractions[index]}
              onHeartClick={() => toggleLike('attractions', index, attraction.name)}
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
              title={festival.name}
              liked={likes.festivals[index]}
              onHeartClick={() => toggleLike('festivals', index, festival.name)}
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
              title={food.name}
              liked={likes.foods[index]}
              onHeartClick={() => toggleLike('foods', index, food.name)}
            />
          ))}
        </GridContainer>
      </StyledContainer>
    </>
  );
};

export default City;