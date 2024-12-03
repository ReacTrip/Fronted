import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  IconButton,
} from "@mui/material";
import UserInfo from "@/components/common/UserInfo"; // 사용자 정보
import { styled } from "@mui/material/styles";
import Navbar from "@/components/common/Navbar/Navbar";
import TabContent from "@/components/common/TabContent/TabContent";
import { storage } from "@/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import DeleteIcon from "@mui/icons-material/Delete";
import TripDialog from "@/components/TripDialog/TripDialog";
import LoadingAnimation from '@/components/common/Animation/LoadingAnimation'; // Lottie 로딩 컴포넌트 가져오기
import { format } from "date-fns";

// 스타일 적용
const StyledContainer = styled(Container)({
  maxWidth: '1200px !important',
  padding: '0 20px',
});

const MyTripPage = () => {
  const [trips, setTrips] = useState([]); // 사용자의 여행 데이터
  const [likedTrips, setLikedTrips] = useState([]); // 좋아요된 여행 데이터
  const [tabValue, setTabValue] = useState(0); // 현재 탭 상태
  const [open, setOpen] = useState(false); // 모달 상태
  const [newTrip, setNewTrip] = useState({ title: "", dateRange: {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  }, image: null }); // 새 여행 데이터
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate(); //상세페이지 가기위함

  // 탭 변경
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // 모달 열기/닫기
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 이미지 업로드 핸들러
  const handleImageUpload = async (file) => {
    setIsLoading(true); // 로딩 애니메이션 표시 시작
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef); // 업로드된 이미지 URL 반환
  };

  // 상세 페이지로 이동
  const handleClick = (item) => {
    const { actions, ...data } = item;

    navigate('/budget', { state: { detail: data } });
  };

  // ************************LocalStorage 조작 부분************************

  // 로컬 스토리지에서 여행 데이터 및 좋아요 상태 가져오기
  useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem("trips")) || defaultTrips;
    const userTrips = storedTrips.filter((trip) => trip.AuthorId === UserInfo.id);
    setTrips(userTrips);
    const likedTrips = storedTrips.filter((trip) => trip.like === 1);
    setLikedTrips(likedTrips);
  });

  const handleAddTrip = async () => {
    if (!newTrip.title) {
      alert("여행 제목을 입력하세요");
      return;
    } else if (!newTrip.startDate || !newTrip.endDate) {
      alert("날짜를 모두 지정해주세요");
      return;
    }
  
    let imageUrl = "";
    if (newTrip.image) {
      imageUrl = await handleImageUpload(newTrip.image); // 이미지 업로드
      setIsLoading(false); // 로딩 애니메이션 종료
    }
  
    const generateDateArray = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const dateArray = [];
  
      for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        const formattedDate = format(new Date(date), "yyyy-MM-dd");
        dateArray.push(formattedDate);
      }
  
      return dateArray;
    };
  
    const dates = generateDateArray(newTrip.startDate, newTrip.endDate);
    const dailyItinerary = dates.reduce((acc, date) => {
      acc[date] = [];
      return acc;
    }, {});
  
    const newTripData = {
      id: `${Date.now()}`, // 고유 ID 생성
      title: newTrip.title,
      startDate: format(new Date(newTrip.startDate), "yyyy-MM-dd"),
      endDate: format(new Date(newTrip.endDate), "yyyy-MM-dd"),
      mainImage: newTrip.image ? imageUrl : null,
      dailyItinerary,
      AuthorId: UserInfo.id,
      totalLike: 0,
      like: 0,
      post: 0,
    };
  
    // localStorage에서 기존 데이터를 가져옴
    const existingTrips = JSON.parse(localStorage.getItem("trips")) || [];
    const updatedTrips = [...existingTrips, newTripData];
  
    // 상태와 localStorage를 업데이트
    setTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
  
    // 모달 닫기 후 `newTrip` 초기화
    setNewTrip({
      title: "",
      dateRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
      image: null,
    });
    setOpen(false);
  };
  


  // 여행 삭제
  const handleDeleteTrip = (id) => {
    const updatedTrips = trips.filter((trip) => trip.id !== id);
    setTrips(updatedTrips); // 상태 업데이트
    localStorage.setItem("trips", JSON.stringify(updatedTrips)); // 로컬 스토리지 업데이트
  };

  const tabData = [
    {
      id: 0,
      label: "내 여행",
      data: trips.map((trip) => ({
        ...trip,
        actions: (
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => handleDeleteTrip(trip.id)}
          >
            <DeleteIcon />
          </IconButton>
        ),
      })),
    },
    { id: 1, label: "작성한 글", data: trips.filter((trip) => trip.post === 1) },
    { id: 2, label: "좋아요 한 글", data: likedTrips }, // 좋아요한 글만 표시
  ];

  return (
    <StyledContainer>
      {isLoading && <LoadingAnimation />} {/* 로딩 애니메이션 표시 */}
      <Navbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {UserInfo.name}님의 여행 목록
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ marginBottom: 3 }}>
          여행 만들기
        </Button>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" sx={{ marginBottom: 3 }}>
          {tabData.map((tab) => (
            <Tab key={tab.id} label={tab.label} />
          ))}
        </Tabs>
        
        <TabContent data={tabData[tabValue].data} onCardClick={handleClick} />
      </Box>

      {/* 여행 추가 모달 */}
      <TripDialog
        open={open}
        onClose={handleClose}
        onAddTrip={handleAddTrip}
        newTrip={newTrip}
        setNewTrip={setNewTrip}
      />
    </StyledContainer>
  );
};

export default MyTripPage;
