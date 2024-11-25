import { useState, useEffect } from 'react';
import { tourQuestions, recommendations } from '../constants/tourConstants';

export const useInterestTest = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [mascotMessage, setMascotMessage] = useState(
    "안녕하세요! 여러분의 취향에 맞는 최고의 여행지를 찾아보아요! 준비되셨나요?"
  );
  const [testPhase, setTestPhase] = useState('initial');
  const [randomizedQuestions] = useState(() => 
    [...tourQuestions].sort(() => Math.random() - 0.5)
  );

  const messages = [
    "어떤 여행을 선호하시나요?",
    "여행 기간은 어느 정도로 생각하시나요?",
    "예산은 얼마나 준비하셨나요?",
    "이동 수단은 어떤 것이 편하신가요?",
    "여행에서 가장 중요하게 생각하는 건 무엇인가요?"
  ];

  useEffect(() => {
    if (result) {
      setTestPhase('result');
    } else if (currentStep > 0) {
      setTestPhase('testing');
    } else {
      setTestPhase('initial');
    }
  }, [currentStep, result]);

  useEffect(() => {
    if (!result) {
      setMascotMessage(messages[currentStep]);
    }
  }, [currentStep, result, messages]);

  const handleAnswer = (answerValue) => {
    const currentQuestion = randomizedQuestions[currentStep];
    const selectedOption = currentQuestion.options.find(opt => opt.value === answerValue);
    const newAnswers = { ...answers, [currentQuestion.id]: selectedOption };
    setAnswers(newAnswers);

    if (currentStep < randomizedQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const recommendation = calculateRecommendation(newAnswers);
      setResult(recommendation);
    }
  };

  const calculateRecommendation = (userAnswers) => {
    // 여행 스타일(질문 1)과 기간(질문 2)의 답변 가져오기
    const styleAnswer = userAnswers[1];
    const durationAnswer = userAnswers[2];

    if (!styleAnswer || !durationAnswer) {
      console.error('Required answers are missing', { styleAnswer, durationAnswer });
      return '서울';
    }

    const style = styleAnswer.value;
    const duration = durationAnswer.value;

    console.log('Style:', style);
    console.log('Duration:', duration);
    console.log('Available Recommendations:', recommendations[style]?.[duration]);

    if (!recommendations[style]?.[duration]) {
      console.error('No recommendation found for', { style, duration });
      return '서울';
    }

    const recommendedPlace = recommendations[style][duration][0];
    
    setMascotMessage(
      `${recommendedPlace}를 추천드려요! 이곳이 여러분의 취향과 가장 잘 맞는 것 같아요. 아래에서 자세한 정보를 확인해보세요!`
    );
    
    return recommendedPlace;
  };

  const resetTest = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
    setTestPhase('initial');
    setMascotMessage(
      "안녕하세요! 여러분의 취향에 맞는 최고의 여행지를 찾아보아요! 준비되셨나요?"
    );
  };

  return {
    currentStep,
    answers,
    result,
    mascotMessage,
    handleAnswer,
    resetTest,
    progress: ((currentStep) / (randomizedQuestions.length - 1)) * 100,
    currentQuestion: randomizedQuestions[currentStep],
    testPhase
  };
};