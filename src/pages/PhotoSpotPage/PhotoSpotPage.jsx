import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../../components/common/Navbar/Navbar';

const StyledContainer = styled(Container)({
  maxWidth: '1200px !important',
  padding: '0 20px',
});

const PhotoSpotPage = () => {
  const mapRef = useRef(null);
  const panoRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [infoWindow, setInfoWindow] = useState(null);
  const mapInstance = useRef(null);
  const panoInstance = useRef(null);

  // 좌표로 주소 검색
  const searchCoordinateToAddress = (latlng) => {
    if (infoWindow) infoWindow.close();

    window.naver.maps.Service.reverseGeocode({
      coords: latlng,
      orders: [
        window.naver.maps.Service.OrderType.ADDR,
        window.naver.maps.Service.OrderType.ROAD_ADDR
      ].join(',')
    }, (status, response) => {
      if (status === window.naver.maps.Service.Status.ERROR) {
        return alert('주소 검색 중 오류가 발생했습니다.');
      }

      if (!response || !response.v2 || !response.v2.address) {
        return alert('검색 결과가 없습니다.');
      }

      const address = response.v2.address;
      const contentText = [
        address.roadAddress && `<p style="font-size: 14px;margin-bottom: 5px;">[도로명] ${address.roadAddress}</p>`,
        address.jibunAddress && `<p style="font-size: 14px;margin-bottom: 5px;">[지번] ${address.jibunAddress}</p>`
      ].filter(Boolean).join('');

      const newInfoWindow = new window.naver.maps.InfoWindow({
        content: `
          <div style="padding:10px;min-width:200px;">
            <h4 style="margin-top:5px;margin-bottom:10px;">선택 위치</h4>
            ${contentText}
          </div>
        `,
        anchorSkew: true,
        backgroundColor: '#fff',
        borderColor: '#5F85BB',
        borderWidth: 2
      });

      newInfoWindow.open(mapInstance.current, latlng);
      setInfoWindow(newInfoWindow);
    });
  };

  // 주소/장소 검색
  const searchAddressToCoordinate = (query) => {
    if (!query || !window.naver.maps.Service || !window.naver.maps.Service.geocode) return;

    const searchOption = {
      query: query,
      types: ['PLACE', 'ADDRESS', 'ROAD_ADDR']
    };

    window.naver.maps.Service.geocode(searchOption, (status, response) => {
      if (status === window.naver.maps.Service.Status.ERROR) {
        return alert('검색 중 오류가 발생했습니다.');
      }

      if (!response || !response.v2 || !response.v2.addresses || response.v2.addresses.length === 0) {
        return alert('검색 결과가 없습니다.');
      }

      const item = response.v2.addresses[0];
      const point = new window.naver.maps.Point(item.x, item.y);
      const position = new window.naver.maps.LatLng(item.y, item.x);

      if (infoWindow) infoWindow.close();

      const contentText = [
        item.roadAddress && `<p style="font-size: 14px;margin-bottom: 5px;">[도로명] ${item.roadAddress}</p>`,
        item.jibunAddress && `<p style="font-size: 14px;margin-bottom: 5px;">[지번] ${item.jibunAddress}</p>`
      ].filter(Boolean).join('');

      const newInfoWindow = new window.naver.maps.InfoWindow({
        content: `
          <div style="padding:10px;min-width:200px;">
            <h4 style="margin-top:5px;margin-bottom:10px;">${query}</h4>
            ${contentText}
          </div>
        `,
        anchorSkew: true,
        backgroundColor: '#fff',
        borderColor: '#5F85BB',
        borderWidth: 2
      });

      mapInstance.current?.setCenter(position);
      panoInstance.current?.setPosition(position);
      
      newInfoWindow.open(mapInstance.current, position);
      setInfoWindow(newInfoWindow);
    });
  };

  const handleResize = useCallback(() => {
    requestAnimationFrame(() => {
      if (mapRef.current && mapInstance.current) {
        const mapContainer = mapRef.current;
        mapInstance.current.setSize(
          new window.naver.maps.Size(
            mapContainer.clientWidth,
            mapContainer.clientHeight
          )
        );
      }
      
      if (panoRef.current && panoInstance.current) {
        const panoContainer = panoRef.current;
        panoInstance.current.setSize(
          new window.naver.maps.Size(
            panoContainer.clientWidth,
            panoContainer.clientHeight
          )
        );
      }
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initMap = () => {
      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(37.5666103, 126.9783882),
        zoom: 17,
        mapTypeControl: true
      });

      map.setCursor('pointer');
      mapInstance.current = map;

      const streetLayer = new window.naver.maps.StreetLayer();
      window.naver.maps.Event.once(map, 'init', function() {
        streetLayer.setMap(map);
        handleResize();
      });

      window.naver.maps.Event.addListener(map, 'click', function(e) {
        if (!isMounted) return;
        const latlng = e.coord;
        searchCoordinateToAddress(latlng);
        
        if (streetLayer.getMap() && panoInstance.current) {
          panoInstance.current.setPosition(latlng);
        }
      });
    };

    const initPanorama = () => {
      window.naver.maps.onJSContentLoaded = function() {
        if (!isMounted) return;

        const pano = new window.naver.maps.Panorama(panoRef.current, {
          position: new window.naver.maps.LatLng(37.5666103, 126.9783882),
          pov: {
            pan: -133,
            tilt: 0,
            fov: 100
          }
        });

        panoInstance.current = pano;

        window.naver.maps.Event.addListener(pano, 'pano_changed', function() {
          if (!isMounted || !mapInstance.current) return;
          const latlng = pano.getPosition();
          if (!latlng.equals(mapInstance.current.getCenter())) {
            mapInstance.current.setCenter(latlng);
          }
        });

        handleResize();
      };
    };

    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_NAVER_MAP_CLIENT_ID}&submodules=panorama,geocoder,drawing`;
    script.async = true;
    script.onload = () => {
      if (!isMounted) return;
      initMap();
      initPanorama();
    };
    document.head.appendChild(script);

    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (infoWindow) {
        infoWindow.close();
      }
    };
  }, [handleResize]);

  const handleSearch = () => {
    if (!searchQuery) return;
    searchAddressToCoordinate(searchQuery);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#fff' }}>
      <StyledContainer>
        <Navbar />
        
        <div style={{ width: '100%' }}>
          <div style={{
            marginBottom: '20px',
            display: 'flex',
            gap: '10px'
          }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="장소명이나 주소를 입력하세요 (예: 명동성당, 강남역)"
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                padding: '8px 16px',
                backgroundColor: '#2DB400',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                minWidth: '80px'
              }}
            >
              검색
            </button>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '2fr 1fr', 
            gap: '20px',
            height: 'calc(100vh - 200px)',
            width: '100%'
          }}>
            <div style={{ 
              backgroundColor: '#fff',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              width: '100%',
              height: '100%',
              position: 'relative'
            }}>
              <div ref={panoRef} style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }} />
            </div>
            <div style={{ 
              backgroundColor: '#fff',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              width: '100%',
              height: '100%',
              position: 'relative'
            }}>
              <div ref={mapRef} style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }} />
            </div>
          </div>
        </div>
      </StyledContainer>
    </div>
  );
};

export default PhotoSpotPage;