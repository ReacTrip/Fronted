import React from 'react';
import { List, ListItem, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const PreviewCard = styled(Paper)({
  height: '180px',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '10px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
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
  gap: 20,
});

// 표출할 여행 목록
const TabContent = ({ data, onCardClick }) => (
  <>
    {data.length > 0 ? (
      <List>
        {data.map((item) => {
          // 날짜 형식 변환 로직
          const formatDate = (date) => {
            if (typeof date === 'string') {
              return date.replace(/-/g, '.'); // YYYY-MM-DD -> YYYY.MM.DD 형식으로 변환
            }
            if (date instanceof Date) {
              return date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).replace(/\./g, '.').trim(); // Date 객체 처리
            }
            return '날짜 정보 없음'; // 잘못된 데이터 처리
          };

          return (
            <PreviewCard elevation={2} onClick={() => onCardClick(item)} key={item.id} sx={{ marginBottom: 1 }}>
              <ImageSection>
                <img
                  src={item.mainImage || '/default-image.jpg'} // 기본 이미지 처리
                  alt={item.title || '여행 이미지'}
                />
              </ImageSection>
              <ListItem sx={{ borderBottom: '1px solid #ccc' }}>
                <ContentSection>
                  <Typography variant="h5">{item.title}</Typography>

                  {/* 시작일 ~ 종료일 표시 */}
                  <Box>
                    {item.startDate && item.endDate
                      ? `${formatDate(item.startDate)} ~ ${formatDate(item.endDate)}`
                      : '날짜 정보 없음'}
                  </Box>

                  {/* 일정 정보 */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: '#666',
                    }}
                  >
                    <CalendarMonthIcon sx={{ fontSize: 18, mr: 1 }} />
                    <Typography sx={{ fontSize: '14px' }}>
                      {item.date || '일정 정보 없음'}
                    </Typography>
                  </Box>
                  {item.actions}
                </ContentSection>
              </ListItem>
            </PreviewCard>
          );
        })}
      </List>
    ) : (
      <Typography variant="body1">데이터가 없습니다.</Typography>
    )}
  </>
);

export default TabContent;
