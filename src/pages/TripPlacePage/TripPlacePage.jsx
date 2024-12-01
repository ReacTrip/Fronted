import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/common/Navbar/Navbar';
import { Typography, Box } from '@mui/material';
import CircleSection from '/src/components/common/CircleSection/CircleSection';

const TripPlacePage = () => {
  const navigate = useNavigate();

  // 현재 마우스 오버된 이미지와 텍스트 상태
  const [hoveredCity, setHoveredCity] = useState(null);

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

  const handleCityClick = (city) => {
    // 클릭 시 항상 /city 경로로 이동하며, 선택된 도시의 이름을 state로 전달
    navigate(`/city`, { state: { cityName: city.name } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

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
            onClick={() => handleCityClick(city)}
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
            transition: 'background-image 1s ease, opacity 1s ease', // 이미지 트랜지션 효과
            opacity: hoveredCity?.image ? 1 : 0, // 이미지가 없을 때는 투명하게 처리
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