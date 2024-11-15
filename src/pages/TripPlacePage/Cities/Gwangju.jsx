// Gwangju.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// 광주 랜드마크 이미지 배열
import gwangjuRandmark1 from '@/assets/images/TripPlace/gwangju/gwangjuRandmark1.png';
import gwangjuRandmark2 from '@/assets/images/TripPlace/gwangju/gwangjuRandmark2.png';
import gwangjuRandmark3 from '@/assets/images/TripPlace/gwangju/gwangjuRandmark3.png';

// 광주 관광지, 축제, 음식 이미지 임포트
import gwangjuAttraction1 from '@/assets/images/TripPlace/gwangju/gwangjuAttraction1.png';
import gwangjuAttraction2 from '@/assets/images/TripPlace/gwangju/gwangjuAttraction2.png';
import gwangjuAttraction3 from '@/assets/images/TripPlace/gwangju/gwangjuAttraction3.png';

import gwangjuFestival1 from '@/assets/images/TripPlace/gwangju/gwangjuFestival1.png';
import gwangjuFestival2 from '@/assets/images/TripPlace/gwangju/gwangjuFestival2.png';
import gwangjuFestival3 from '@/assets/images/TripPlace/gwangju/gwangjuFestival3.png';

import gwangjuFood1 from '@/assets/images/TripPlace/gwangju/gwangjuFood1.png';
import gwangjuFood2 from '@/assets/images/TripPlace/gwangju/gwangjuFood2.png';
import gwangjuFood3 from '@/assets/images/TripPlace/gwangju/gwangjuFood3.png';

// 랜드마크 이미지 배열
const landmarkImages = [gwangjuRandmark1, gwangjuRandmark2, gwangjuRandmark3];

// 배경 이미지와 오버레이 텍스트 스타일
const HeroSection = styled.div`
  position: relative;
  height: 400px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroTextContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin: 0;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-top: 10px;
`;

// 기타 기존 스타일 컴포넌트 유지
const Container = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  margin-top: 40px;
  margin-bottom: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const Divider = styled.hr`
  border: 1px solid #ccc;
  margin: 40px 0;
`;

const Card = styled.div`
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

const CardContent = styled.div`
  padding: 15px;
  text-align: center;
`;

const Gwangju = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? landmarkImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === landmarkImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const attractions = [
    { image: gwangjuAttraction1, title: '무등산' },
    { image: gwangjuAttraction2, title: '광주사직공원 전망타워' },
    { image: gwangjuAttraction3, title: '양림동 역사문화마을' },
  ];

  const festivals = [
    { image: gwangjuFestival1, title: '광주 비엔날레' },
    { image: gwangjuFestival2, title: '프린지 페스티벌' },
    { image: gwangjuFestival3, title: '충장 축제' },
  ];

  const foods = [
    { image: gwangjuFood1, title: '나주식당' },
    { image: gwangjuFood2, title: '미미원' },
    { image: gwangjuFood3, title: '궁전제과 충장점' },
  ];

  return (
    <div>
      <Navbar />
      <HeroSection backgroundImage={landmarkImages[currentImageIndex]}>
        <HeroOverlay>
          <HeroTextContainer>
            <HeroTitle>광주</HeroTitle>
            <HeroSubtitle>2024 광주 자유여행 가볼만한 곳 추천</HeroSubtitle>
          </HeroTextContainer>
        </HeroOverlay>
        <IconButton
          onClick={handlePrevClick}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          }}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          onClick={handleNextClick}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </HeroSection>

      <Container>
        <SectionTitle>관광지</SectionTitle>
        <GridContainer>
          {attractions.map((attraction, index) => (
            <Card key={index}>
              <CardImage src={attraction.image} alt={attraction.title} />
              <CardContent>
                <h3>{attraction.title}</h3>
              </CardContent>
            </Card>
          ))}
        </GridContainer>

        <Divider />

        <SectionTitle>축제</SectionTitle>
        <GridContainer>
          {festivals.map((festival, index) => (
            <Card key={index}>
              <CardImage src={festival.image} alt={festival.title} />
              <CardContent>
                <h3>{festival.title}</h3>
              </CardContent>
            </Card>
          ))}
        </GridContainer>

        <Divider />

        <SectionTitle>음식</SectionTitle>
        <GridContainer>
          {foods.map((food, index) => (
            <Card key={index}>
              <CardImage src={food.image} alt={food.title} />
              <CardContent>
                <h3>{food.title}</h3>
              </CardContent>
            </Card>
          ))}
        </GridContainer>
      </Container>
    </div>
  );
};

export default Gwangju;
