import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Clock, Sun, MapPin, Info, Star } from 'lucide-react';
import NaverMapComponent from '../../components/map/NaverMapComponent';
import tourApiService from '../../api/TourApiService';

// getSpotDetail 함수를 tourApiService에서 직접 사용
const SpotDetail = () => {
  const { cityId, spotId } = useParams();
  const [spotData, setSpotData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchSpotDetail = async () => {
      try {
        const data = await tourApiService.getRelatedAttractions(spotId);
        setSpotData(data);
      } catch (error) {
        console.error('Failed to fetch spot details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotDetail();
  }, [spotId]);

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
         src={spotData.firstimage || '/placeholder-image.jpg'}
         alt={spotData.title}
         className="w-full h-full object-cover"
       />
       <div className="absolute inset-0 bg-black bg-opacity-40" />
       <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
         <div className="container mx-auto">
           <h1 className="text-4xl font-bold mb-4">{spotData.title}</h1>
           <p className="flex items-center text-lg">
             <MapPin className="mr-2" />
             {spotData.addr1}
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
               {/* Overview Section */}
               <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                 <h2 className="text-2xl font-bold mb-4">소개</h2>
                 <p className="text-gray-700 leading-relaxed">{spotData.overview}</p>
               </div>

               {/* Gallery Section */}
               <div className="bg-white rounded-lg shadow-lg p-6">
                 <h2 className="text-2xl font-bold mb-4">사진 갤러리</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   {spotData.additionalImages?.map((image, index) => (
                     <div
                       key={index}
                       className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                       onClick={() => setSelectedImage(image.originimgurl)}
                     >
                       <img
                         src={image.originimgurl}
                         alt={`Gallery ${index + 1}`}
                         className="w-full h-full object-cover transform transition-transform hover:scale-110"
                       />
                     </div>
                   ))}
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
                 <TimeGuide timeInfo={spotData} weatherTips={spotData.weatherTips} />
               </div>

               {/* Camera Settings */}
               <div className="bg-white rounded-lg shadow-lg p-6">
                 <h2 className="text-2xl font-bold mb-4 flex items-center">
                   <Camera className="mr-2" />
                   카메라 설정 가이드
                 </h2>
                 <CameraGuide settings={spotData.cameraSettings} />
               </div>

               {/* Pose Guide */}
               <div className="bg-white rounded-lg shadow-lg p-6">
                 <h2 className="text-2xl font-bold mb-4">추천 포즈 & 구도</h2>
                 <PoseGuide poses={spotData.poses} />
               </div>
             </div>
           )}
         </div>

         {/* Right Column - Fixed Map & Info */}
         <div className="lg:col-span-1">
           <div className="sticky top-8 space-y-8">
             {/* Map */}
             <div className="bg-white rounded-lg shadow-lg overflow-hidden">
               <div className="h-[300px]">
                 <NaverMapComponent
                   center={{
                     lat: parseFloat(spotData.mapy),
                     lng: parseFloat(spotData.mapx)
                   }}
                   markers={[
                     {
                       position: {
                         lat: parseFloat(spotData.mapy),
                         lng: parseFloat(spotData.mapx)
                       },
                       title: spotData.title
                     }
                   ]}
                   zoom={15}
                 />
               </div>
             </div>

             {/* Quick Info */}
             <div className="bg-white rounded-lg shadow-lg p-6">
               <h3 className="text-xl font-bold mb-4">기본 정보</h3>
               <div className="space-y-4">
                 <div className="flex items-start">
                   <MapPin className="w-5 h-5 mr-3 mt-1 text-gray-500" />
                   <div>
                     <p className="text-sm font-medium text-gray-800">주소</p>
                     <p className="text-sm text-gray-600">{spotData.addr1}</p>
                   </div>
                 </div>
                 {spotData.tel && (
                   <div className="flex items-start">
                     <Phone className="w-5 h-5 mr-3 mt-1 text-gray-500" />
                     <div>
                       <p className="text-sm font-medium text-gray-800">전화번호</p>
                       <p className="text-sm text-gray-600">{spotData.tel}</p>
                     </div>
                   </div>
                 )}
               </div>
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