import { useState, useEffect, useRef } from "react";
import { placeData } from "../data/placeData";


export const useModalManager = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState("list");
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [note, setNote] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
        setCurrentView("list");
        setSelectedPlace(null);
        setNote(""); // 메모 초기화
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentView("list");
        setSelectedPlace(null);
        setNote(""); // 메모 초기화
    };

    const selectPlace = (place) => {
        setSelectedPlace(place);
        setCurrentView("note");
    };

    const backToList = () => {
        setCurrentView("list");
        setSelectedPlace(null);
        setNote("");
    };

    return {
        isModalOpen,
        currentView,
        selectedPlace,
        note,
        openModal,
        closeModal,
        selectPlace,
        backToList,
        setNote,
    };
};




export const usePlaceManager = () => {
    const [placeDatas, setPlaceDatas] = useState(placeData);  //카테고리
    const [filteredPlaceDatas, setFilteredPlaceDatas] = useState(placeData);  //카테고리 && 검색
    const [searchValue, setSearchValue] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [tabIndex, setTabIndex] = useState(0);
    const [likedPlaces, setLikedPlaces] = useState(placeData);  //좋아요 눌린 장소
    const storedLikePlaces = JSON.parse(localStorage.getItem("likedPlaces") || "[]");
    //console.log(storedLikePlaces);
    

    useEffect(() => {
        let filtered = placeDatas;

        if (searchValue.trim()) {
            filtered = filtered.filter((place) =>
                place.name.includes(searchValue.trim())
            );
        }

        if (selectedRegion) {
            filtered = filtered.filter((place) => place.place === selectedRegion);
        }

        setFilteredPlaceDatas(filtered);

        const filteredWithLike = filtered.filter(item => storedLikePlaces.includes(item.name));

        setLikedPlaces(filteredWithLike);
    }, [searchValue, selectedRegion, placeDatas]);

    const handleSearchChange = (value) => setSearchValue(value);

    const handleRegionChange = (region) => {
        setSelectedRegion(region);

        // 지역 필터링
        if (region) {
            const newPlaceDatas = placeDatas.filter((place) => place.place === region);
            setFilteredPlaceDatas(newPlaceDatas);
        } else {
            // 전체 데이터로 복원
            setFilteredPlaceDatas(placeDatas);
        }
    }

    const handleCategoryChange = (category) => {
        const newPlaceDatas = placeData.filter(place => place.category === category);
        setPlaceDatas(newPlaceDatas);
    }

    // 탭 변경 핸들러
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
      };
    
      // 탭별 데이터 필터링
      const getDisplayedPlaces = () => {
        if (tabIndex === 0) return filteredPlaceDatas; // "전체 장소"
        if (tabIndex === 1) return likedPlaces; // "좋아요 누른 장소"
        return [];
      };
    return {
        filteredPlaceDatas,
        searchValue,
        selectedRegion,
        handleSearchChange,
        handleRegionChange,
        handleCategoryChange,
        tabIndex,
        handleTabChange,
        getDisplayedPlaces
    };
};



export const useDragAndDrop = (onDrop, date) => {
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);

    const dragStart = (idx) => {
        dragItem.current = idx;
    };

    const dragEnter = (idx) => {
        dragOverItem.current = idx;
    };

    const drop = () => {
        if (dragItem.current !== null && dragOverItem.current !== null) {
            onDrop(date, dragItem.current, dragOverItem.current);
        }
        dragItem.current = null;
        dragOverItem.current = null;
    };

    return { dragStart, dragEnter, drop };
};



export const useTravelCalculator = (onChangeMap) => {
    const [result, setResult] = useState({ allDuration: 0, allDistance: 0, durations: [] });

    const calculateTravelTime = async (datePlan) => {
        const url = "https://apis-navi.kakaomobility.com/v1/waypoints/directions";
        const apiKey = import.meta.env.VITE_KAKAODEVELOPERS_API_KEY;

        if (datePlan == undefined) return;
        if (datePlan.length < 2 ) return;


        const waypoints = datePlan.slice(1, -1).map((point, index) => ({
            name: `name${index}`,
            x: point.x,
            y: point.y,
        }));

        const requestBody = {
            origin: { x: datePlan[0].x, y: datePlan[0].y },
            destination: { x: datePlan[datePlan.length - 1].x, y: datePlan[datePlan.length - 1].y },
            waypoints,
            priority: "RECOMMEND",
            car_fuel: "GASOLINE",
            car_hipass: false,
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `KakaoAK ${apiKey}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) throw new Error("Failed to fetch travel time");

            const data = await response.json();
            onChangeMap(data);

            const newResult = {
                allDuration: data.routes[0]?.summary?.duration || 0,
                allDistance: data.routes[0]?.summary?.distance || 0,
                durations: data.routes[0]?.sections.map((val) => ({
                    distance: val.distance,
                    duration: val.duration,
                })),
            };

            setResult(newResult);
        } catch (error) {
            console.error("Error calculating travel time:", error);
        }
    };

    return { result, calculateTravelTime };
};
