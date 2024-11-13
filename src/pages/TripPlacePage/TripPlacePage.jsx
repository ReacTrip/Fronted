import React, { useState } from 'react';
import { PieChart, Pie, Cell, Sector } from 'recharts';
import Navbar from '@/components/common/Navbar/Navbar';

const TripPlacePage = () => {
  // 현재 활성화된(호버된) 도시의 인덱스를 관리하는 상태
  const [activeIndex, setActiveIndex] = useState(null);

  // 도시 데이터 배열 - 각 도시의 이름, 값, 이미지 경로를 포함
  const cities = [
    { name: "서울", value: 40, image: "/src/assets/images/TripPlace/Seoul.png" },
    { name: "부산", value: 40, image: "/src/assets/images/TripPlace/Busan.png" },
    { name: "대구", value: 40, image: "/src/assets/images/TripPlace/Daegu.png" },
    { name: "인천", value: 40, image: "/src/assets/images/TripPlace/Incheon.png" },
    { name: "광주", value: 40, image: "/src/assets/images/TripPlace/Gwangju.png" },
    { name: "대전", value: 40, image: "/src/assets/images/TripPlace/Daejeon.png" },
    { name: "울산", value: 40, image: "/src/assets/images/TripPlace/Ulsan.png" },
    { name: "제주", value: 40, image: "/src/assets/images/TripPlace/Jeju.png" },
    { name: "포천", value: 40, image: "/src/assets/images/TripPlace/Pocheon.png" }
  ];

  // 각 도시 섹션의 패턴 ID를 생성하는 함수
  const getPatternId = (index) => `city-pattern-${index}`;

  // 호버 시 활성화되는 섹션의 모양을 렌더링하는 함수
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload } = props;

    return (
      <g>
        {/* 호버 시 나타나는 검은색 오버레이 */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill="rgba(0, 0, 0, 0.7)"
        />
        {/* 호버 시 나타나는 도시 이름 텍스트 */}
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill="#4ADE80"
          fontSize={32}
          fontWeight="bold"
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
          }}
        >
          {payload.name}
        </text>
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 네비게이션 바 */}
      <Navbar />
      <div className="flex items-center">
        {/* 원형 그래프 컨테이너 */}
        <div className="w-[1200px] h-[1000px] relative ml-64">
          {/* recharts PieChart 컴포넌트 */}
          <PieChart width={1200} height={1000}>
            {/* SVG 패턴 정의 - 각 도시 섹션의 배경 이미지 */}
            <defs>
              {cities.map((city, index) => (
                <pattern
                  key={getPatternId(index)}
                  id={getPatternId(index)}
                  patternUnits="userSpaceOnUse"
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid slice"
                >
                  {/* 도시 이미지 */}
                  <image
                    href={city.image}
                    width="100"
                    height="100"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
              ))}
            </defs>

            {/* 도넛 차트 구성 */}
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={cities}
              cx={600}        // 중심점 X 좌표
              cy={500}        // 중심점 Y 좌표
              innerRadius={250}  // 내부 반지름
              outerRadius={400}  // 외부 반지름
              paddingAngle={3}   // 섹션 간 간격
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}  // 마우스 진입 시 활성화
              onMouseLeave={() => setActiveIndex(null)}           // 마우스 이탈 시 비활성화
            >
              {/* 각 도시 섹션 생성 */}
              {cities.map((_, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={`url(#${getPatternId(index)})`}  // 배경 이미지 패턴 적용
                  stroke="#fff"    // 테두리 색상
                  strokeWidth={2}  // 테두리 두께
                  style={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'  // 부드러운 전환 효과
                  }}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default TripPlacePage;