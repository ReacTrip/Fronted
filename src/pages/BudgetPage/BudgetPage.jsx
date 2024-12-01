import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
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
import DateSelector from "../../components/tripDetail/DateSelector.jsx";
import ImageWithTextOverlay from "../../components/tripDetail/ImageWithTextOverlay.jsx";
import PlanDate from "../../components/tripDetail/PlanDate.jsx";
import UserInfo from "@/components/common/UserInfo"; // 사용자 정보
import {useTripDetail} from "../../hooks/usePlanPage.js"


const StyledContainer = styled(Container)({
  maxWidth: '1400px !important',
  padding: '0 20px',
});


// 임시 사용자 정보
const currentUser = {
  id: "@TripLover",
  name: '여행매니아',
};


//페이지 컴포넌트
const BudgetPage = () => {

  const location = useLocation();

  const {
    detail,
    setDetail,
    drop,
    deleteDetail,
    changeImages,
    addPlace,
    postTrip
} = useTripDetail(location.state?.detail || {});

  const navigate = useNavigate();

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

  const [routeData, setRouteData] = useState({ routes: [], });  //이동경로api로 받아온 데이터.

  const isAuthor = (detail.AuthorId === UserInfo.id);  //작성자인지 확인

  useEffect(() => {
    //detail이 변경될때 마다 자동 저장. 로컬스토리지에 자동으로 올리기 위함.
    console.log("지금 저장");
    const storedTrips = JSON.parse(localStorage.getItem("trips"));
    const updatedTrips = storedTrips.map(item =>
      item.id === detail.id
        ? { ...item, ...detail } // 일치하면 업데이트
        : item                      // 일치하지 않으면 그대로 유지
    );
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
  }, [detail]);

  const changeMap = (resultData) => {
    setRouteData(resultData);
  }


  // 날짜 배열 생성
  const dates = generateDateArray(detail.startDate, detail.endDate);

  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const handleDateClick = (dates) => {
    setSelectedDate(dates);
  };

  const copyTrip = () => {
    if (confirm("여행 계획을 내 여행에 생성하시겠습니까?")) {
      const storedTrips = JSON.parse(localStorage.getItem("trips"));
      let newDetail = { ...detail };
  
      // 현재 날짜를 startDate로 설정
      const startDate = new Date();
      const dailyItineraryKeys = Object.keys(newDetail.dailyItinerary);
  
      // endDate 계산: startDate + dailyItinerary의 객체 개수
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + dailyItineraryKeys.length - 1);
  
      // dailyItinerary 재구성: startDate와 endDate 사이의 일자만큼 생성
      const newDailyItinerary = {};
      for (let i = 0; i < dailyItineraryKeys.length; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD 형식
        newDailyItinerary[formattedDate] = newDetail.dailyItinerary[dailyItineraryKeys[i]];
      }
  
      newDetail = {
        ...newDetail,
        title: `[가져온 여행] ${newDetail.title}`,
        id: storedTrips.length + 1,
        AuthorId: UserInfo.id,
        like: 0,
        post: 0,
        startDate: startDate.toISOString().split("T")[0], // YYYY-MM-DD 형식
        endDate: endDate.toISOString().split("T")[0], // YYYY-MM-DD 형식
        dailyItinerary: newDailyItinerary, // 업데이트된 일정
      };
  
      const updatedTrips = [...storedTrips, newDetail];
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
      if (confirm("가져오기 완료! \n내 여행에서 확인하시겠습니까?"))
        navigate('/my-trip');
    }
  };

  const changeLike = (like) => {
    const newDetail = {...detail, like};
    setDetail(newDetail);
  }

  return (
    <StyledContainer>
      <Navbar />
      <Grid container>
        {/* 왼쪽 영역 */}
        <Grid item xs={8} sx={{ padding: "0 16px 16px" }}>
          <ImageWithTextOverlay startDate={detail.startDate} endDate={detail.endDate} mainImage={detail.mainImage} title={detail.title} isLike={detail.like} onChangeLike={changeLike} />
          <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
              여행 일정
            </Typography>
            {!isAuthor ? (<Button variant="contained" onClick={copyTrip} startIcon={<AddIcon />} sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}>
              가져오기
            </Button>) : (!detail.post ? <Button variant="contained" onClick={postTrip} startIcon={<AddIcon />} sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }}>
              게시물 올리기
            </Button> : <Button variant="contained" onClick={postTrip} startIcon={<DeleteIcon />} sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}>
              게시물 삭제
            </Button>)}
          </Box>
          <Divider sx={{ margin: '20px 0' }} />
          <DateSelector dates={dates} onDateClick={handleDateClick} selectedDate={selectedDate} />
          <Divider sx={{ margin: '20px 0' }} />
          <PlanDate datePlan={detail.dailyItinerary[selectedDate]} date={selectedDate} onDrop={drop} onDelete={(idx) => deleteDetail(selectedDate, idx)} onChangeMap={changeMap} onChangeImages={(idx, newImages) => changeImages(selectedDate, idx, newImages)}
            onAddPlace={(place, notes, time) => addPlace(selectedDate, place, notes, time)} isAuthor={isAuthor} />
        </Grid>

        {/* 오른쪽 영역 */}
        <Grid item xs={4} sx={{  //스크롤 내릴때 같이 내려가게함
          padding: "0 16px 16px",
          position: "sticky",
          top: 0, // 상단에 고정될 위치
          height: "100vh",
        }}>
          <Box
            sx={{
              width: "100%",
              height: "650px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            {routeData.routes.length > 0 ? (
              <KakaoRouteMap routeData={routeData} />
            ) : (
              <p>장소를 2개 이상 추가해보세요.</p>
            )}
          </Box>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default BudgetPage;
