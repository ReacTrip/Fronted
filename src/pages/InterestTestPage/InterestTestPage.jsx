import React from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { QuestionSection } from '../../components/InterestTest/QuestionSection';
import { ResultSection } from '../../components/InterestTest/ResultSection';
import { GuideSection } from '../../components/InterestTest/GuideSection';
import character from '../../assets/images/character.png';
import { useInterestTest } from '../../hooks/useInterestTest';
import { usePlaceInfo } from '../../hooks/usePlaceInfo';
import Navbar from '../../components/common/Navbar/Navbar';

// 전체 페이지 래퍼
const PageWrapper = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff'
});

// 메인 컨테이너 (메인페이지와 동일한 maxWidth 적용)
const StyledContainer = styled(Container)({
  maxWidth: '1200px !important',
  padding: '0 20px',
});

// 컨텐츠 컨테이너
const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  padding: theme.spacing(-4),
  alignItems: 'flex-start',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'stretch'
  }
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: '1',
  minWidth: 0,
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  overflow: 'hidden'
}));

const MainContentInner = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2)
  }
}));

const InterestTestPage = () => {
  const {
    currentStep,
    result,
    mascotMessage,
    handleAnswer,
    resetTest,
    progress,
    currentQuestion,
    testPhase
  } = useInterestTest();

  const {
    placeInfo,
    isLoading,
    error,
    activeCategory,
    setActiveCategory,
    fetchPlaceInfo,
    resetPlaceInfo
  } = usePlaceInfo();

  const handleReset = () => {
    resetTest();
    resetPlaceInfo();
  };

  return (
    <PageWrapper>
      <StyledContainer>
        <Navbar />
        <ContentContainer>
          <GuideSection
            testPhase={testPhase}
            mascotImage={character}
            message={mascotMessage}
          />
          
          <MainContent>
            <MainContentInner>
              {!result ? (
                <QuestionSection
                  currentQuestion={currentQuestion}
                  progress={progress}
                  onAnswer={handleAnswer}
                />
              ) : (
                <ResultSection
                  result={result}
                  placeInfo={placeInfo}
                  isLoading={isLoading}
                  error={error}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                  onReset={handleReset}
                  onPlaceInfoRequest={fetchPlaceInfo}
                />
              )}
            </MainContentInner>
          </MainContent>
        </ContentContainer>
      </StyledContainer>
    </PageWrapper>
  );
};

export default InterestTestPage;