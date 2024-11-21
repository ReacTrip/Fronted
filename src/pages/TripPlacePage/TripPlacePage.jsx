import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/common/Navbar/Navbar';
import Carousel from 'react-material-ui-carousel';
import { Typography, Box } from '@mui/material';
import CircleSection from '/src/components/common/CircleSection/CircleSection';

const TripPlacePage = () => {
  const navigate = useNavigate();

  // 현재 마우스 오버된 이미지와 텍스트 상태
  const [hoveredCity, setHoveredCity] = useState(null);

  // 랜드마크 이미지 데이터
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

  // 도시 이미지 데이터
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Carousel Section */}
      <Box sx={{ padding: '16px 64px', marginBottom: '32px' }}>
        <Carousel navButtonsAlwaysVisible indicators animation="slide">
          {carouselItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'relative',
                cursor: 'pointer',
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
                sx={{
                  position: 'absolute',
                  bottom: '20px',
                  color: 'white',
                  textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)',
                  fontWeight: '600',
                }}
              >
                {item.name}
              </Typography>
            </Box>
          ))}
        </Carousel>
      </Box>

      {/* Circular Grid Section */}
      <Box
        sx={{
          position: 'relative',
          margin: '64px auto',
          width: {
            xs: '300px', // 모바일
            sm: '500px', // 작은 화면
            md: '700px', // 중간 화면
            lg: '800px', // 큰 화면
          },
          height: {
            xs: '300px',
            sm: '500px',
            md: '700px',
            lg: '800px',
          },
          borderRadius: '50%',
          backgroundColor: 'white',
        }}
      >
        {cities.map((city, index) => (
          <CircleSection
            key={city.name}
            city={city}
            index={index}
            total={cities.length}
            onHover={(image, name) => setHoveredCity({ image, name })} // 마우스 오버 이벤트
            onClick={() => handleCityClick(city.path)}
          />
        ))}

        {/* 가운데 빈 원 */}
        <Box
          sx={{
            position: 'absolute',
            backgroundImage: hoveredCity?.image ? `url(${hoveredCity.image})` : 'none', // 상태에 따라 이미지 표시
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '50%',
            width: {
              xs: '120px', // 모바일 크기
              sm: '180px',
              md: '300px',
              lg: '360px',
            },
            height: {
              xs: '120px',
              sm: '180px',
              md: '300px',
              lg: '360px',
            },
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textShadow: '0 0 5px rgba(0, 0, 0, 0.7)',
            fontWeight: 'bold',
            fontSize: {
              xs: '0.6rem',
              sm: '0.8rem',
              md: '1rem',
              lg: '1.2rem',
            },
          }}
        >
          {hoveredCity?.name && (
            <Typography
              sx={{
                position: 'absolute',
                color: 'white',
                textShadow: '0px 0px 10px rgba(0,0,0,0.8)',
                fontSize: {
                  xs: '0.8rem',
                  sm: '1rem',
                  md: '1.5rem',
                  lg: '2rem',
                },
                fontWeight: 'bold', // 글씨 두께
                textAlign: 'center', // 가운데 정렬 
              }}
            >
              {hoveredCity.name}
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default TripPlacePage;
