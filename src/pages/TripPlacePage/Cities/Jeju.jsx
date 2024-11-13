// Jeju.jsx
import React from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';

//제주도 대표 이미지 임포트
import jejuRandmark from '@/assets/images/TripPlace/jeju/jejuRandmark.png';

// 제주도 관광지 이미지 임포트
import jejuAttraction1 from '@/assets/images/TripPlace/jeju/jejuAttraction1.png';
import jejuAttraction2 from '@/assets/images/TripPlace/jeju/jejuAttraction2.png';
import jejuAttraction3 from '@/assets/images/TripPlace/jeju/jejuAttraction3.png';

// 제주도 축제 이미지 임포트
import jejuFestival1 from '@/assets/images/TripPlace/jeju/jejuFestival1.png';
import jejuFestival2 from '@/assets/images/TripPlace/jeju/jejuFestival2.png';
import jejuFestival3 from '@/assets/images/TripPlace/jeju/jejuFestival3.png';

// 제주도 음식 이미지 임포트
import jejuFood1 from '@/assets/images/TripPlace/jeju/jejuFood1.png';
import jejuFood2 from '@/assets/images/TripPlace/jeju/jejuFood2.png';
import jejuFood3 from '@/assets/images/TripPlace/jeju/jejuFood3.png';

// 배경 이미지와 오버레이 텍스트 스타일
const HeroSection = styled.div`
  position: relative;
  height: 400px;
  background-image: url(${jejuRandmark}); /* 배경 이미지를 원하는 이미지로 설정 */
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
  background-color: rgba(0, 0, 0, 0.5); /* 어두운 오버레이 */
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
  const attractions = [
    { image: jejuFood1, title: '제주 흑돼지' },
    { image: jejuFood2, title: '제주 은갈치' },
    { image: jejuFood3, title: '제주 고기국수' },
  ];

  const festivals = [
    { image: jejuFestival1, title: '정월대보름 들불축제' },
    { image: jejuFestival2, title: '성산일출축제' },
    { image: jejuFestival3, title: '제주 유채꽃 축제' },
  ];

  const foods = [
    { image: jejuAttraction1, title: '에코랜드 테마파크' },
    { image: jejuAttraction2, title: '대포해안주상절리대' },
    { image: jejuAttraction3, title: '동문 재래시장' },
  ];

  return (
    <div>
      <Navbar />
      <HeroSection>
        <HeroOverlay>
          <HeroTextContainer>
            <HeroTitle>제주도</HeroTitle>
            <HeroSubtitle>2024 제주도 자유여행 가볼만한 곳 추천</HeroSubtitle>
          </HeroTextContainer>
        </HeroOverlay>
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
