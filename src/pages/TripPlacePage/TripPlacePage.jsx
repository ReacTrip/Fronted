import React from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

//이미지 임포트
import Busan from '@/assets/images/TripPlace/Busan.png';
import Daegu from '@/assets/images/TripPlace/Daegu.png';
import Incheon from '@/assets/images/TripPlace/Incheon.png';
import Gwangju from '@/assets/images/TripPlace/Gwangju.png';
import Daejeon from '@/assets/images/TripPlace/Daejeon.png';
import Ulsan from '@/assets/images/TripPlace/Ulsan.png';
import Jeju from '@/assets/images/TripPlace/Jeju.png';
import Seoul from '@/assets/images/TripPlace/Seoul.png';
import Pocheon from '@/assets/images/TripPlace/Pocheon.png';
import KoreaFlag from '@/assets/images/TripPlace/KoreaFlag.png';

const Container = styled.div`
  padding: 10px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const PlaceCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  &:hover .overlay {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const cities = [
  { name: '제주', path: 'jeju', image: Jeju },
  { name: '서울', path: 'seoul', image: Seoul },
  { name: '광주', path: 'gwangju', image: Gwangju },
  { name: '대구', path: 'daegu', image: Daegu },
  { name: '울산', path: 'ulsan', image: Ulsan },
  { name: '포천', path: 'pocheon', image: Pocheon },
  { name: '부산', path: 'busan', image: Busan },
  { name: '인천', path: 'incheon', image: Incheon },
  { name: '대전', path: 'daejeon', image: Daejeon },
];

const TripPlacePage = () => {
  const navigate = useNavigate();

  const handlePlaceClick = (cityPath) => {
    navigate(`/trip/${cityPath}`);
  };

  return (
    <Container>
      <Navbar />
      <GridContainer>
        {cities.map((city) => (
          <PlaceCard key={city.name} onClick={() => handlePlaceClick(city.path)}>
            <img src={city.image} alt={city.name} />
            <Overlay className="overlay">{city.name}</Overlay>
          </PlaceCard>
        ))}
      </GridContainer>
    </Container>
  );
};

export default TripPlacePage;