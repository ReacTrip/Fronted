// Busan.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// 부산 랜드마크 이미지 배열
import busanRandmark1 from '@/assets/images/TripPlace/busan/busanRandmark1.png';
import busanRandmark2 from '@/assets/images/TripPlace/busan/busanRandmark2.png';
import busanRandmark3 from '@/assets/images/TripPlace/busan/busanRandmark3.png';

// 부산 관광지, 축제, 음식 이미지 임포트
import busanAttraction1 from '@/assets/images/TripPlace/busan/busanAttraction1.png';
import busanAttraction2 from '@/assets/images/TripPlace/busan/busanAttraction2.png';
import busanAttraction3 from '@/assets/images/TripPlace/busan/busanAttraction3.png';

import busanFestival1 from '@/assets/images/TripPlace/busan/busanFestival1.png';
import busanFestival2 from '@/assets/images/TripPlace/busan/busanFestival2.png';
import busanFestival3 from '@/assets/images/TripPlace/busan/busanFestival3.png';

import busanFood1 from '@/assets/images/TripPlace/busan/busanFood1.png';
import busanFood2 from '@/assets/images/TripPlace/busan/busanFood2.png';
import busanFood3 from '@/assets/images/TripPlace/busan/busanFood3.png';

// 랜드마크 이미지 배열
const landmarkImages = [busanRandmark1, busanRandmark2, busanRandmark3];

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

const Busan = () => {
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
    { image: busanAttraction1, title: '감천문화마을' },
    { image: busanAttraction2, title: '해운대 해변' },
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

  return (
    <div>
      <Navbar />
      <HeroSection backgroundImage={landmarkImages[currentImageIndex]}>
        <HeroOverlay>
          <HeroTextContainer>
            <HeroTitle>부산</HeroTitle>
            <HeroSubtitle>2024 부산 자유여행 가볼만한 곳 추천</HeroSubtitle>
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

export default Busan;
