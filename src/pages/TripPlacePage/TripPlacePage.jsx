// TripPlacePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/common/Navbar/Navbar';

const TripPlacePage = () => {
  const navigate = useNavigate();

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

  // 도시 클릭 시 해당 페이지로 이동하는 함수
  const handleCityClick = (path) => {
    navigate(`/trip/${path}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-10">

        <div
          className="grid gap-6"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
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
                  fontSize: 'clamp(1rem, 2vw, 2rem)', // 반응형 글씨 크기
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
