// Incheon.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// 인천 랜드마크 이미지 배열
import incheonRandmark1 from '@/assets/images/TripPlace/incheon/incheonRandmark1.png';
import incheonRandmark2 from '@/assets/images/TripPlace/incheon/incheonRandmark2.png';
import incheonRandmark3 from '@/assets/images/TripPlace/incheon/incheonRandmark3.png';

// 인천 관광지, 축제, 음식 이미지 임포트
import incheonAttraction1 from '@/assets/images/TripPlace/incheon/incheonAttraction1.png';
import incheonAttraction2 from '@/assets/images/TripPlace/incheon/incheonAttraction2.png';
import incheonAttraction3 from '@/assets/images/TripPlace/incheon/incheonAttraction3.png';

import incheonFestival1 from '@/assets/images/TripPlace/incheon/incheonFestival1.png';
import incheonFestival2 from '@/assets/images/TripPlace/incheon/incheonFestival2.png';
import incheonFestival3 from '@/assets/images/TripPlace/incheon/incheonFestival3.png';

import incheonFood1 from '@/assets/images/TripPlace/incheon/incheonFood1.png';
import incheonFood2 from '@/assets/images/TripPlace/incheon/incheonFood2.png';
import incheonFood3 from '@/assets/images/TripPlace/incheon/incheonFood3.png';

// 랜드마크 이미지 배열
const landmarkImages = [incheonRandmark1, incheonRandmark2, incheonRandmark3];

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

const Incheon = () => {
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
    { image: incheonAttraction1, title: '월미도' },
    { image: incheonAttraction2, title: '송도 센트럴파크' },
    { image: incheonAttraction3, title: '차이나타운' },
  ];

  const festivals = [
    { image: incheonFestival1, title: '송도 불꽃축제' },
    { image: incheonFestival2, title: '차이나타운 문화축제' },
    { image: incheonFestival3, title: '인천 펜타포트 록 페스티벌' },
  ];

  const foods = [
    { image: incheonFood1, title: '금문도' },
    { image: incheonFood2, title: '선녀풍' },
    { image: incheonFood3, title: '송도 마카롱' },
  ];

  return (
    <div>
      <Navbar />
      <HeroSection backgroundImage={landmarkImages[currentImageIndex]}>
        <HeroOverlay>
          <HeroTextContainer>
            <HeroTitle>인천</HeroTitle>
            <HeroSubtitle>2024 인천 자유여행 가볼만한 곳 추천</HeroSubtitle>
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

export default Incheon;
