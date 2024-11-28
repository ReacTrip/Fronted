import React, { useEffect } from 'react';

function NaverMapComponent({ center, markers, zoom = 13 }) {
 useEffect(() => {
   const initMap = () => {
     const mapElement = document.getElementById('map');
     if (!mapElement) return;

     const mapOptions = {
       center: new window.naver.maps.LatLng(center.lat, center.lng),
       zoom: zoom,
       zoomControl: true,
       zoomControlOptions: {
         position: window.naver.maps.Position.TOP_RIGHT
       }
     };

     const map = new window.naver.maps.Map(mapElement, mapOptions);

     markers?.forEach(marker => {
       if (marker.position) {
         new window.naver.maps.Marker({
           position: new window.naver.maps.LatLng(marker.position.lat, marker.position.lng),
           map: map,
           title: marker.title
         });
       }
     });
   };

   initMap();
 }, [center, markers, zoom]);

 return <div id="map" style={{ width: '100%', height: '100%' }} />;
}

export default NaverMapComponent;