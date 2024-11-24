import React from 'react';
import { Box, Typography } from '@mui/material';

const CircleSection = ({ city, index, total, onHover, onClick }) => {
  const angle = (index * 360) / total; // 각 섹션의 각도
  const translateX = 45 * Math.cos((angle * Math.PI) / 180); // X 좌표 계산
  const translateY = 45 * Math.sin((angle * Math.PI) / 180); // Y 좌표 계산

  return (
    <Box
      onMouseEnter={() => onHover(city.image, city.name)} // 마우스 오버 시 이미지와 이름 전달
      onMouseLeave={() => onHover(null, null)} // 마우스 떠남 시 초기화
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: `calc(50% + ${translateY}%)`,
        left: `calc(50% + ${translateX}%)`,
        width: {
            xs: '80px', // 기존 60px → 100px (모바일)
            sm: '100px', // 기존 80px → 120px (작은 화면)
            md: '140px', // 기존 100px → 160px (중간 화면)
            lg: '180px', // 기존 120px → 200px (큰 화면)
        },
          height: {
            xs: '80px',
            sm: '100px',
            md: '140px',
            lg: '180px',
        },
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translate(-50%, -50%) scale(1.1)',
        },
      }}
    >
      <img
        src={city.image}
        alt={city.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          bottom: '5px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: {
            xs: '0.5rem', // 모바일 크기
            sm: '0.7rem',
            md: '0.9rem',
            lg: '1rem',
          },
          textShadow: '0 0 5px rgba(0, 0, 0, 0.7)',
        }}
      >
        {city.name}
      </Typography>
    </Box>
  );
};

export default CircleSection;
