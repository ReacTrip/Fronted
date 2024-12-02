export const PHOTO_SPOTS = {
  서울: [
    {
      id: "seoul-1",
      title: '남산서울타워',
      lat: 37.5511,
      lng: 126.9882,
      bestTime: ['sunset', 'night'],
      description: '서울을 상징하는 대표적인 랜드마크이자 최고의 야경 포인트',
      tips: '해질녘에는 타워와 도시의 실루엣이, 야간에는 화려한 도시 야경을 담을 수 있습니다.',
      viewingSpot: { lat: 37.5509, lng: 126.9877 },
      personSpots: [
        {
          lat: 37.5508,
          lng: 126.9875,
          description: '전망대 중앙 계단',
          tip: '타워를 배경으로 전신 샷'
        },
        {
          lat: 37.5507,
          lng: 126.9878,
          description: '포토존',
          tip: '서울 전경을 배경으로 하는 인물 사진'
        }
      ],
      category: ['architecture', 'night']
    },
    {
      id: "seoul-2",
      title: '경복궁',
      lat: 37.5796,
      lng: 126.9770,
      bestTime: ['sunrise', 'afternoon'],
      description: '한국의 대표적인 궁궐로, 계절마다 다른 매력을 자랑하는 포토스팟',
      tips: '경회루 연못에 비친 모습이나 근정전 앞 넓은 마당에서 촬영하면 좋습니다. 한복을 입고 촬영하면 더욱 멋진 사진을 남길 수 있습니다.',
      viewingSpot: { lat: 37.5793, lng: 126.9768 },
      personSpots: [
        {
          lat: 37.5794,
          lng: 126.9769,
          description: '근정전 앞',
          tip: '정면에서 근정전을 배경으로 촬영'
        },
        {
          lat: 37.5792,
          lng: 126.9767,
          description: '경회루 연못가',
          tip: '연못에 비친 경회루와 함께 촬영'
        }
      ],
      category: ['architecture', 'culture']
    },
    {
      id: "seoul-3",
      title: '석촌호수',
      lat: 37.5114,
      lng: 127.1029,
      bestTime: ['sunset', 'night'],
      description: '롯데월드타워와 호수가 어우러진 아름다운 도시 풍경',
      tips: '석촌호수 산책로에서 롯데월드타워를 배경으로 촬영하면 좋습니다. 야간에는 호수에 비친 불빛이 멋진 사진을 만듭니다.',
      viewingSpot: { lat: 37.5116, lng: 127.1025 },
      personSpots: [
        {
          lat: 37.5115,
          lng: 127.1027,
          description: '서호 브릿지',
          tip: '호수와 타워가 한 프레임에 담기는 구도'
        }
      ],
      category: ['nature', 'night']
    }
  ],
  부산: [
    {
      id: "busan-1",
      title: '해운대 해수욕장',
      lat: 35.1586,
      lng: 129.1604,
      bestTime: ['sunrise', 'sunset'],
      description: '부산의 상징적인 해변으로, 도시와 바다가 어우러진 경관',
      tips: '새벽 해변에서는 일출을, 저녁에는 마린시티의 야경과 함께 촬영하면 좋습니다.',
      viewingSpot: { lat: 35.1582, lng: 129.1601 },
      personSpots: [
        {
          lat: 35.1584,
          lng: 129.1602,
          description: '달맞이 고개',
          tip: '해운대 전경이 한눈에 담기는 위치'
        }
      ],
      category: ['nature', 'sunrise']
    },
    {
      id: "busan-2",
      title: '감천문화마을',
      lat: 35.0979,
      lng: 129.0110,
      bestTime: ['afternoon', 'sunset'],
      description: '알록달록한 계단식 주거형 문화마을',
      tips: '골목길과 계단이 많아 다양한 각도에서 촬영 가능합니다. 마을 전체가 포토존입니다.',
      viewingSpot: { lat: 35.0977, lng: 129.0108 },
      personSpots: [
        {
          lat: 35.0978,
          lng: 129.0109,
          description: '전망대',
          tip: '마을 전경을 배경으로 촬영'
        },
        {
          lat: 35.0976,
          lng: 129.0107,
          description: '물고기 골목',
          tip: '알록달록한 벽화를 배경으로 촬영'
        }
      ],
      category: ['culture', 'architecture']
    },
    {
      id: "busan-3",
      title: '광안대교',
      lat: 35.1478,
      lng: 129.1318,
      bestTime: ['night'],
      description: '부산의 대표적인 야경 명소',
      tips: '광안리 해수욕장에서 바라보는 광안대교의 야경이 특히 아름답습니다.',
      viewingSpot: { lat: 35.1476, lng: 129.1316 },
      personSpots: [
        {
          lat: 35.1477,
          lng: 129.1317,
          description: '광안리 해변',
          tip: '다리 전체가 프레임에 담기는 위치'
        }
      ],
      category: ['night', 'architecture']
    }
  ],
  제주: [
    {
      id: "jeju-1",
      title: '성산일출봉',
      lat: 33.4587,
      lng: 126.9426,
      bestTime: ['sunrise', 'afternoon'],
      description: '유네스코 세계자연유산으로 지정된 제주의 상징적인 명소',
      tips: '일출 명소이며, 정상에서 바라보는 제주 해안선이 장관입니다.',
      viewingSpot: { lat: 33.4585, lng: 126.9424 },
      personSpots: [
        {
          lat: 33.4586,
          lng: 126.9425,
          description: '성산일출봉 정상',
          tip: '분화구와 해안선을 배경으로 촬영'
        }
      ],
      category: ['nature', 'sunrise']
    },
    {
      id: "jeju-2",
      title: '카멜리아힐',
      lat: 33.2887,
      lng: 126.3712,
      bestTime: ['morning', 'afternoon'],
      description: '사계절 아름다운 꽃과 정원이 있는 포토스팟',
      tips: '동백꽃이 피는 겨울이 특히 아름답습니다.',
      viewingSpot: { lat: 33.2885, lng: 126.3710 },
      personSpots: [
        {
          lat: 33.2886,
          lng: 126.3711,
          description: '동백꽃 터널',
          tip: '꽃터널을 배경으로 인물 촬영'
        }
      ],
      category: ['nature', 'culture']
    },
    {
      id: "jeju-3",
      title: '협재해수욕장',
      lat: 33.3940,
      lng: 126.2393,
      bestTime: ['sunset'],
      description: '비양도를 배경으로 하는 에메랄드빛 해변',
      tips: '맑은 날 석양이 특히 아름답습니다.',
      viewingSpot: { lat: 33.3938, lng: 126.2391 },
      personSpots: [
        {
          lat: 33.3939,
          lng: 126.2392,
          description: '해변 산책로',
          tip: '비양도와 석양을 배경으로 촬영'
        }
      ],
      category: ['nature', 'sunset']
    }
  ]
};

export default PHOTO_SPOTS;