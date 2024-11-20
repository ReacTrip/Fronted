// Daejeon.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// 대전 랜드마크 이미지 배열
import daejeonRandmark1 from '@/assets/images/TripPlace/daejeon/daejeonRandmark1.png';
import daejeonRandmark2 from '@/assets/images/TripPlace/daejeon/daejeonRandmark2.png';
import daejeonRandmark3 from '@/assets/images/TripPlace/daejeon/daejeonRandmark3.png';

// 대전 관광지, 축제, 음식 이미지 임포트
import daejeonAttraction1 from '@/assets/images/TripPlace/daejeon/daejeonAttraction1.png';
import daejeonAttraction2 from '@/assets/images/TripPlace/daejeon/daejeonAttraction2.png';
import daejeonAttraction3 from '@/assets/images/TripPlace/daejeon/daejeonAttraction3.png';

import daejeonFestival1 from '@/assets/images/TripPlace/daejeon/daejeonFestival1.png';
import daejeonFestival2 from '@/assets/images/TripPlace/daejeon/daejeonFestival2.png';
import daejeonFestival3 from '@/assets/images/TripPlace/daejeon/daejeonFestival3.png';

import daejeonFood1 from '@/assets/images/TripPlace/daejeon/daejeonFood1.png';
import daejeonFood2 from '@/assets/images/TripPlace/daejeon/daejeonFood2.png';
import daejeonFood3 from '@/assets/images/TripPlace/daejeon/daejeonFood3.png';

// 랜드마크 이미지 배열
const landmarkImages = [daejeonRandmark1, daejeonRandmark2, daejeonRandmark3];

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

const Daejeon = () => {
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
    { image: daejeonAttraction1, title: '한밭수목원' },
    { image: daejeonAttraction2, title: '대전 엑스포다리' },
    { image: daejeonAttraction3, title: '뿌리공원' },
  ];

  const festivals = [
    { image: daejeonFestival1, title: '대전 사이언스 페스티벌' },
    { image: daejeonFestival2, title: '대전 국제 와인 페스티벌' },
    { image: daejeonFestival3, title: '대전 힐링 아트 페스티벌' },
  ];

  const foods = [
    { image: daejeonFood1, title: '성심당' },
    { image: daejeonFood2, title: '오씨 칼국수' },
    { image: daejeonFood3, title: '태평소국밥' },
  ];

  return (
    <div>
      <Navbar />
      <HeroSection backgroundImage={landmarkImages[currentImageIndex]}>
        <HeroOverlay>
          <HeroTextContainer>
            <HeroTitle>대전</HeroTitle>
            <HeroSubtitle>2024 대전 자유여행 가볼만한 곳 추천</HeroSubtitle>
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

export default Daejeon;
