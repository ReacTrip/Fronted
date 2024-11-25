export const tourQuestions = [
  {
    id: 1,
    question: "선호하는 여행 스타일은 무엇인가요?",
    options: [
      { value: "nature", label: "자연/힐링" },
      { value: "culture", label: "문화/역사" },
      { value: "activity", label: "액티비티/모험" },
      { value: "food", label: "맛집/미식" }
    ]
  },
  {
    id: 2,
    question: "예상하는 여행 기간은 얼마인가요?",
    options: [
      { value: "daytrip", label: "당일치기" },
      { value: "weekend", label: "1박 2일" },
      { value: "short", label: "2-3일" },
      { value: "long", label: "4일 이상" }
    ]
  },
  {
    id: 3,
    question: "1인당 예상 예산은 얼마인가요?",
    options: [
      { value: "budget", label: "10만원 이하" },
      { value: "moderate", label: "10-30만원" },
      { value: "luxury", label: "30-50만원" },
      { value: "premium", label: "50만원 이상" }
    ]
  },
  {
    id: 4,
    question: "선호하는 이동 수단은?",
    options: [
      { value: "public", label: "대중교통" },
      { value: "car", label: "자차" },
      { value: "tour", label: "투어버스" },
      { value: "flexible", label: "상관없음" }
    ]
  },
  {
    id: 5,
    question: "여행지에서 중요하게 생각하는 것은?",
    options: [
      { value: "photo", label: "포토스팟" },
      { value: "relaxation", label: "휴식" },
      { value: "experience", label: "체험활동" },
      { value: "shopping", label: "쇼핑" }
    ]
  }
];

export const recommendations = {
  nature: {
    daytrip: ["포천", "가평", "양평"],
    weekend: ["강릉", "속초", "춘천"],
    short: ["여수", "통영", "제주"],
    long: ["제주", "울릉도", "거제"]
  },
  culture: {
    daytrip: ["수원", "전주", "안동"],
    weekend: ["경주", "공주", "안동"],
    short: ["서울", "부산", "경주"],
    long: ["서울", "부산", "광주"]
  },
  activity: {
    daytrip: ["포천", "가평", "양평"],
    weekend: ["양양", "강릉", "인제"],
    short: ["제주", "부산", "강릉"],
    long: ["제주", "울산", "속초"]
  },
  food: {
    daytrip: ["전주", "대구", "수원"],
    weekend: ["부산", "전주", "강릉"],
    short: ["부산", "제주", "전주"],
    long: ["서울", "부산", "제주"]
  }
};

export const categoryIcons = {
  '관광지': 'CameraAlt',
  '맛집': 'Restaurant',
  '숙박': 'Hotel',
  '축제/행사': 'Event'
};