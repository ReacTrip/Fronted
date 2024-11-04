import trip1 from '@/assets/images/main/trip1.png';
import trip2 from '@/assets/images/main/trip2.png';
import trip3 from '@/assets/images/main/trip3.png';
import trip4 from '@/assets/images/main/trip4.png';
import trip5 from '@/assets/images/main/trip5.png';
import trip6 from '@/assets/images/main/trip6.png';

export const detailData = [
  {
    id: 1,
    title: "제주도 3박 4일 여행",
    author: "여행러버",
    image: trip1,
    date: "2024.11.01 - 2024.11.04",
    1:[
      {
        place : "제주 감귤 농장",
        images : ['1.png', '2.png', '3.png']
      },
      {
        place : "제주 감귤 농장", 
        images : ['1.png', '2.png', '3.png']
      }
    ],
    2:[
      {
        place : "제주 감귤 농장",
        images : ['1.png', '2.png', '3.png']
      },
      {
        place : "제주 감귤 농장", 
        images : ['1.png', '2.png', '3.png']
      }
    ],
    3:[
      {
        place : "제주 감귤 농장",
        images : ['1.png', '2.png', '3.png']
      },
      {
        place : "제주 감귤 농장", 
        images : ['1.png', '2.png', '3.png']
      }
    ],
    tags: ["제주도", "휴양", "맛집"],
  },
  {
    id: 2,
    title: "부산 여행 코스",
    author: "부산사람",
    image: trip2,
    date: "2024.11.10 - 2024.11.12",
    tags: ["부산", "해운대", "광안리"],
  },
  {
    id: 3,
    title: "강원도 겨울 여행",
    author: "스키매니아",
    image: trip3,
    date: "2024.12.20 - 2024.12.22",
    tags: ["스키", "겨울", "강원도"],
  },
  {
    id: 4,
    title: "서울 당일치기",
    author: "도시여행가",
    image: trip4,
    date: "2024.11.15",
    tags: ["서울", "도시", "데이트"],
  },
  {
    id: 5,
    title: "경주 역사 여행",
    author: "역사탐방러",
    image: trip5,
    date: "2024.11.05 - 2024.11.07",
    tags: ["경주", "역사", "문화"],
  },
  {
    id: 6,
    title: "전주 한옥마을",
    author: "먹방여행가",
    image: trip6,
    date: "2024.11.08 - 2024.11.09",
    tags: ["전주", "한옥", "맛집"],
  },
];
