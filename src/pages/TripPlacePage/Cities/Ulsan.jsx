// Ulsan.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// 울산 랜드마크 이미지 배열
import ulsanRandmark1 from '@/assets/images/TripPlace/ulsan/ulsanRandmark1.png';
import ulsanRandmark2 from '@/assets/images/TripPlace/ulsan/ulsanRandmark2.png';
import ulsanRandmark3 from '@/assets/images/TripPlace/ulsan/ulsanRandmark3.png';

// 울산 관광지, 축제, 음식 이미지 임포트
import ulsanAttraction1 from '@/assets/images/TripPlace/ulsan/ulsanAttraction1.png';
import ulsanAttraction2 from '@/assets/images/TripPlace/ulsan/ulsanAttraction2.png';
import ulsanAttraction3 from '@/assets/images/TripPlace/ulsan/ulsanAttraction3.png';

import ulsanFestival1 from '@/assets/images/TripPlace/ulsan/ulsanFestival1.png';
import ulsanFestival2 from '@/assets/images/TripPlace/ulsan/ulsanFestival2.png';
import ulsanFestival3 from '@/assets/images/TripPlace/ulsan/ulsanFestival3.png';

import ulsanFood1 from '@/assets/images/TripPlace/ulsan/ulsanFood1.png';
import ulsanFood2 from '@/assets/images/TripPlace/ulsan/ulsanFood2.png';
import ulsanFood3 from '@/assets/images/TripPlace/ulsan/ulsanFood3.png';

// 랜드마크 이미지 배열
const landmarkImages = [ulsanRandmark1, ulsanRandmark2, ulsanRandmark3];

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

const Ulsan = () => {
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
    { image: ulsanAttraction1, title: '태화강 국가 정원' },
    { image: ulsanAttraction2, title: '간절곶' },
    { image: ulsanAttraction3, title: '고래박물관' },
  ];

  const festivals = [
    { image: ulsanFestival1, title: '고래 축제' },
    { image: ulsanFestival2, title: '공업 축제' },
    { image: ulsanFestival3, title: '조선해양 축제' },
  ];

  const foods = [
    { image: ulsanFood1, title: '본가어탕' },
    { image: ulsanFood2, title: '언양 기와집 불고기' },
    { image: ulsanFood3, title: '하동식당' },
  ];

  return (
    <div>
      <Navbar />
      <HeroSection backgroundImage={landmarkImages[currentImageIndex]}>
        <HeroOverlay>
          <HeroTextContainer>
            <HeroTitle>울산</HeroTitle>
            <HeroSubtitle>2024 울산 자유여행 가볼만한 곳 추천</HeroSubtitle>
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

export default Ulsan;
