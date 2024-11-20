// Jeju.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// 제주도 랜드마크 이미지 배열
import jejuRandmark1 from '@/assets/images/TripPlace/jeju/jejuRandmark1.png';
import jejuRandmark2 from '@/assets/images/TripPlace/jeju/jejuRandmark2.png';
import jejuRandmark3 from '@/assets/images/TripPlace/jeju/jejuRandmark3.png';

// 기존 관광지, 축제, 음식 이미지 임포트 유지
import jejuAttraction1 from '@/assets/images/TripPlace/jeju/jejuAttraction1.png';
import jejuAttraction2 from '@/assets/images/TripPlace/jeju/jejuAttraction2.png';
import jejuAttraction3 from '@/assets/images/TripPlace/jeju/jejuAttraction3.png';

import jejuFestival1 from '@/assets/images/TripPlace/jeju/jejuFestival1.png';
import jejuFestival2 from '@/assets/images/TripPlace/jeju/jejuFestival2.png';
import jejuFestival3 from '@/assets/images/TripPlace/jeju/jejuFestival3.png';

import jejuFood1 from '@/assets/images/TripPlace/jeju/jejuFood1.png';
import jejuFood2 from '@/assets/images/TripPlace/jeju/jejuFood2.png';
import jejuFood3 from '@/assets/images/TripPlace/jeju/jejuFood3.png';

// 랜드마크 이미지 배열
const landmarkImages = [jejuRandmark1, jejuRandmark2, jejuRandmark3];

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

const Jeju = () => {
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
    { image: jejuAttraction1, title: '에코랜드 테마파크' },
    { image: jejuAttraction2, title: '대포해안주상절리대' },
    { image: jejuAttraction3, title: '동문 재래시장' },
  ];

  const festivals = [
    { image: jejuFestival1, title: '정월대보름 들불축제' },
    { image: jejuFestival2, title: '성산일출축제' },
    { image: jejuFestival3, title: '서귀포 유채꽃 축제' },
  ];

  const foods = [
    { image: jejuFood1, title: '우진해장국' },
    { image: jejuFood2, title: '미영이네 식당' },
    { image: jejuFood3, title: '올래국수' },
  ];

  return (
    <div>
      <Navbar />
      <HeroSection backgroundImage={landmarkImages[currentImageIndex]}>
        <HeroOverlay>
          <HeroTextContainer>
            <HeroTitle>제주도</HeroTitle>
            <HeroSubtitle>2024 제주도 자유여행 가볼만한 곳 추천</HeroSubtitle>
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

export default Jeju;
