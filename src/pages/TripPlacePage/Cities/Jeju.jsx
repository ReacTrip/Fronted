import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';

// 제주도 랜드마크 이미지 배열
import jejuRandmark1 from '@/assets/images/TripPlace/jeju/jejuRandmark1.png';
import jejuRandmark2 from '@/assets/images/TripPlace/jeju/jejuRandmark2.png';
import jejuRandmark3 from '@/assets/images/TripPlace/jeju/jejuRandmark3.png';

// 관광지, 축제, 음식 이미지 배열
import jejuAttraction1 from '@/assets/images/TripPlace/jeju/jejuAttraction1.png';
import jejuAttraction2 from '@/assets/images/TripPlace/jeju/jejuAttraction2.png';
import jejuAttraction3 from '@/assets/images/TripPlace/jeju/jejuAttraction3.png';

import jejuFestival1 from '@/assets/images/TripPlace/jeju/jejuFestival1.png';
import jejuFestival2 from '@/assets/images/TripPlace/jeju/jejuFestival2.png';
import jejuFestival3 from '@/assets/images/TripPlace/jeju/jejuFestival3.png';

import jejuFood1 from '@/assets/images/TripPlace/jeju/jejuFood1.png';
import jejuFood2 from '@/assets/images/TripPlace/jeju/jejuFood2.png';
import jejuFood3 from '@/assets/images/TripPlace/jeju/jejuFood3.png';

// 랜드마크 배열
const landmarkImages = [jejuRandmark1, jejuRandmark2, jejuRandmark3];

// 스타일 컴포넌트
const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const HeroTextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin: 0;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-top: 10px;
`;

const SectionTitle = styled.h2`
  margin: 40px 0 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Card = styled.div`
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

const CardContent = styled.div`
  padding: 15px;
  text-align: center;
`;

const HeartIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 10;

  width: 30px; /* 동그라미 크기 */
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white; /* 동그라미 배경색 */
  border-radius: 50%; /* 동그라미 모양 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 그림자 효과 */

  svg {
    font-size: 1.5rem; /* 하트 크기 */
    fill: ${(props) => (props.liked ? 'red' : 'rgba(0, 0, 0, 0.2)')}; /* 기본 하트 색상 */
    color: #ccc; /* 하트 테두리 색상 */
    transition: fill 0.3s ease; /* 내부 색상 전환 애니메이션 */
  }

  &:hover svg {
    fill: red; /* Hover 시 하트 내부 색상만 빨간색 */
  }
`;

const CardWithHeart = ({ image, title, liked, onHeartClick }) => (
  <Card>
    <HeartIcon liked={liked} onClick={onHeartClick}>
      {liked ? <Favorite /> : <FavoriteBorder />}
    </HeartIcon>
    <CardImage src={image} alt={title} />
    <CardContent>
      <h3>{title}</h3>
    </CardContent>
  </Card>
);

const Jeju = () => {
  const [likes, setLikes] = useState({
    attractions: new Array(3).fill(false),
    festivals: new Array(3).fill(false),
    foods: new Array(3).fill(false),
  });

  const toggleLike = (section, index) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [section]: prevLikes[section].map((liked, i) =>
        i === index ? !liked : liked
      ),
    }));
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
    <StyledContainer>
      <Navbar />

      {/* 랜드마크 섹션 */}
      <div style={{ marginBottom: '32px', padding: '16px 64px' }}>
        <Carousel
          navButtonsAlwaysVisible={true}
          indicators={true}
          animation="slide"
          duration={500}
          autoPlay={true}
          interval={3000}
        >
          {landmarkImages.map((image, index) => (
            <div key={index} style={{ position: 'relative', textAlign: 'center' }}>
              <img
                src={image}
                alt={`랜드마크 ${index + 1}`}
                style={{
                  width: '100%',
                  maxWidth: '800px',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              />
              <HeroTextContainer>
                <HeroTitle>제주도</HeroTitle>
                <HeroSubtitle>{`랜드마크 ${index + 1}`}</HeroSubtitle>
              </HeroTextContainer>
            </div>
          ))}
        </Carousel>
      </div>

      {/* 관광지 섹션 */}
      <SectionTitle>관광지</SectionTitle>
      <GridContainer>
        {attractions.map((attraction, index) => (
          <CardWithHeart
            key={index}
            image={attraction.image}
            title={attraction.title}
            liked={likes.attractions[index]}
            onHeartClick={() => toggleLike('attractions', index)}
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
            title={festival.title}
            liked={likes.festivals[index]}
            onHeartClick={() => toggleLike('festivals', index)}
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
            title={food.title}
            liked={likes.foods[index]}
            onHeartClick={() => toggleLike('foods', index)}
          />
        ))}
      </GridContainer>
    </StyledContainer>
  );
};

export default Jeju;
