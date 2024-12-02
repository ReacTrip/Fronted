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
      title: '태종대',
      lat: 35.0513,
      lng: 129.0844,
      bestTime: ['morning', 'afternoon'],
      description: '부산의 대표적인 자연 경관과 바다 풍경을 감상할 수 있는 명소',
      tips: '태종대 전망대에서 내려다보는 바다와 섬이 아름답습니다. 등대 주변에서 촬영하기에도 좋습니다.',
      viewingSpot: { lat: 35.0511, lng: 129.0842 },
      personSpots: [
        {
          lat: 35.0512,
          lng: 129.0843,
          description: '태종대 등대',
          tip: '등대와 바다를 함께 담는 구도'
        }
      ],
      category: ['nature', 'landscape']
    },
    {
      id: "busan-4",
      title: '오륙도 스카이워크',
      lat: 35.100594,
      lng: 129.124603, 
      bestTime: ['morning', 'afternoon'],
      description: '투명한 바닥으로 바다를 볼 수 있는 스릴 넘치는 포토존',
      tips: '맑은 날 바닥을 통해 보이는 바다와 섬을 촬영하면 특별한 사진이 완성됩니다.',
      viewingSpot: { lat: 35.100488, lng: 129.124547 },
      personSpots: [
        {
          lat: 35.100532,
          lng: 129.124578,
          description: '스카이워크 중앙',
          tip: '투명 바닥을 배경으로 촬영'
        }
      ],
      category: ['nature', 'adventure']
    },
    {
      id: "busan-5",
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
      lat: 33.462230, 
      lng: 126.936753,
      bestTime: ['sunrise', 'afternoon'],
      description: '유네스코 세계자연유산으로 지정된 제주의 상징적인 명소',
      tips: '일출 명소이며, 정상에서 바라보는 제주 해안선이 장관입니다.',
      viewingSpot: { lat: 33.462148, lng: 126.936700 },  
      personSpots: [
        {
          lat: 33.462190,
          lng: 126.936720,
          description: '성산일출봉 입구',
          tip: '성산일출봉 전경을 배경으로 촬영'
        }
      ],
      category: ['nature', 'sunrise']
    },
    {
      id: "jeju-2",
      title: '카멜리아힐',
      lat: 33.289167,
      lng: 126.369444,  
      bestTime: ['morning', 'afternoon'],
      description: '사계절 아름다운 꽃과 정원이 있는 포토스팟',
      tips: '동백꽃이 피는 겨울이 특히 아름답습니다.',
      viewingSpot: { lat: 33.289278, lng: 126.369556 },
      personSpots: [
        {
          lat: 33.289222,
          lng: 126.369500,
          description: '동백꽃 터널',
          tip: '꽃터널을 배경으로 인물 촬영'
        }
      ],
      category: ['nature', 'culture']
    },
    {
      id: "jeju-3",
      title: '우도',
      lat: 33.5000,
      lng: 126.9420,
      bestTime: ['morning', 'afternoon'],
      description: '제주도 근처의 작은 섬으로, 청정 자연과 독특한 풍경을 자랑하는 명소',
      tips: '우도 해변에서 독특한 조약돌과 해안선을 배경으로 촬영하면 좋습니다.',
      viewingSpot: { lat: 33.4998, lng: 126.9418 },
      personSpots: [
        {
          lat: 33.4999,
          lng: 126.9419,
          description: '검멀레 해변',
          tip: '검은 모래와 바다를 배경으로 촬영'
        }
      ],
      category: ['nature', 'adventure']
    },
    {
      id: "jeju-4",
      title: '천지연 폭포',
      lat: 33.2466,
      lng: 126.5617,
      bestTime: ['morning', 'afternoon'],
      description: '제주의 대표적인 폭포로, 자연과 조화를 이루는 포토존',
      tips: '폭포의 물줄기와 주변의 초록 풍경을 프레임에 담아보세요.',
      viewingSpot: { lat: 33.2464, lng: 126.5615 },
      personSpots: [
        {
          lat: 33.2465,
          lng: 126.5616,
          description: '폭포 앞',
          tip: '폭포와 물줄기를 가까이서 촬영'
        }
      ],
      category: ['nature', 'landscape']
    },
    {
      id: "jeju-5",
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
}

;

export default PHOTO_SPOTS;