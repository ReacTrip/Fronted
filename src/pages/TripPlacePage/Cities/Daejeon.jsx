import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';

// 대전 랜드마크 이미지 배열
import daejeonRandmark1 from '@/assets/images/TripPlace/daejeon/daejeonRandmark1.png';
import daejeonRandmark2 from '@/assets/images/TripPlace/daejeon/daejeonRandmark2.png';
import daejeonRandmark3 from '@/assets/images/TripPlace/daejeon/daejeonRandmark3.png';

// 대전 관광지, 축제, 음식 이미지 배열
import daejeonAttraction1 from '@/assets/images/TripPlace/daejeon/daejeonAttraction1.png';
import daejeonAttraction2 from '@/assets/images/TripPlace/daejeon/daejeonAttraction2.png';
import daejeonAttraction3 from '@/assets/images/TripPlace/daejeon/daejeonAttraction3.png';

import daejeonFestival1 from '@/assets/images/TripPlace/daejeon/daejeonFestival1.png';
import daejeonFestival2 from '@/assets/images/TripPlace/daejeon/daejeonFestival2.png';
import daejeonFestival3 from '@/assets/images/TripPlace/daejeon/daejeonFestival3.png';

import daejeonFood1 from '@/assets/images/TripPlace/daejeon/daejeonFood1.png';
import daejeonFood2 from '@/assets/images/TripPlace/daejeon/daejeonFood2.png';
import daejeonFood3 from '@/assets/images/TripPlace/daejeon/daejeonFood3.png';

// 랜드마크 배열
const landmarkImages = [daejeonRandmark1, daejeonRandmark2, daejeonRandmark3];

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

const Daejeon = () => {
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
                <HeroTitle>대전</HeroTitle>
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

export default Daejeon;
