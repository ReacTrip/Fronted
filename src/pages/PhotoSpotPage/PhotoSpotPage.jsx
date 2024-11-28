import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NaverMapComponent from '../../components/map/NaverMapComponent.jsx';
import { MAJOR_CITIES } from '../../api/map/naverMapApi';
import tourApiService from '../../api/TourApiService';
import { Camera, MapPin, Calendar, Star } from 'lucide-react';

const seasonalData = {
 spring: {
   title: '봄',
   description: '벚꽃과 함께하는 인생샷',
   color: 'bg-pink-100',
   textColor: 'text-pink-800'
 },
 summer: {
   title: '여름',
   description: '시원한 바다와 함께하는 인생샷',
   color: 'bg-blue-100',
   textColor: 'text-blue-800'
 },
 autumn: {
   title: '가을',
   description: '단풍과 함께하는 인생샷',
   color: 'bg-orange-100',
   textColor: 'text-orange-800'
 },
 winter: {
   title: '겨울',
   description: '눈과 함께하는 인생샷',
   color: 'bg-slate-100',
   textColor: 'text-slate-800'
 }
};

const PhotoSpotPage = () => {
 const navigate = useNavigate();
 const [popularSpots, setPopularSpots] = useState([]);
 const [loading, setLoading] = useState(true);
 const [activeTab, setActiveTab] = useState('all');

 useEffect(() => {
   const fetchPopularSpots = async () => {
     try {
       // 서울(areaCode: 1) 기준으로 인기 관광지 조회
       const spots = await tourApiService.getRelatedAttractions('1');
       setPopularSpots(spots.response.body.items.item);
     } catch (error) {
       console.error('Failed to fetch popular spots:', error);
     } finally {
       setLoading(false);
     }
   };

   fetchPopularSpots();
 }, []);

 const handleCityClick = (cityId) => {
   navigate(`/photo-spot/${cityId}`);
 };

 return (
   <div className="min-h-screen bg-gray-50">
     {/* Hero Section */}
     <div className="relative h-[400px] overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-90" />
       <div className="absolute inset-0 bg-black opacity-30" />
       <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
         <h1 className="text-5xl font-bold mb-6">포토스팟 가이드</h1>
         <p className="text-xl max-w-2xl">
           전국의 인생샷 명소를 한눈에! 최적의 촬영 시간과 꿀팁으로 완벽한 사진을 남겨보세요.
         </p>
       </div>
     </div>

     {/* Main Content */}
     <div className="container mx-auto px-4 py-12">
       {/* City Selection */}
       <div className="mb-16">
         <h2 className="text-3xl font-bold mb-8 flex items-center">
           <MapPin className="mr-2" />
           도시별 포토스팟
         </h2>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {MAJOR_CITIES.map((city) => (
             <div
               key={city.title}
               onClick={() => handleCityClick(city.title.toLowerCase())}
               className="group cursor-pointer"
             >
               <div className="relative overflow-hidden rounded-lg shadow-lg">
                 <img
                   src={`/src/assets/images/TripPlace/${city.title}.png`}
                   alt={city.title}
                   className="w-full h-48 object-cover transform transition-transform group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-4 text-white">
                   <h3 className="text-xl font-semibold">{city.title}</h3>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div>

       {/* Popular Spots Section */}
       <div className="mb-16">
         <h2 className="text-3xl font-bold mb-8 flex items-center">
           <Star className="mr-2" />
           인기 포토스팟
         </h2>
         {loading ? (
           <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {popularSpots.slice(0, 6).map((spot) => (
               <div
                 key={spot.contentid}
                 className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
               >
                 <div className="relative h-48">
                   <img
                     src={spot.firstimage || '/placeholder-image.jpg'}
                     alt={spot.title}
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                     <h3 className="text-white text-lg font-semibold">{spot.title}</h3>
                     <p className="text-white/80 text-sm">{spot.addr1}</p>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         )}
       </div>

       {/* Seasonal Recommendations */}
       <div>
         <h2 className="text-3xl font-bold mb-8 flex items-center">
           <Calendar className="mr-2" />
           계절별 추천 포토스팟
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {Object.entries(seasonalData).map(([season, data]) => (
             <div
               key={season}
               className={`${data.color} rounded-lg p-6 transition-transform hover:-translate-y-1`}
             >
               <h3 className={`text-xl font-bold mb-2 ${data.textColor}`}>
                 {data.title}
               </h3>
               <p className={`${data.textColor} opacity-80`}>
                 {data.description}
               </p>
             </div>
           ))}
         </div>
       </div>
     </div>
   </div>
 );
};

export default PhotoSpotPage;