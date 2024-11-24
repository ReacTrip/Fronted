import React from 'react';
import { List, ListItem, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { detailData } from '@/data/tripDataDetail.js'

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
        {data.map((item) => (
          <PreviewCard elevation={2} onClick={() => onCardClick(detailData[0])} key={item.id} sx={{ marginBottom: 1 }}>
            <ImageSection>
              <img src={item.mainImage} alt={item.name} />
            </ImageSection>
            <ListItem sx={{ borderBottom: '1px solid #ccc' }}>
              <ContentSection>
                <Typography variant="h5">{item.title}</Typography>

                <Box>{item.startDate && item.endDate
                ? `${item.startDate.replace(/-/g, '.')} ~ ${item.endDate.replace(/-/g, '.')}`
                : '날짜 정보 없음'}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#666',
                  }}
                >
                  <CalendarMonthIcon sx={{ fontSize: 18, mr: 1 }} />
                  <Typography sx={{ fontSize: '14px' }}>{item.date}</Typography>
                </Box>
                {item.actions}
              </ContentSection>
            </ListItem>
          </PreviewCard>
        ))}
      </List>
    ) : (
      <Typography variant="body1">데이터가 없습니다.</Typography>
    )}
  </>
);

export default TabContent;
