import { useState } from "react";

export const useTripDetail = (initialDetail) => {
    const [detail, setDetail] = useState(initialDetail);

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

    return {
        detail,
        setDetail,
        drop,
        deleteDetail,
        changeImages,
        addPlace,
        postTrip,
    };
};
