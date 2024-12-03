import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Select, 
  MenuItem, 
  Button, 
  Paper,
  IconButton 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Navbar from '../../components/common/Navbar/Navbar';
import { 
  MAJOR_CITIES,
  PHOTO_SPOT_CATEGORIES,
  getPhotoSpots,
  loadNaverMapScript,
  createPhotoSpotMarker,
  createPersonSpotMarker 
} from '../../api/map/naverMapApi';

const StyledContainer = styled(Container)({
  maxWidth: '1200px !important',
  padding: '0 20px',
});

const CategoryButton = styled(Button)(({ theme, selected }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: selected ? theme.palette.primary.main : 'transparent',
  color: selected ? 'white' : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.action.hover,
  },
}));

const SpotCard = styled(Paper)(({ theme, selected }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  cursor: 'pointer',
  borderLeft: selected ? `4px solid ${theme.palette.primary.main}` : 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const FullscreenButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  zIndex: 1000,
}));

const PhotoSpotPage = () => {
  // 지도와 파노라마 관련 ref 선언
  const mapRef = useRef(null);
  const panoRef = useRef(null);
  const fullscreenPanoRef = useRef(null);
  const mapInstance = useRef(null);
  const panoInstance = useRef(null);
  const markersRef = useRef([]);

  // 상태 관리
  const [searchQuery, setSearchQuery] = useState('');
  const [infoWindow, setInfoWindow] = useState(null);
  const [selectedCity, setSelectedCity] = useState('서울');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [selectedPersonSpot, setSelectedPersonSpot] = useState(null);
  const [spots, setSpots] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [naverMapsLoaded, setNaverMapsLoaded] = useState(false);

  // 지도/파노라마 크기 조정 핸들러
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
      
      if (panoRef.current && panoInstance.current && !isFullscreen) {
        const panoContainer = panoRef.current;
        panoInstance.current.setSize(
          new window.naver.maps.Size(
            panoContainer.clientWidth,
            panoContainer.clientHeight
          )
        );
      }
    });
  }, [isFullscreen]);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach(marker => {
      if (marker) marker.setMap(null);
    });
    markersRef.current = [];
  }, []);

  const updateMarkers = useCallback(() => {
    clearMarkers();

    if (!mapInstance.current || !selectedSpot) return;

    // 포토스팟 마커
    const spotMarker = createPhotoSpotMarker(
      mapInstance.current,
      selectedSpot,
      () => {
        if (panoInstance.current) {
          const position = new window.naver.maps.LatLng(
            selectedSpot.viewingSpot.lat,
            selectedSpot.viewingSpot.lng
          );
          panoInstance.current.setPosition(position);
        }
      }
    );
    markersRef.current.push(spotMarker);

    // 인물 위치 마커들
    selectedSpot.personSpots?.forEach(personSpot => {
      const personMarker = createPersonSpotMarker(
        mapInstance.current,
        personSpot,
        (spot) => {
          setSelectedPersonSpot(spot);
          if (panoInstance.current) {
            const position = new window.naver.maps.LatLng(spot.lat, spot.lng);
            panoInstance.current.setPosition(position);
          }
        }
      );
      markersRef.current.push(personMarker);
    });
  }, [selectedSpot, clearMarkers]);

  const handleSpotSelect = useCallback(async (spot) => {
    setSelectedSpot(spot);
    setSelectedPersonSpot(null);
    
    if (!window.naver?.maps) return;

    const position = new window.naver.maps.LatLng(spot.lat, spot.lng);
    const viewingPosition = new window.naver.maps.LatLng(
      spot.viewingSpot.lat,
      spot.viewingSpot.lng
    );
    
    await Promise.all([
      new Promise(resolve => {
        if (mapInstance.current) {
          mapInstance.current.setCenter(position);
          mapInstance.current.setZoom(18);
        }
        resolve();
      }),
      new Promise(resolve => {
        if (panoInstance.current) {
          panoInstance.current.setPosition(viewingPosition);
        }
        resolve();
      })
    ]);

    updateMarkers();
  }, [updateMarkers]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  useEffect(() => {
    const loadMaps = async () => {
      try {
        await loadNaverMapScript();
        setNaverMapsLoaded(true);
      } catch (error) {
        console.error('Failed to load Naver Maps:', error);
      }
    };
    loadMaps();
  }, []);

  useEffect(() => {
    if (!naverMapsLoaded) return;

    let timer;
    const initMap = () => {
      if (!mapRef.current || !window.naver?.maps) return;

      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(37.5666103, 126.9783882),
        zoom: 17,
        mapTypeControl: true
      });

      map.setCursor('pointer');
      mapInstance.current = map;

      const streetLayer = new window.naver.maps.StreetLayer();
      window.naver.maps.Event.once(map, 'init', () => {
        streetLayer.setMap(map);
        handleResize();
      });
    };

    const initMainPanorama = () => {
      if (!panoRef.current || !window.naver?.maps) return;
      
      const pano = new window.naver.maps.Panorama(panoRef.current, {
        position: new window.naver.maps.LatLng(37.5666103, 126.9783882),
        pov: {
          pan: -133,
          tilt: 0,
          fov: 100
        },
        zoomControl: true,
        flightSpot: true
      });

      panoInstance.current = pano;

      pano.addListener('pano_changed', () => {
        if (!mapInstance.current) return;
        const latlng = pano.getPosition();
        if (!latlng.equals(mapInstance.current.getCenter())) {
          mapInstance.current.setCenter(latlng);
        }
      });

      handleResize();
    };

    const initializeComponents = () => {
      initMap();
      timer = setTimeout(initMainPanorama, 100);
    };

    window.addEventListener('resize', handleResize);
    initializeComponents();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (panoInstance.current) {
        panoInstance.current.destroy();
        panoInstance.current = null;
      }
      if (mapInstance.current) {
        mapInstance.current = null;
      }
      if (timer) {
        clearTimeout(timer);
      }
      clearMarkers();
    };
  }, [naverMapsLoaded, handleResize, clearMarkers]);

  useEffect(() => {
    const citySpots = getPhotoSpots(selectedCity, selectedCategory);
    setSpots(citySpots);
  }, [selectedCity, selectedCategory]);

  const FullscreenPanorama = () => {
    if (!isFullscreen) return null;

    useEffect(() => {
      if (!fullscreenPanoRef.current || !selectedSpot) return;

      const pano = new window.naver.maps.Panorama(fullscreenPanoRef.current, {
        position: new window.naver.maps.LatLng(
          selectedSpot.viewingSpot.lat,
          selectedSpot.viewingSpot.lng
        ),
        pov: {
          pan: -133,
          tilt: 0,
          fov: 100
        },
        zoomControl: true,
        flightSpot: true
      });

      return () => {
        if (pano) {
          pano.destroy();
        }
      };
    }, []);

    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backgroundColor: '#000'
        }}
      >
        <IconButton
          onClick={toggleFullscreen}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            zIndex: 10000,
          }}
        >
          <FullscreenExitIcon />
        </IconButton>
        <div 
          ref={fullscreenPanoRef}
          style={{ 
            width: '100%', 
            height: '100%'
          }} 
        />
        {selectedSpot && (
          <Paper
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              right: 16,
              p: 2,
              mx: 'auto',
              maxWidth: '800px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              backdropFilter: 'blur(5px)'
            }}
          >
            <Typography variant="h6" gutterBottom>
              {selectedSpot.title}
            </Typography>
            <Typography variant="body2">
              💡 촬영 팁: {selectedSpot.tips}
            </Typography>
          </Paper>
        )}
      </div>
    );
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#fff' }}>
      <StyledContainer>
        <Navbar />
        
        <Box sx={{ width: '100%', mt: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            포토스팟 가이드
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              sx={{ mr: 2, minWidth: 120 }}
            >
              {MAJOR_CITIES.map(city => (
                <MenuItem key={city.title} value={city.title}>
                  {city.title}
                </MenuItem>
              ))}
            </Select>

            <Box sx={{ mt: 2 }}>
              {PHOTO_SPOT_CATEGORIES.map(category => (
                <CategoryButton
                  key={category.id}
                  selected={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "contained" : "outlined"}
                  startIcon={category.id === 'all' ? <CameraAltIcon /> : null}
                >
                  {category.name}
                </CategoryButton>
              ))}
            </Box>
          </Box>

          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 3fr', 
            gap: 3,
            height: 'calc(100vh - 300px)'
          }}>
            <Box sx={{ overflowY: 'auto' }}>
              {spots.map(spot => (
                <SpotCard
                  key={spot.id}
                  selected={selectedSpot?.id === spot.id}
                  onClick={() => handleSpotSelect(spot)}
                  elevation={selectedSpot?.id === spot.id ? 3 : 1}
                >
                  <Typography variant="h6" gutterBottom>
                    {spot.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    📸 추천 시간: {spot.bestTime.join(', ')}
                  </Typography>
                  <Typography variant="body2">
                    {spot.description}
                  </Typography>
                </SpotCard>
              ))}
            </Box>

            <Box sx={{ position: 'relative' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '3fr 2fr', 
                gap: '20px',
                height: '100%'
              }}>
                <div style={{ 
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}>
                  <FullscreenButton onClick={toggleFullscreen}>
                    {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                  </FullscreenButton>
                  {!isFullscreen && (
                    <div ref={panoRef} style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0
                    }} />
                  )}
                </div>
                <div style={{ 
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
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

              {selectedSpot && !isFullscreen && (
                <Paper
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    p: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(5px)'
                  }}
                >
                  <Typography variant="body2">
                    💡 촬영 팁: {selectedSpot.tips}
                  </Typography>
                </Paper>
              )}

              {selectedPersonSpot && !isFullscreen && (
                <Paper
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    right: 16,
                    p: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 1000
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    <PersonPinIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {selectedPersonSpot.description}
                  </Typography>
                  <Typography variant="body2">
                    {selectedPersonSpot.tip}
                  </Typography>
                </Paper>
              )}
            </Box>
          </Box>
        </Box>
      </StyledContainer>

      <FullscreenPanorama />
    </div>
  );
};

export default PhotoSpotPage;