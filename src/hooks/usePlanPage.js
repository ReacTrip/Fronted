import { useState } from "react";

export const useTripDetail = (initialDetail) => {
    const [detail, setDetail] = useState(initialDetail);

    //시작날짜와 끝 날짜로 날짜 배열 생성해주는 함수
    const generateDateArray = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dateArray = [];

        for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
            const formattedDate = date.toISOString().split("T")[0]; // 'yyyy-mm-dd' 형식으로 변환
            dateArray.push(formattedDate);
        }

        return dateArray;
    };
    // 날짜 배열 생성
    const dates = generateDateArray(detail.startDate, detail.endDate);

    const [selectedDate, setSelectedDate] = useState(dates[0]);


    const handleDateClick = (dates) => {
        setSelectedDate(dates);
    };


    const drop = (selectedDate, dragIdx, dragOverIdx) => {
        const updatedItinerary = { ...detail.dailyItinerary };
        const copyListItems = [...updatedItinerary[selectedDate]];

        const dragItemContent = copyListItems[dragIdx];
        copyListItems.splice(dragIdx, 1);
        copyListItems.splice(dragOverIdx, 0, dragItemContent);

        updatedItinerary[selectedDate] = copyListItems;

        setDetail((prevDetail) => ({
            ...prevDetail,
            dailyItinerary: updatedItinerary,
        }));
    };

    const deleteDetail = (deleteDate, deleteIdx) => {
        const updatedItinerary = {
            ...detail.dailyItinerary,
            [deleteDate]: detail.dailyItinerary[deleteDate].filter((_, idx) => idx !== deleteIdx),
        };

        setDetail((prevDetail) => ({
            ...prevDetail,
            dailyItinerary: updatedItinerary,
        }));
    };

    const changeImages = (date, idx, newImages) => {
        const updatedItinerary = { ...detail.dailyItinerary };
        updatedItinerary[date][idx].images = newImages;

        setDetail((prevDetail) => ({
            ...prevDetail,
            dailyItinerary: updatedItinerary,
        }));
    };

    const addPlace = (date, place, notes, time) => {
        const updatedItinerary = { ...detail.dailyItinerary };

        console.log("Before:", updatedItinerary[date]); // 기존 값 확인

        if (!Array.isArray(updatedItinerary[date])) {
            updatedItinerary[date] = [];
        }
        updatedItinerary[date] = [
            ...updatedItinerary[date],
            {
                name: place.name,
                city: "",
                time: time,
                notes: notes,
                placeImage: place.image,
                images: [],
                x: place.x,
                y: place.y,
                category: place.category,
            },
        ];

        setDetail((prevDetail) => ({
            ...prevDetail,
            dailyItinerary: updatedItinerary,
        }));
    };

    const postTrip = () => {
        const newDetail = { ...detail };
        if (newDetail.post) {
            if (confirm("게시물을 삭제하시겠습니까?")) {
                newDetail.post = 0; // 값 변경
                alert("게시물이 삭제되었습니다.");
            } else {
                return;
            }
        } else {
            newDetail.post = 1; // 값 변경
            alert("게시물 작성을 완료하였습니다.");
        }
        setDetail(newDetail);
    }

    const addDate = () => {
        const newDetail = { ...detail }; // 원본 데이터 복사
        const endDate = new Date(detail.endDate);
        endDate.setDate(endDate.getDate() + 1); // 하루 추가
        newDetail.endDate = endDate.toISOString().split("T")[0]; // 날짜 문자열로 변환
        setDetail(newDetail);
    }

    const deleteDate = () => {
        if (detail.startDate === detail.endDate) return;
        const newDetail = { ...detail }; // 원본 데이터 복사
        const endDate = new Date(detail.endDate);
        const strEndDate = endDate.toISOString().split("T")[0]; // 날짜 문자열로 변환
        endDate.setDate(endDate.getDate() - 1); // 하루 삭제
        newDetail.endDate = endDate.toISOString().split("T")[0]; // 날짜 문자열로 변환
        newDetail.dailyItinerary[strEndDate] = [];
        setDetail(newDetail);
        if(strEndDate === selectedDate) setSelectedDate(newDetail.endDate);
    }

    return {
        detail,
        setDetail,
        drop,
        deleteDetail,
        changeImages,
        addPlace,
        postTrip,
        addDate,
        deleteDate,
        dates,
        selectedDate,
        handleDateClick
    };
};
