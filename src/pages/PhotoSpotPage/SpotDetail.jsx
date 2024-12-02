import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Clock, Sun, MapPin, Info, Star } from 'lucide-react';
import NaverMapComponent from '../../components/map/NaverMapComponent';
import { getSpotDetail } from '../../api/KakoTourApi.js';

const SpotDetail = () => {
 const { spotName } = useParams();
 const [spotData, setSpotData] = useState(null);
 const [loading, setLoading] = useState(true);
 const [activeTab, setActiveTab] = useState('info');
 const [selectedImage, setSelectedImage] = useState(null);

 useEffect(() => {
   const fetchSpotDetail = async () => {
     try {
       const data = await getSpotDetail(decodeURIComponent(spotName));
       setSpotData(data);
     } catch (error) {
       console.error('Failed to fetch spot details:', error);
     } finally {
       setLoading(false);
     }
   };

   fetchSpotDetail();
 }, [spotName]);

 if (loading) {
   return (
     <div className="flex justify-center items-center min-h-screen">
       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
     </div>
   );
 }

 if (!spotData) {
   return (
     <div className="container mx-auto px-4 py-12 text-center">
       <h2 className="text-2xl font-bold text-gray-800">포토스팟 정보를 찾을 수 없습니다.</h2>
     </div>
   );
 }

 return (
   <div className="min-h-screen bg-gray-50">
     {/* Header Image Section */}
     <div className="relative h-[500px]">
       <img
         src={spotData.images[0] || '/placeholder-image.jpg'}
         alt={spotData.title}
         className="w-full h-full object-cover"
       />
       <div className="absolute inset-0 bg-black bg-opacity-40" />
       <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
         <div className="container mx-auto">
           <h1 className="text-4xl font-bold mb-4">{spotData.title}</h1>
           <p className="flex items-center text-lg">
             <MapPin className="mr-2" />
             {spotData.address}
           </p>
         </div>
       </div>
     </div>

     {/* Main Content */}
     <div className="container mx-auto px-4 py-12">
       {/* Navigation Tabs */}
       <div className="flex mb-8 border-b">
         <button
           onClick={() => setActiveTab('info')}
           className={`mr-8 py-4 px-2 font-semibold relative ${
             activeTab === 'info'
               ? 'text-purple-600 border-b-2 border-purple-600'
               : 'text-gray-600'
           }`}
         >
           <span className="flex items-center">
             <Info className="mr-2" />
             기본 정보
           </span>
         </button>
         <button
           onClick={() => setActiveTab('photo')}
           className={`mr-8 py-4 px-2 font-semibold relative ${
             activeTab === 'photo'
               ? 'text-purple-600 border-b-2 border-purple-600'
               : 'text-gray-600'
           }`}
         >
           <span className="flex items-center">
             <Camera className="mr-2" />
             촬영 가이드
           </span>
         </button>
       </div>

       {/* Content Sections */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Column */}
         <div className="lg:col-span-2">
           {activeTab === 'info' ? (
             <>
               {/* Photo Gallery */}
               <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                 <h2 className="text-2xl font-bold mb-4">사진 갤러리</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   {spotData.images.map((image, index) => (
                     <div
                       key={index}
                       className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                       onClick={() => setSelectedImage(image)}
                     >
                       <img
                         src={image}
                         alt={`Gallery ${index + 1}`}
                         className="w-full h-full object-cover transform transition-transform hover:scale-110"
                       />
                     </div>
                   ))}
                 </div>
               </div>

               {/* Additional Info */}
               <div className="bg-white rounded-lg shadow-lg p-6">
                 <h2 className="text-2xl font-bold mb-4">상세 정보</h2>
                 <div className="space-y-4">
                   <p className="text-gray-600">
                     카테고리: {spotData.category}
                   </p>
                   {spotData.phone && (
                     <p className="text-gray-600">
                       전화번호: {spotData.phone}
                     </p>
                   )}
                 </div>
               </div>
             </>
           ) : (
             <div className="space-y-8">
               {/* Best Time Guide */}
               <div className="bg-white rounded-lg shadow-lg p-6">
                 <h2 className="text-2xl font-bold mb-4 flex items-center">
                   <Clock className="mr-2" />
                   최적의 촬영 시간
                 </h2>
                 <div className="space-y-4">
                   <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                     <div>
                       <p className="font-semibold">아침</p>
                       <p className="text-gray-600">{spotData.photoGuide.bestTime.morning}</p>
                     </div>
                     <div>
                       <p className="font-semibold">저녁</p>
                       <p className="text-gray-600">{spotData.photoGuide.bestTime.evening}</p>
                     </div>
                   </div>
                   <p className="text-gray-600">{spotData.photoGuide.bestTime.reason}</p>
                 </div>
               </div>

               {/* Camera Settings */}
               <div className="bg-white rounded-lg shadow-lg p-6">
                 <h2 className="text-2xl font-bold mb-4 flex items-center">
                   <Camera className="mr-2" />
                   카메라 설정 가이드
                 </h2>
                 <div className="grid grid-cols-3 gap-4 mb-6">
                   <div className="p-4 bg-gray-50 rounded-lg">
                     <p className="font-semibold">조리개</p>
                     <p className="text-gray-600">{spotData.photoGuide.camera.aperture}</p>
                   </div>
                   <div className="p-4 bg-gray-50 rounded-lg">
                     <p className="font-semibold">셔터스피드</p>
                     <p className="text-gray-600">{spotData.photoGuide.camera.shutterSpeed}</p>
                   </div>
                   <div className="p-4 bg-gray-50 rounded-lg">
                     <p className="font-semibold">ISO</p>
                     <p className="text-gray-600">{spotData.photoGuide.camera.iso}</p>
                   </div>
                 </div>
               </div>

               {/* Photo Spots */}
               <div className="bg-white rounded-lg shadow-lg p-6">
                 <h2 className="text-2xl font-bold mb-4">추천 촬영 포인트</h2>
                 <div className="space-y-4">
                   {spotData.photoGuide.photoSpots.map((spot, index) => (
                     <div key={index} className="p-4 bg-gray-50 rounded-lg">
                       <h3 className="font-semibold mb-2">{spot.name}</h3>
                       <p className="text-gray-600 mb-2">{spot.description}</p>
                       <ul className="list-disc list-inside text-gray-600">
                         {spot.tips.map((tip, tipIndex) => (
                           <li key={tipIndex}>{tip}</li>
                         ))}
                       </ul>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           )}
         </div>

         {/* Right Column - Map */}
         <div className="lg:col-span-1">
           <div className="sticky top-8">
             <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
               <div className="h-[300px]">
                 <NaverMapComponent
                   center={{
                     lat: parseFloat(spotData.location.lat),
                     lng: parseFloat(spotData.location.lng)
                   }}
                   markers={[
                     {
                       position: {
                         lat: parseFloat(spotData.location.lat),
                         lng: parseFloat(spotData.location.lng)
                       },
                       title: spotData.title
                     }
                   ]}
                   zoom={15}
                 />
               </div>
             </div>

             {/* Quick Tips */}
             <div className="bg-white rounded-lg shadow-lg p-6">
               <h3 className="text-xl font-bold mb-4">촬영 팁</h3>
               <ul className="space-y-3">
                 {spotData.photoGuide.tips.map((tip, index) => (
                   <li key={index} className="flex items-start">
                     <Star className="w-5 h-5 mr-2 text-yellow-500 flex-shrink-0" />
                     <span className="text-gray-600">{tip}</span>
                   </li>
                 ))}
               </ul>
             </div>
           </div>
         </div>
       </div>
     </div>

     {/* Image Modal */}
     {selectedImage && (
       <div
         className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
         onClick={() => setSelectedImage(null)}
       >
         <img
           src={selectedImage}
           alt="Selected"
           className="max-w-full max-h-[90vh] object-contain"
         />
       </div>
     )}
   </div>
 );
};

export default SpotDetail;