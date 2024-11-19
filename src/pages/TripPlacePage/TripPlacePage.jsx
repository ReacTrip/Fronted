import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/common/Navbar/Navbar';
import Carousel from 'react-material-ui-carousel';
import { Typography } from '@mui/material';

const TripPlacePage = () => {
  const navigate = useNavigate();

  const carouselItems = [
    { name: "서울", image: "/src/assets/images/TripPlace/seoul/seoulRandmark1.png" },
    { name: "제주", image: "/src/assets/images/TripPlace/jeju/jejuRandmark1.png" },
    { name: "광주", image: "/src/assets/images/TripPlace/gwangju/gwangjuRandmark1.png" },
    { name: "포천", image: "/src/assets/images/TripPlace/pocheon/pocheonRandmark1.png" },
    { name: "울산", image: "/src/assets/images/TripPlace/ulsan/ulsanRandmark1.png" },
    { name: "대구", image: "/src/assets/images/TripPlace/daegu/daeguRandmark1.png" },
    { name: "부산", image: "/src/assets/images/TripPlace/busan/busanRandmark1.png" },
    { name: "인천", image: "/src/assets/images/TripPlace/incheon/incheonRandmark1.png" },
    { name: "대전", image: "/src/assets/images/TripPlace/daejeon/daejeonRandmark1.png" },
  ];

  const cities = [
    { name: "서울", image: "/src/assets/images/TripPlace/Seoul.png", path: "seoul" },
    { name: "제주", image: "/src/assets/images/TripPlace/Jeju.png", path: "jeju" },
    { name: "광주", image: "/src/assets/images/TripPlace/Gwangju.png", path: "gwangju" },
    { name: "포천", image: "/src/assets/images/TripPlace/Pocheon.png", path: "pocheon" },
    { name: "울산", image: "/src/assets/images/TripPlace/Ulsan.png", path: "ulsan" },
    { name: "대구", image: "/src/assets/images/TripPlace/Daegu.png", path: "daegu" },
    { name: "부산", image: "/src/assets/images/TripPlace/Busan.png", path: "busan" },
    { name: "인천", image: "/src/assets/images/TripPlace/Incheon.png", path: "incheon" },
    { name: "대전", image: "/src/assets/images/TripPlace/Daejeon.png", path: "daejeon" },
  ];

  const handleCityClick = (path) => {
    navigate(`/trip/${path}`);
  };

  const maxWidth = '900px';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Carousel Section */}
      <div
        className="carousel-container"
        style={{
          padding: '16px 64px',
          marginBottom: '32px', // Carousel 아래 공간 추가
        }}
      >
        <Carousel
          navButtonsAlwaysVisible={true}
          indicators={true}
          animation="slide"
        >
          {carouselItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '100%',
                  maxWidth: '800px',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              />
              <Typography
                variant="h5"
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  color: 'white',
                  textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
                  fontWeight: '600',
                }}
              >
                {item.name}
              </Typography>
            </div>
          ))}
        </Carousel>
      </div>

      {/* 3x3 Grid Section */}
      <div
        className="container mx-auto"
        style={{
          padding: '16px 64px',
        }}
      >
        <div
          className="grid gap-6"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}
        >
          {cities.map((city, index) => (
            <div
              key={index}
              className="relative cursor-pointer"
              onClick={() => handleCityClick(city.path)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover shadow-md"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              {/* 그라데이션 오버레이 */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0))',
                  borderRadius: '8px',
                }}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  color: 'white',
                  fontSize: 'clamp(1rem, 2vw, 2rem)',
                  fontWeight: '600',
                  textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
                }}
              >
                {city.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripPlacePage;
