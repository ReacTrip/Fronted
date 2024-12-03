import trip1 from '@/assets/images/main/trip1.png';
import trip2 from '@/assets/images/main/trip2.png';
import trip3 from '@/assets/images/main/trip3.png';
import trip4 from '@/assets/images/main/trip4.png';
import trip5 from '@/assets/images/main/trip5.png';
import trip6 from '@/assets/images/main/trip6.png';

import busanFestival4 from '@/assets/images/TripPlace/busan/busanFestival4.png';
import busanFestival5 from '@/assets/images/TripPlace/busan/busanFestival5.png';
import 코오롱1 from '@/assets/images/TripPlace/busan/코오롱호텔1.png';
import 코오롱2 from '@/assets/images/TripPlace/busan/코오롱호텔2.png';
import 코오롱3 from '@/assets/images/TripPlace/busan/코오롱호텔3.png';
import 코오롱4 from '@/assets/images/TripPlace/busan/코오롱호텔4.png';
import 파라다이스1 from '@/assets/images/TripPlace/busan/파라다이스호텔1.png';
import 파라다이스2 from '@/assets/images/TripPlace/busan/파라다이스호텔2.png';
import 파라다이스3 from '@/assets/images/TripPlace/busan/파라다이스호텔3.png';
import 파라다이스4 from '@/assets/images/TripPlace/busan/파라다이스호텔4.png';
import 황금조개구이1 from '@/assets/images/TripPlace/busan/황금조개구이횟집1.png';
import 황금조개구이2 from '@/assets/images/TripPlace/busan/황금조개구이횟집2.png';
import 황금조개구이3 from '@/assets/images/TripPlace/busan/황금조개구이횟집3.png';
import 해운대해수욕장1 from '@/assets/images/TripPlace/busan/해운대해수욕장1.png';
import 해운대해수욕장2 from '@/assets/images/TripPlace/busan/해운대해수욕장2.png';
import 해운대해수욕장3 from '@/assets/images/TripPlace/busan/해운대해수욕장3.png';
import lightFestival1 from '@/assets/images/TripPlace/busan/lightFestival1.png';
import lightFestival2 from '@/assets/images/TripPlace/busan/lightFestival2.png';
import lightFestival3 from '@/assets/images/TripPlace/busan/lightFestival3.png';

import 달맞이동산1 from '@/assets/images/TripPlace/busan/달맞이동산1.png';
import 달맞이동산2 from '@/assets/images/TripPlace/busan/달맞이동산2.png';

import 등대장어1 from '@/assets/images/TripPlace/busan/등대장어1.png';
import 등대장어2 from '@/assets/images/TripPlace/busan/등대장어2.png';
import 등대장어3 from '@/assets/images/TripPlace/busan/등대장어3.png';
import 등대장어4 from '@/assets/images/TripPlace/busan/등대장어4.png';

import 원조할매국밥1 from '@/assets/images/TripPlace/busan/원조할매국밥1.png';
import 원조할매국밥2 from '@/assets/images/TripPlace/busan/원조할매국밥2.png';
import 원조할매국밥3 from '@/assets/images/TripPlace/busan/원조할매국밥3.png';

import 부산역1 from '@/assets/images/TripPlace/busan/부산역1.png';

import 서귀포1 from '@/assets/images/main/서귀포1.png';

import 애월1 from '@/assets/images/main/애월1.png';

import 경복궁1 from '@/assets/images/main/경복궁1.png';
import 경복궁2 from '@/assets/images/main/경복궁2.png';

import 북촌한옥마을1 from '@/assets/images/main/북촌한옥마을1.png';

import 서울타워1 from '@/assets/images/main/서울타워1.png';

import 명동1 from '@/assets/images/main/명동1.png';

import 대구1 from '@/assets/images/main/대구1.png';

// 시연할 때, 미리 정해둘 데이터
export const detailData = [
    {
        id: 1,  // 여행 id
        title: "해운대 빛축제 계획",  // 여행 이름
        startDate: "2024-01-29",  // 여행 시작 일자
        endDate: "2024-01-31",  // 여행 종료 일자
        AuthorId: "BusanOfficial", //작성자 id
        mainImage: busanFestival5,  //메인 이미지
        totalLike: 12050,
        like: 0,
        post: 1,
        dailyItinerary: { // 일자별 계획

            "2024-01-29": [  // 이동할 장소 정보
                {
                    name: "해운대 해수욕장",
                    city: "Busan",
                    time: "12:00",
                    notes: "수영복 가져가기",
                    placeImage: 해운대해수욕장1,
                    images: [해운대해수욕장2, 해운대해수욕장3],
                    x: "129.1598107023669",
                    y: "35.15852039665702"
                },
                {
                    name: "황금조개구이",
                    city: "Busan",
                    time: "14:00",
                    notes: "정우가 강추한 조개구이집",
                    placeImage: 황금조개구이1,
                    images: [황금조개구이2, 황금조개구이3],
                    x: "129.16114939855925",
                    y: "35.16049029019174"
                },
                {
                    name: "구남로 광장",
                    city: "Busan",
                    time: "16:00",
                    notes: "해운대 빛축제",
                    placeImage: lightFestival1,
                    images: [lightFestival2, lightFestival3],
                    x: "129.1606971",
                    y: "35.1616873"
                },
                {
                    name: "코오롱 씨클라우드호텔",
                    city: "Busan",
                    time: "20:00",
                    notes: "수영복 가져가기",
                    placeImage: 코오롱1,
                    images: [코오롱2, 코오롱3, 코오롱4],
                    x: "129.16226413645822",
                    y: "35.160423080834185"
                }
            ],


            "2024-01-30": [  // 이동할 장소 정보
                {
                    name: "달맞이 동산",
                    city: "Busan",
                    time: "10:00",
                    notes: "아침 산책",
                    placeImage: 달맞이동산1,
                    images: [달맞이동산2],
                    x: "129.17895507011644",
                    y: "35.15603273070436"
                },
                {
                    name: "등대장어 조개구이집",
                    city: "Busan",
                    time: "13:00",
                    notes: "친구가 추천해준 맛집!!",
                    placeImage: 등대장어1,
                    images: [등대장어2, 등대장어3, 등대장어4],
                    x: "129.19394516059958",
                    y: "35.16140544990262"
                },
                {
                    name: "파라다이스 호텔 부산",
                    city: "Busan",
                    time: "21:00",
                    notes: "오전 방문",
                    placeImage: 파라다이스1,
                    images: [파라다이스2, 파라다이스3, 파라다이스4],
                    x: "129.16527065508131",
                    y: "35.16021165999654"
                },
            ],

            "2024-01-31": [  // 이동할 장소 정보
                {
                    name: "원조 할매국밥",
                    city: "Busan",
                    time: "12:00",
                    notes: "아침엔 해장",
                    placeImage: 원조할매국밥1,
                    images: [원조할매국밥2, 원조할매국밥3],
                    x: "129.16133875844824",
                    y: "35.16329171408399"
                },
                {
                    name: "부산역",
                    city: "Busan",
                    time: "14:00",
                    notes: "집으로!",
                    placeImage: 부산역1,
                    images: [],
                    x: "129.03933",
                    y: "35.114495"
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
        AuthorId: "TripLover",
        mainImage: 경복궁2,
        totalLike: 7450,
        like: 0,
        post: 1,
        dailyItinerary: {

            "2024-08-10": [
                {
                    name: "경복궁",
                    city: "Seoul",
                    time: "09:00",
                    notes: "오전 궁궐 투어, 사진 촬영 예정",
                    placeImage: 경복궁1,
                    images: [],
                    x: "126.977041",
                    y: "37.579617"
                },
                {
                    name: "북촌 한옥 마을",
                    city: "Seoul",
                    time: "13:00",
                    notes: "전통 한옥 체험",
                    placeImage: 북촌한옥마을1,
                    images: [],
                    x: "126.9849519",
                    y: "37.5814696"
                }
            ],


            "2024-08-11": [
                {
                    name: "Seoul Tower",
                    city: "Seoul",
                    time: "10:00",
                    notes: "서울 전망 감상 및 케이블카 이용",
                    placeImage: 서울타워1,
                    images: [],
                    x: "126.9882266",
                    y: "37.5511694"
                },
                {
                    name: "Myeongdong",
                    city: "Seoul",
                    time: "15:00",
                    notes: "쇼핑 및 길거리 음식 체험",
                    placeImage: 명동1,
                    images: [],
                    x: "126.985241620075",
                    y: "37.5583576447485"
                }
            ]

        },
        description: "서울 주요 관광지 중심으로 방문"
    }, 
    {
        id: 3,  // 여행 id
        title: "대구 여행",  // 여행 이름
        startDate: "2024-12-01",  // 여행 시작 일자
        endDate: "2024-12-03",  // 여행 종료 일자
        AuthorId: "TripLover", //작성자 id
        mainImage: 대구1,  //메인 이미지
        totalLike: 30,
        like: 1,
        post: 1,
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


    {
        id: 4,  // 여행 id
        title: "전라남도 1박 2일 코스",  // 여행 이름
        startDate: "2025-03-01",  // 여행 시작 일자
        endDate: "2025-03-02",  // 여행 종료 일자
        AuthorId: "Bbomo", //작성자 id
        mainImage: trip5,  //메인 이미지
        totalLike: 150,
        like: 0,
        post: 1,
        dailyItinerary: { // 일자별 계획

            "2025-03-01": [  // 이동할 장소 정보
                {
                    name: "무등산",
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


            "2025-03-02": [  // 이동할 장소 정보
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

    {
        id: 5,  // 여행 id
        title: "서귀포",  // 여행 이름
        startDate: "2024-03-01",  // 여행 시작 일자
        endDate: "2025-03-02",  // 여행 종료 일자
        AuthorId: "SoRyong", //작성자 id
        mainImage: 서귀포1,  //메인 이미지
        totalLike: 650,
        like: 0,
        post: 1,
        dailyItinerary: { // 일자별 계획
        },
        description: "혼자 사색에 잠기는 여행" // 메모
    },

    {
        id: 6,  // 여행 id
        title: "애월 휴가",  // 여행 이름
        startDate: "2023-06-05",  // 여행 시작 일자
        endDate: "2023-06-06",  // 여행 종료 일자
        AuthorId: "SoRyong", //작성자 id
        mainImage: 애월1,  //메인 이미지
        totalLike: 335,
        like: 0,
        post: 1,
        dailyItinerary: { // 일자별 계획
        },
        description: "상쾌한 휴가를 즐기는 곳" // 메모
    },
];
