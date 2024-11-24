import trip1 from '@/assets/images/main/trip1.png';
import trip2 from '@/assets/images/main/trip2.png';
import trip3 from '@/assets/images/main/trip3.png';
import trip4 from '@/assets/images/main/trip4.png';
import trip5 from '@/assets/images/main/trip5.png';
import trip6 from '@/assets/images/main/trip6.png';


// 시연할 때, 미리 정해둘 데이터
export const detailData = [
    {
        id: 1,  // 여행 id
        title: "부산 여행",  // 여행 이름
        startDate: "2024-05-01",  // 여행 시작 일자
        endDate: "2024-05-10",  // 여행 종료 일자
        AuthorId: "das", //작성자 id
        mainImage: trip2,  //메인 이미지
        dailyItinerary: { // 일자별 계획

            "2024-05-01": [  // 이동할 장소 정보
                {
                    name: "광안리 해수욕장",
                    city: "Busan",
                    time: "12:00",
                    notes: "수영복 가져가기",
                    placeImage: trip1,
                    images: [trip3, trip4],
                    x: "127.0105811",
                    y: "37.58284829999999"
                },
                {
                    name: "조개구이 가게",
                    city: "Busan",
                    time: "15:00",
                    notes: "",
                    placeImage: trip2,
                    images: [trip5, trip6],
                    x: "127.066881928111",
                    y: "37.6226208171943 "
                },
                {
                    name: "광안리 해수욕장",
                    city: "Busan",
                    time: "12:00",
                    notes: "수영복 가져가기",
                    placeImage: trip1,
                    images: [trip3, trip4],
                    x: "126.9972889",
                    y: "37.6108694 "
                }
            ],


            "2024-05-02": [  // 이동할 장소 정보
                {
                    name: "울산 맛집",
                    city: "울산",
                    time: "09:00",
                    notes: "오전 방문",
                    placeImage: trip3,
                    images: [trip5, trip6],
                    x: "127.11341936045922",
                    y: "37.39639094915999"
                },
                {
                    name: "울산 해수욕장",
                    city: "울산",
                    time: "13:00",
                    notes: "밥 먹고 방문",
                    placeImage: trip4,
                    images: [trip1, trip2],
                    x: "127.10860518470294",
                    y: "37.401999820065534"
                },
                {
                    name: "울산 맛집",
                    city: "울산",
                    time: "09:00",
                    notes: "오전 방문",
                    placeImage: trip3,
                    images: [trip5, trip6],
                    x: "127.11024293202674",
                    y: "37.394348634049784"
                },
            ]

        },
        description: "친구랑 함께가는 여행" // 메모
    },

    {
        id: 2,
        title: "서울 여행",  // 여행 이름
        destination: "Seoul Tour",
        startDate: "2024-08-10",
        endDate: "2024-08-15",
        AuthorId: "def",
        mainImage: trip3,
        dailyItinerary: {

            "2024-08-10": [
                {
                    name: "경복궁",
                    city: "Seoul",
                    time: "09:00",
                    notes: "오전 궁궐 투어, 사진 촬영 예정",
                    placeImage: "",
                    images: [trip1, trip5],
                },
                {
                    name: "북촌 한옥 마을",
                    city: "Seoul",
                    time: "13:00",
                    notes: "전통 한옥 체험",
                    placeImage: "",
                    images: [trip2, trip6],
                }
            ],


            "2024-08-11": [
                {
                    name: "Seoul Tower",
                    city: "Seoul",
                    time: "10:00",
                    notes: "서울 전망 감상 및 케이블카 이용",
                    placeImage: "",
                    images: [trip3, trip4],
                },
                {
                    name: "Myeongdong",
                    city: "Seoul",
                    time: "15:00",
                    notes: "쇼핑 및 길거리 음식 체험",
                    placeImage: "",
                    images: [trip1, trip6],
                }
            ]

        },
        description: "서울 주요 관광지 중심으로 방문"
    }, 
    {
        id: 3,  // 여행 id
        title: "대구 여행",  // 여행 이름
        startDate: "2024-12-01",  // 여행 시작 일자
        endDate: "2024-12-3",  // 여행 종료 일자
        AuthorId: "das", //작성자 id
        mainImage: trip4,  //메인 이미지
        dailyItinerary: { // 일자별 계획

            "2024-12-01": [  // 이동할 장소 정보
                {
                    name: "광안리 해수욕장",
                    city: "Busan",
                    time: "12:00",
                    notes: "수영복 가져가기",
                    placeImage: trip1,
                    images: [trip3, trip4],
                    x: "127.0105811",
                    y: "37.58284829999999"
                },
                {
                    name: "조개구이 가게",
                    city: "Busan",
                    time: "15:00",
                    notes: "",
                    placeImage: trip2,
                    images: [trip5, trip6],
                    x: "127.066881928111",
                    y: "37.6226208171943 "
                },
                {
                    name: "광안리 해수욕장",
                    city: "Busan",
                    time: "12:00",
                    notes: "수영복 가져가기",
                    placeImage: trip1,
                    images: [trip3, trip4],
                    x: "126.9972889",
                    y: "37.6108694 "
                }
            ],


            "2024-12-02": [  // 이동할 장소 정보
                {
                    name: "울산 맛집",
                    city: "울산",
                    time: "09:00",
                    notes: "오전 방문",
                    placeImage: trip3,
                    images: [trip5, trip6],
                    x: "127.11341936045922",
                    y: "37.39639094915999"
                },
                {
                    name: "울산 해수욕장",
                    city: "울산",
                    time: "13:00",
                    notes: "밥 먹고 방문",
                    placeImage: trip4,
                    images: [trip1, trip2],
                    x: "127.10860518470294",
                    y: "37.401999820065534"
                },
                {
                    name: "울산 맛집",
                    city: "울산",
                    time: "09:00",
                    notes: "오전 방문",
                    placeImage: trip3,
                    images: [trip5, trip6],
                    x: "127.11024293202674",
                    y: "37.394348634049784"
                },
            ],

            "2024-12-03": [  // 이동할 장소 정보
                {
                    name: "울산 맛집",
                    city: "울산",
                    time: "09:00",
                    notes: "오전 방문",
                    placeImage: trip3,
                    images: [trip5, trip6],
                    x: "127.11341936045922",
                    y: "37.39639094915999"
                },
                {
                    name: "울산 해수욕장",
                    city: "울산",
                    time: "13:00",
                    notes: "밥 먹고 방문",
                    placeImage: trip4,
                    images: [trip1, trip2],
                    x: "127.10860518470294",
                    y: "37.401999820065534"
                },
                {
                    name: "울산 맛집",
                    city: "울산",
                    time: "09:00",
                    notes: "오전 방문",
                    placeImage: trip3,
                    images: [trip5, trip6],
                    x: "127.11024293202674",
                    y: "37.394348634049784"
                },
            ],

        },
        description: "친구랑 함께가는 여행" // 메모
    },
];
