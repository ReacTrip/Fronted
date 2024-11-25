import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
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
  id: "das",
  name: '스키매니아',
};

const MyTripPage = () => {
  const [trips, setTrips] = useState([]); // 사용자의 여행 데이터
  const [likedTrips, setLikedTrips] = useState([]); // 좋아요된 여행 데이터
  const [tabValue, setTabValue] = useState(0); // 현재 탭 상태
  const [open, setOpen] = useState(false); // 모달 상태
  const [newTrip, setNewTrip] = useState({ name: "", date: "", image: null }); // 새 여행 데이터
  const navigate = useNavigate(); //상세페이지 가기위함

  // 로컬 스토리지에서 여행 데이터 및 좋아요 상태 가져오기
  useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem("trips")) || defaultTrips;
    const userTrips = storedTrips.filter((trip) => trip.AuthorId === currentUser.id);
    setTrips(userTrips);
    const likedTrips = storedTrips.filter((trip) => trip.like === 1);
    setLikedTrips(likedTrips);
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
    const { actions, ...data } = item;

    navigate('/budget', { state: { detail: data } });
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
        
        <TabContent data={tabData[tabValue].data} onCardClick={handleClick} />
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
