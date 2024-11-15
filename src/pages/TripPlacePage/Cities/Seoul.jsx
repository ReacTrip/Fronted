// Seoul.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// 서울 랜드마크 이미지 배열
import seoulRandmark1 from '@/assets/images/TripPlace/seoul/seoulRandmark1.png';
import seoulRandmark2 from '@/assets/images/TripPlace/seoul/seoulRandmark2.png';
import seoulRandmark3 from '@/assets/images/TripPlace/seoul/seoulRandmark3.png';

// 서울 관광지, 축제, 음식 이미지 임포트
import seoulAttraction1 from '@/assets/images/TripPlace/seoul/seoulAttraction1.png';
import seoulAttraction2 from '@/assets/images/TripPlace/seoul/seoulAttraction2.png';
import seoulAttraction3 from '@/assets/images/TripPlace/seoul/seoulAttraction3.png';

import seoulFestival1 from '@/assets/images/TripPlace/seoul/seoulFestival1.png';
import seoulFestival2 from '@/assets/images/TripPlace/seoul/seoulFestival2.png';
import seoulFestival3 from '@/assets/images/TripPlace/seoul/seoulFestival3.png';

import seoulFood1 from '@/assets/images/TripPlace/seoul/seoulFood1.png';
import seoulFood2 from '@/assets/images/TripPlace/seoul/seoulFood2.png';
import seoulFood3 from '@/assets/images/TripPlace/seoul/seoulFood3.png';

// 랜드마크 이미지 배열
const landmarkImages = [seoulRandmark1, seoulRandmark2, seoulRandmark3];

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

const Seoul = () => {
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
    { image: seoulAttraction1, title: '경복궁' },
    { image: seoulAttraction2, title: '남산타워' },
    { image: seoulAttraction3, title: '별마당 도서관' },
  ];

  const festivals = [
    { image: seoulFestival1, title: '여의도 불꽃 축제' },
    { image: seoulFestival2, title: '드론 라이트 쇼' },
    { image: seoulFestival3, title: '서울 빛초롱 축제' },
  ];

  const foods = [
    { image: seoulFood1, title: '정식당' },
    { image: seoulFood2, title: '뚝배기집' },
    { image: seoulFood3, title: '한공간' },
  ];

  return (
    <div>
      <Navbar />
      <HeroSection backgroundImage={landmarkImages[currentImageIndex]}>
        <HeroOverlay>
          <HeroTextContainer>
            <HeroTitle>서울</HeroTitle>
            <HeroSubtitle>2024 서울 자유여행 가볼만한 곳 추천</HeroSubtitle>
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

export default Seoul;
