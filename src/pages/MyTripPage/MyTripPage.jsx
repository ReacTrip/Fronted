import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "@/components/common/Navbar/Navbar";
import TabContent from "@/components/common/TabContent/TabContent";
import { storage } from "@/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import DeleteIcon from "@mui/icons-material/Delete";

// 스타일 적용
const StyledContainer = styled(Container)({
  maxWidth: '1200px !important',
  padding: '0 20px',
});

// 임시 사용자 정보
const currentUser = {
  id: 1,
  name: '스키매니아',
};

// 여행 데이터
const defaultTrips = [
  { id: 1, name: '파리 여행', userId: 1, image: trip1, date: '2024.12.20 - 2024.12.22' },
  { id: 2, name: '뉴욕 탐험', userId: 1, image: trip2, date: '2024.12.20 - 2024.12.22' },
  // { id: 3, name: '도쿄 투어', userId: 1, image: trip3, date: '2024.12.20 - 2024.12.22' },
  // { id: 4, name: '서울 관광', userId: 1, image: trip4, date: '2024.12.20 - 2024.12.22' },
  // { id: 5, name: '런던 여행', userId: 1, image: trip5, date: '2024.12.20 - 2024.12.22' },
  // { id: 6, name: '보이지 않는 여행', userId: 2, image: trip6, date: '2024.12.20 - 2024.12.22' },
];

// 이미지 import
import trip1 from '@/assets/images/main/trip1.png';
import trip2 from '@/assets/images/main/trip2.png';
import trip3 from '@/assets/images/main/trip3.png';
import trip4 from '@/assets/images/main/trip4.png';
import trip5 from '@/assets/images/main/trip5.png';
import trip6 from '@/assets/images/main/trip6.png';

const MyTripPage = () => {
  const [trips, setTrips] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false); // 모달 상태
  const [newTrip, setNewTrip] = useState({ name: "", date: "", image: null }); // 새 여행 데이터

  // 로컬 스토리지에서 데이터 가져오기
  useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem("trips")) || defaultTrips;
    const userTrips = storedTrips.filter((trip) => trip.userId === currentUser.id);
    setTrips(userTrips);
  }, []);

  // 탭 변경
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // 모달 열기/닫기
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 입력값 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTrip({ ...newTrip, [name]: value });
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef); // 업로드된 이미지 URL 반환
  };

  // 상세 페이지로 이동
  const handleClick = (item) => {
    navigate('/budget', { state: { detail: item } });
  };

  // 여행 추가
  const handleAddTrip = async () => {
    if (!newTrip.name || !newTrip.date) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    try {
      let imageUrl = "";
      if (newTrip.image) {
        imageUrl = await handleImageUpload(newTrip.image); // 이미지 업로드
      }

      const updatedTrip = {
        id: Date.now(),
        name: newTrip.name,
        date: newTrip.date,
        image: imageUrl || "default.png", // 이미지가 없으면 기본값 사용
        userId: currentUser.id,
      };

      const updatedTrips = [...trips, updatedTrip];
      setTrips(updatedTrips); // 상태 업데이트
      localStorage.setItem("trips", JSON.stringify(updatedTrips)); // 로컬 스토리지 저장
      handleClose(); // 모달 닫기
      setNewTrip({ name: "", date: "", image: null }); // 입력값 초기화
    } catch (error) {
      console.error("여행 추가 중 오류:", error);
    }
  };

  // 여행 삭제
  const handleDeleteTrip = (id) => {
    // 해당 id를 제외한 나머지 여행 데이터로 필터링
    const updatedTrips = trips.filter((trip) => trip.id !== id);
    setTrips(updatedTrips); // 상태 업데이트
    localStorage.setItem("trips", JSON.stringify(updatedTrips)); // 로컬 스토리지 업데이트
  };

  const handleImageUploaded = (url) => {
    const newTrip = {
      id: Date.now(),
      name: "새로운 여행",
      userId: currentUser.id,
      image: url,
      date: "2025.01.01 - 2025.01.03",
    };

    const updatedTrips = [...trips, newTrip];
    setTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify([...trips, newTrip])); // 로컬 스토리지에 저장
  };

  // 로컬 저장된 데이터를 가져오는 함수
  const loadTripsFromLocalStorage = () => {
    const storedTrips = localStorage.getItem('trips');
    if (storedTrips) {
      return JSON.parse(storedTrips);
    }
    return defaultTrips; // 초기 기본 데이터
  };

  // 여행 데이터를 로컬에 저장
  const saveTripsToLocalStorage = (trips) => {
    localStorage.setItem('trips', JSON.stringify(trips));
  };

  // // 여행 정보 가져오기
  // useEffect(() => {
  //   // 현재 사용자의 여행만 가져오기
  //   const userTrips = loadTripsFromLocalStorage().filter((trip) => trip.userId === currentUser.id);
  //   setTrips(userTrips);
  // }, []);

  // 탭 목록
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
            onClick={() => handleDeleteTrip(trip.id)} // 삭제 핸들러 호출
          >
            <DeleteIcon />
          </IconButton>
        ),
      })),
    },
    { id: 1, label: "작성한 글", data: [] },
    { id: 2, label: "좋아요 한 글", data: [] },
  ];

  return (
    <StyledContainer>
      <Navbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {currentUser.name}님의 목록
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ marginBottom: 3 }}>
          여행 만들기
        </Button>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" sx={{ marginBottom: 3 }}>
          {tabData.map((tab) => (
            <Tab key={tab.id} label={tab.label} />
          ))}
        </Tabs>
        
        <TabContent data={tabData[tabValue].data} onCardClick={(item) => console.log(item)} />
      </Box>

      {/* 여행 추가 모달 */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>여행 추가</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="여행 이름"
            type="text"
            fullWidth
            variant="standard"
            value={newTrip.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="date"
            label="여행 날짜"
            type="text"
            fullWidth
            variant="standard"
            value={newTrip.date}
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2 }}
          >
            대표 이미지 업로드
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setNewTrip({ ...newTrip, image: e.target.files[0] })}
            />
          </Button>
          {newTrip.image && <Typography sx={{ mt: 1 }}>{newTrip.image.name}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            취소
          </Button>
          <Button onClick={handleAddTrip} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default MyTripPage;

// 상세 페이지로 넘어가지 않음 - 임시데이터로 넘겼었어서.