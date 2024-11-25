import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const GuideSectionWrapper = styled(Box)(({ theme }) => ({
  flex: '0 0 300px',
  position: 'sticky',
  top: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    position: 'static',
    flex: 'none',
    marginBottom: theme.spacing(3)
  }
}));

const MascotContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  position: 'relative', // 추가
  '& img': {
    width: '180px',
    height: 'auto',
    marginBottom: 0, // 수정
    transform: 'translateY(0)', // 수정
    filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))'
  }
}));

const MessageBubble = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  position: 'relative',
  marginTop: theme.spacing(2), // 추가
  '&:before': {
    content: '""',
    position: 'absolute',
    bottom: '-20px', // top에서 bottom으로 변경
    left: '50%',
    transform: 'translateX(-50%) rotate(180deg)', // 화살표 방향 변경
    borderWidth: '12px',
    borderStyle: 'solid',
    borderColor: `transparent transparent ${theme.palette.background.paper} transparent` // 수정
  }
}));

const guideContent = {
  initial: {
    title: "여행 취향 테스트 시작!",
    tips: [
      "솔직하게 답변해주세요",
      "직관적인 선택이 좋아요",
      "신중하게 고민하지 마세요"
    ]
  },
  testing: {
    title: "테스트 진행 중",
    tips: [
      "천천히 읽어보세요",
      "첫인상이 중요해요",
      "편안한 마음으로 답변하세요"
    ]
  },
  result: {
    title: "맞춤 여행지 추천",
    tips: [
      "카테고리별로 확인해보세요",
      "상세정보를 클릭해보세요",
      "마음에 드는 곳을 저장해보세요"
    ]
  }
};

export const GuideSection = ({ testPhase, mascotImage, message }) => {
  const currentGuide = guideContent[testPhase];

  return (
    <GuideSectionWrapper>
      <MessageBubble elevation={2}>
        <Typography variant="h6" gutterBottom color="primary">
          {currentGuide.title}
        </Typography>
        
        <Typography variant="body1" paragraph>
          {message}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            💡 도움말
          </Typography>
          {currentGuide.tips.map((tip, index) => (
            <Typography 
              key={index} 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                my: 0.5 
              }}
            >
              • {tip}
            </Typography>
          ))}
        </Box>
      </MessageBubble>
      
      <MascotContainer>
        <img src={mascotImage} alt="여행 가이드 캐릭터" />
      </MascotContainer>
    </GuideSectionWrapper>
  );
};