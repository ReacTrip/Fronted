export const photoSpots = {
  seoul: {
    spot1: {
      id: "seoul-spot1",
      name: "남산서울타워",
      coordinates: {
        lat: 37.551168,
        lng: 126.988228
      },
      bestSpots: [
        {
          id: "tower-spot1",
          name: "정문 포토존",
          bestTimes: [
            {
              time: "17:00-19:00",
              reason: "일몰 시간대의 황금빛 조명과 도시 전경이 어우러짐"
            }
          ],
          poses: [
            {
              name: "실루엣 샷",
              description: "서울타워를 배경으로 실루엣 만들기",
              tip: "일몰 시간에 맞춰 타워 방향으로 서서 촬영"
            }
          ],
          cameraSettings: {
            aperture: "4.0",
            shutterSpeed: "1/125",
            iso: "400"
          }
        }
      ],
      address: "서울특별시 용산구 남산공원길 105"
    }
  }
};

export const weatherRecommendations = {
  sunny: {
    condition: 'sunny',
    tips: ["역광을 피해 촬영하세요", "그림자를 활용해보세요"],
    settings: {
      iso: "100",
      shutterSpeed: "1/250"
    }
  },
  cloudy: {
    condition: 'cloudy',
    tips: ["부드러운 빛을 활용하세요", "채도를 약간 높여보세요"],
    settings: {
      iso: "200",
      shutterSpeed: "1/125"
    }
  }
};