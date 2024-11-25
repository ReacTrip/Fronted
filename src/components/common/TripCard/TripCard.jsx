import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  IconButton,
  Chip 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const PreviewCard = styled(Paper)({
  height: '280px',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '10px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
});

const ImageSection = styled(Box)({
  width: '60%',
  position: 'relative',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  },
});

const ContentSection = styled(Box)({
  width: '40%',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const LikeButton = styled(IconButton)({
  position: 'absolute',
  right: '10px',
  bottom: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '8px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});

const TripCard = ({ data, onLikeClick, onCardClick }) => {
  return (
    <PreviewCard elevation={2} onClick={onCardClick}>
      <ImageSection>
        <img src={data.mainImage} alt={data.title} />
      </ImageSection>
      <ContentSection>
        <Box>
          {/* Title */}
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '12px'
            }}
          >
            {data.title}
          </Typography>

          {/* Author */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2,
            color: '#666'
          }}>
            <PersonIcon sx={{ fontSize: 18, mr: 1 }} />
            <Typography sx={{ fontSize: '14px' }}>
              {data.AuthorId}
            </Typography>
          </Box>

          {/* Description */}
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ marginBottom: '16px' }}
          >
            {data.description}
          </Typography>

          {/* Dates */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            color: '#666'
          }}>
            <CalendarMonthIcon sx={{ fontSize: 18, mr: 1 }} />
            {/* 날짜 데이터 형식을 - 에서 . 으로 변경 */}

            <Typography sx={{ fontSize: '14px' }}>
              {data.startDate && data.endDate
                ? `${data.startDate.replace(/-/g, '.')} ~ ${data.endDate.replace(/-/g, '.')}`
                : '날짜 정보 없음'}
            </Typography>

          </Box>
        </Box>
      </ContentSection>
      {/* 좋아요 아이콘 */}
      <LikeButton 
        onClick={(e) => {
          e.stopPropagation();
          onLikeClick(data.id);
        }}
      >
        {data.like ? (
          <FavoriteIcon sx={{ color: '#ff1744' }} />
        ) : (
          <FavoriteBorderIcon />
        )}
      </LikeButton>
    </PreviewCard>
  );
};

export default TripCard;
