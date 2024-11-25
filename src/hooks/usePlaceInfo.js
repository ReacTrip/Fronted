import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

const KAKAO_API_KEY = import.meta.env.VITE_KAKAODEVELOPERS_API_KEY;

export const usePlaceInfo = () => {
  const [placeInfo, setPlaceInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('관광지');
  const abortControllerRef = useRef(null);

  const categoryGroupCodes = {
    '관광지': 'AT4',
    '맛집': 'FD6',
    '숙박': 'AD5',
    '인기명소': 'AT4'
  };

  const fetchPlaceDetails = async (placeName, category, cityName) => {
    try {
      const response = await axios.get(
        'https://dapi.kakao.com/v2/search/image',
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_API_KEY}`
          },
          params: {
            query: `${cityName} ${placeName}`,
            size: 5,
            sort: 'accuracy'
          }
        }
      );

      const images = response.data.documents || [];
      const filteredImages = images.filter(img => 
        !img.display_sitename.toLowerCase().includes('map') &&
        !img.collection.toLowerCase().includes('map') &&
        !img.image_url.includes('map_') &&
        !img.image_url.includes('static') &&
        !img.image_url.includes('mangoplate.com')
      );

      // 이미지가 없는 경우 null 반환
      return filteredImages[0]?.image_url || null;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  const debouncedFetch = useCallback(
    debounce(async (placeName, category, signal) => {
      try {
        const kakaoResponse = await axios.get(
          'https://dapi.kakao.com/v2/local/search/keyword.json',
          {
            headers: {
              Authorization: `KakaoAK ${KAKAO_API_KEY}`
            },
            params: {
              query: category === '인기명소' ? `${placeName} 명소` : `${placeName} ${category}`,
              category_group_code: categoryGroupCodes[category],
              size: 15
            },
            signal: signal
          }
        );

        const placesWithImages = await Promise.all(
          kakaoResponse.data.documents.map(async (place) => {
            const imageUrl = await fetchPlaceDetails(place.place_name, category, placeName);
            return {
              id: place.id,
              name: place.place_name,
              address: place.address_name,
              roadAddress: place.road_address_name,
              phone: place.phone,
              url: place.place_url,
              categoryName: place.category_name,
              x: place.x,
              y: place.y,
              imageUrl: imageUrl
            };
          })
        );

        setPlaceInfo(placesWithImages);
        setError(null);
      } catch (err) {
        if (err.name === 'CanceledError') {
          console.log('Request cancelled');
        } else {
          setError(err.message);
          console.error('Error fetching place info:', err);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  const fetchPlaceInfo = useCallback(async (placeName, category) => {
    if (!placeName || !category) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    
    setIsLoading(true);
    setError(null);

    debouncedFetch(placeName, category, abortControllerRef.current.signal);
  }, [debouncedFetch]);

  const resetPlaceInfo = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setPlaceInfo(null);
    setError(null);
    setActiveCategory('관광지');
  }, []);

  return {
    placeInfo,
    isLoading,
    error,
    activeCategory,
    setActiveCategory,
    fetchPlaceInfo,
    resetPlaceInfo
  };
};