import React from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';

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

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 0px;
  font-size: 48px;
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
  margin: 40px 0; /* 위아래 40px 간격 추가 */
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
    <Container>
      <Navbar />
      <Title>제주도</Title>
      
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
  );
};

export default Jeju;
