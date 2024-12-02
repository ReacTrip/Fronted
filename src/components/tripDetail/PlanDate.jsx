import React, { useState, useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  Grid,
  Button,
  Divider,
  SvgIcon,
  IconButton,
  Badge,
  Modal,
  Backdrop,
  Fade,
  Card,
  CardMedia,
  CardContent,
  TextField,
  CircularProgress,
  InputAdornment,
  Select,
  MenuItem,
  Tabs,
  Tab
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '@/components/common/Navbar/Navbar';
import KakaoRouteMap from '@/components/map/KakaoRouteMap';
import EastIcon from '@mui/icons-material/East';
import TodayIcon from '@mui/icons-material/Today';
import HotelIcon from '@mui/icons-material/Hotel';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Carousel from 'react-material-ui-carousel';
import PlaceIcon from '@mui/icons-material/Place';
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FestivalIcon from '@mui/icons-material/Festival';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SearchIcon from "@mui/icons-material/Search";
import { storage } from "@/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { placeData } from "../../data/placeData.js"
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import PlanDetail from "./PlanDetail";
import { useModalManager, usePlaceManager, useDragAndDrop, useTravelCalculator } from "../../hooks/usePlanDate.js"

//왼쪽 외곽선 box
const LineBox = styled(Box)({
  width: 36,
  height: 36,
  borderRadius: '50%',
  backgroundColor: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid white', // 흰색 외곽선
  position: 'relative'
})


const TimeTypography = styled(Typography)(({ theme }) => ({
  marginLeft: '8px', // 아이콘과 텍스트 사이의 간격
  fontWeight: 'bold', // 글씨 굵게
  color: 'black', // 글씨 색상 (필요하면 변경 가능)
}));

// 추가 아이콘 버튼 공통 스타일 정의
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  border: "1px solid",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
}));


const Header = styled(Typography)({
  fontWeight: "bold",
  marginBottom: 8,
});

const VerticalLine = styled(Box)({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: "14px",
  width: "2px",
  backgroundColor: "#ddd",
});

const AddButtonGroup = styled(Box)({
  display: "flex",
  gap: 10,
});


const ModalContainer = styled(Box)({
  position: "fixed",
  top: 0,
  right: 0,
  height: "100%",
  width: "33%",
  backgroundColor: "#fff",
  boxShadow: 24,
  padding: 24,
  display: "flex",
  flexDirection: "column",
});

const StyledCard = styled(Card)({
  display: "flex",
  alignItems: "center",
  boxShadow: "none",
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 10,
  marginBottom: 20,
  cursor: "pointer",
  "&:hover": { backgroundColor: "#f5f5f5" },
});


//선택된 날짜의 데이터를 나타내주는 컴포넌트
const PlanDate = ({ datePlan, date, onDrop, onDelete, onChangeMap, onChangeImages, onAddPlace, isAuthor }) => {

  //시간 포맷 반환 함수.
  function formatTime(seconds) {
    if (seconds < 60) {
      return `${seconds}초`; // 1분 미만은 초로 표시
    }

    const minutes = Math.floor(seconds / 60); // 전체 분
    const hours = Math.floor(minutes / 60); // 전체 시간
    const remainingMinutes = minutes % 60; // 시간 제외 나머지 분

    if (hours > 0) {
      // 시간 단위로 넘어가면 "시간과 분"을 함께 표시
      return `${hours}시간 ${remainingMinutes}분`;
    }

    return `${minutes}분`; // 1시간 미만은 분만 표시
  }

  //이동거리 포맷 반환 함수
  function formatDistance(meters) {
    if (meters < 1000) {
      return `${meters}m`; // 1000m 미만은 미터로 표시
    }

    const kilometers = (meters / 1000).toFixed(1); // km로 변환 (소수점 1자리까지 표시)
    return `${kilometers}km`; // 1000m 이상은 km로 표시
  }


  const [time, setTime] = useState(dayjs()); //장소 추가시 시간
  const [isAddButton, setIsAddButton] = useState(true);  //추가버튼 토글

  const region = ["서울", "제주", "광주", "포천", "울산", "대구", "부산", "인천", "대전"];  //지역

  const {
    isModalOpen,
    currentView,
    selectedPlace,
    note,
    openModal,
    closeModal,
    selectPlace,
    backToList,
    setNote,
  } = useModalManager();

  const {
    filteredPlaceDatas,
    searchValue,
    selectedRegion,
    handleSearchChange,
    handleRegionChange,
    handleCategoryChange,
    tabIndex,
    handleTabChange,
    getDisplayedPlaces
  } = usePlaceManager();

  const { dragStart, dragEnter, drop } = useDragAndDrop(onDrop, date);

  const { result, calculateTravelTime } = useTravelCalculator(onChangeMap);

  const handleClick = () => {
    setIsAddButton(!isAddButton);
  };

  const openModalWithCategory = (category) => {  //모달 열기
    openModal();
    handleCategoryChange(category);
  };

  const closeModalClearValue = () => {  //모달 닫기
    closeModal();
    handleSearchChange("");
  };

  //장소 추가 저장버튼
  const saveClick = () => {
    onAddPlace(selectedPlace, note, time.format("HH:mm"));
    closeModalClearValue();
  }

  useEffect(() => {
    calculateTravelTime(datePlan);
  }, [datePlan]);




  // 지역 선택 핸들러
  const handleRegionChangeEvent = (event) => {
    const region = event.target.value;
    handleRegionChange(region);
  };

  const displayedPlaces = getDisplayedPlaces();  //좋아요 or 일반 장소데이터 반환
  
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Header variant="h5" >
          {new Date(date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
        </Header >

      </Box>
      {/* 여행 계획이 있으면 계획을 표시하고, 없으면 안내 문구 표시 */}
      {(!datePlan || datePlan.length === 0) ? (
        <>
          <Typography sx={{ textAlign: 'center', color: 'grey.500', mt: 5 }}>
            계획을 추가해보세요
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
            {isAuthor && (isAddButton ? (<Button variant="outlined" startIcon={<AddIcon />} onClick={handleClick}>
              추가
            </Button>) : (
              <AddButtonGroup>
                <StyledIconButton onClick={() => openModalWithCategory("touristAttraction")}><PlaceIcon /></StyledIconButton>
                <StyledIconButton onClick={() => openModalWithCategory("restaurant")}><RestaurantIcon /></StyledIconButton>
                <StyledIconButton onClick={() => openModalWithCategory("festival")}><FestivalIcon /></StyledIconButton>
                <StyledIconButton onClick={handleClick}><CloseIcon /></StyledIconButton>
              </AddButtonGroup>))}
          </Box>
        </>
      ) : (
        <Box sx={{ padding: 3, maxWidth: 1400, margin: 'auto' }}>
          {/* Vertical Line Container */}
          <Box sx={{ position: 'relative' }}>
            {/* Vertical Line */}
            <VerticalLine />
            {datePlan.map((plan, idx) => <div key={idx}>
              <PlanDetail {...plan} onDragStart={() => dragStart(idx)} onDragEnter={() => dragEnter(idx)} onDragOver={e => e.preventDefault()} onDragEnd={drop} onDelete={() => onDelete(idx)} onChangeImages={(newImages) => onChangeImages(idx, newImages)} isAuthor={isAuthor} />
              {idx < datePlan.length - 1 && result?.durations[idx] !== undefined && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center", // 세로 가운데 정렬
                    color: "grey.500", // 텍스트와 아이콘 색상
                    mt: 1,
                    mb: 1,
                  }}
                >
                  <LineBox>
                    {/* 자동차 아이콘 */}
                    <DirectionsCarIcon sx={{ color: "white", fontSize: 24 }} /> {/* 텍스트와 간격 조정 */}
                  </LineBox>
                  {/* 이동 시간과 거리 텍스트 */}
                  <TimeTypography variant="h6">
                    이동 시간: {formatTime(result.durations[idx].duration)}, 이동 거리: {formatDistance(result.durations[idx].distance)}
                  </TimeTypography>
                </Box>
              )}
            </div>)}
          </Box>

          {/* Add Button */}
          {isAuthor && (isAddButton ? (<Button variant="outlined" startIcon={<AddIcon />} onClick={handleClick}>
            추가
          </Button>) : (
            <Box display="flex" gap="10px">
              <StyledIconButton onClick={() => openModalWithCategory("touristAttraction")}><PlaceIcon /></StyledIconButton>
              <StyledIconButton onClick={() => openModalWithCategory("restaurant")}><RestaurantIcon /></StyledIconButton>
              <StyledIconButton onClick={() => openModalWithCategory("festival")}><FestivalIcon /></StyledIconButton>
              <StyledIconButton onClick={handleClick}><CloseIcon /></StyledIconButton>
            </Box>))}
          {result?.allDistance !== undefined && result?.allDuration !== undefined && datePlan.length >= 2 && (
            <TimeTypography variant="h6">
              총 이동 시간: {formatTime(result.allDuration)}, 총 이동 거리: {formatDistance(result.allDistance)}
            </TimeTypography>)}
        </Box>
      ) }

      <Modal open={isModalOpen} onClose={closeModalClearValue}>
        <ModalContainer >
          {/* 메모 작성 화면 */}
          {currentView === "note" && selectedPlace && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <IconButton onClick={backToList}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" component="h2" sx={{ marginLeft: "10px" }}>
                  장소 추가하기
                </Typography>
              </Box>
              <StyledCard
                sx={{
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "none",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "20px",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                  image={selectedPlace.image}
                  alt={selectedPlace.name}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {selectedPlace.name}
                  </Typography>
                </CardContent>
              </StyledCard>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>메모</Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                placeholder="메모를 작성하세요."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                sx={{ marginBottom: "20px", marginTop: "10px" }}
              />
              {/* 시간 입력 필드 */}
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>시간</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']} sx={{ mb: 3 }}>
                  <TimePicker value={time}
                    onChange={(newValue) => setTime(newValue)} />
                </DemoContainer>
              </LocalizationProvider>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={saveClick}
              >
                저장
              </Button>
            </>
          )}

          {/* 리스트 화면 */}
          {currentView === "list" && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Typography variant="h6" component="h2">
                  장소 추가하기
                </Typography>
                <IconButton onClick={closeModalClearValue}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                sx={{ marginBottom: "20px", borderBottom: "1px solid #ddd" }}
              >
                <Tab label="전체 장소" />
                <Tab label="좋아요 누른 장소" />
              </Tabs>

              <Select
                value={selectedRegion}
                onChange={handleRegionChangeEvent}
                displayEmpty
                sx={{ marginBottom: "20px", width: "100%" }}
              >
                <MenuItem value="">전체 지역</MenuItem>
                {region.map((item, idx) => (<MenuItem key={idx} value={item}>{item}</MenuItem>))}
              </Select>


              <TextField
                value={searchValue}
                variant="outlined"
                placeholder="검색"
                onChange={e => handleSearchChange(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: searchValue && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleSearchChange("")}>
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  marginBottom: "20px",
                  borderRadius: "30px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                  },
                  width: "100%", // 가로 길이 설정
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  overflowY: "auto",
                }}
              >
                {displayedPlaces.length === 0 ? (<Typography>죄송합니다. "{searchValue}"을(를) 찾을 수 없습니다.</Typography>)
                  : (displayedPlaces.map((place, idx) => (
                    <Card
                      key={idx}
                      onClick={() => selectPlace(place)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        boxShadow: "none",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "10px",
                        flexShrink: 0,
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: "130px",
                          height: "130px",
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                        image={place.image}
                        alt={place.name}
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "16px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {place.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  )))}
              </Box>
            </>
          )}
        </ModalContainer>
      </Modal>

    </>
  );
}
export default PlanDate;