const KAKAO_API_KEY = import.meta.env.VITE_KAKAODEVELOPERS_API_KEY;

export const getPhotoSpots = async (cityName) => {
 try {
   const response = await fetch(
     `https://dapi.kakao.com/v2/local/search/keyword.json?query=${cityName} 관광명소&size=15&category_group_code=AT4`,
     {
       headers: {
         Authorization: `KakaoAK ${KAKAO_API_KEY}`
       }
     }
   );
   
   const data = await response.json();
   const spots = await Promise.all(data.documents.map(async spot => {
     const images = await getSpotImages(spot.place_name);
     return {
       id: spot.id,
       title: spot.place_name,
       address: spot.road_address_name || spot.address_name,
       location: { lat: spot.y, lng: spot.x },
       image: images[0]?.image_url || '/placeholder-image.jpg',
       category: spot.category_name
     };
   }));
   return spots;
 } catch (error) {
   console.error('Error:', error);
   return [];
 }
};

export const getSpotDetail = async (spotName) => {
 try {
   const response = await fetch(
     `https://dapi.kakao.com/v2/local/search/keyword.json?query=${spotName}`,
     {
       headers: {
         Authorization: `KakaoAK ${KAKAO_API_KEY}`
       }
     }
   );
   
   const data = await response.json();
   const spot = data.documents[0];
   if (!spot) return null;

   const images = await getSpotImages(spot.place_name);
   
   return {
     id: spot.id,
     title: spot.place_name,
     address: spot.road_address_name || spot.address_name,
     location: { lat: spot.y, lng: spot.x },
     images: images,
     phone: spot.phone,
     category: spot.category_name,
     placeUrl: spot.place_url,
     photoGuide: getPhotoGuide(spot)
   };
 } catch (error) {
   console.error('Error:', error);
   return null;
 }
};

const getSpotImages = async (placeName) => {
 try {
   const response = await fetch(
     `https://dapi.kakao.com/v2/search/image?query=${placeName} 관광&size=5`,
     {
       headers: {
         Authorization: `KakaoAK ${KAKAO_API_KEY}`
       }
     }
   );
   const data = await response.json();
   return data.documents.map(img => img.image_url);
 } catch (error) {
   return [];
 }
};

const getPhotoGuide = (spot) => {
 const timeGuide = {
   morning: "06:00-09:00",
   evening: "16:00-18:00",
   reason: "자연광이 가장 좋은 시간"
 };

 return {
   bestTime: timeGuide,
   tips: [
     "삼각대를 이용하면 더 안정적인 사진을 찍을 수 있습니다",
     "사람이 적은 이른 아침이나 저녁 시간대를 추천합니다",
     "날씨가 맑은 날 방문하면 더 좋은 사진을 찍을 수 있습니다"
   ],
   photoSpots: [
     {
       name: "정면 뷰",
       description: "건물 전체가 잘 보이는 구도",
       tips: ["넓은 화각으로 촬영하세요"]
     },
     {
       name: "세부 촬영",
       description: "특징적인 부분을 클로즈업",
       tips: ["디테일이 잘 보이도록 가까이서 촬영하세요"]
     }
   ],
   camera: {
     aperture: "f/8",
     shutterSpeed: "1/125",
     iso: "100"
   }
 };
};