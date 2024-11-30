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

  const location = useLocation();
  const [detail, setDetail] = useState(location.state?.detail || {});// `detail`에 전달된 데이터가 없을 때를 대비한 안전 처리
  console.log(detail);
  const isAuthor = (detail.AuthorId === currentUser.id);  //작성자인지 확인

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
  }, [detail])

  //드래그 함수
  const drop = (selectedDate, dragIdx, dragOverIdx) => {
    // 현재 날짜의 계획을 가져옴
    const copyDailyItinerary = { ...detail.dailyItinerary };
    const copyListItems = [...copyDailyItinerary[selectedDate]];

    // 드래그한 항목을 이동
    const dragItemContent = copyListItems[dragIdx];
    copyListItems.splice(dragIdx, 1);
    copyListItems.splice(dragOverIdx, 0, dragItemContent);

    // 업데이트된 날짜의 계획을 다시 할당
    copyDailyItinerary[selectedDate] = copyListItems;

    // 상태 업데이트
    setDetail((prevDetail) => ({
      ...prevDetail,
      dailyItinerary: copyDailyItinerary,
    }));


    console.log("드랍 완료");
  };

  const deleteDetail = (deleteDate, deleteIdx) => {
    const newDetail = {
      ...detail, // data는 원본 객체
      dailyItinerary: {
        ...detail.dailyItinerary, // dailyItinerary 복사
        [deleteDate]: detail.dailyItinerary[deleteDate].filter(
          (item, idx) => idx !== deleteIdx
        )
      }
    };
    setDetail(newDetail);
  }

  const changeMap = (resultData) => {
    setRouteData(resultData);
  }

  //이미지 추가, 삭제
  const changeImages = (date, idx, newImages) => {
    const newDetail = { ...detail };
    console.log('dddddddd', newDetail);
    console.log(date, ":", idx, ":", newImages);
    newDetail.dailyItinerary[date][idx].images = newImages;
    setDetail(newDetail);
  }

  const addPlace = (date, place, notes, time) => {
    const newDetail = { ...detail };
    newDetail.dailyItinerary[date] = [...newDetail.dailyItinerary[date], {
      name: place.name,
      city: "",
      time: time,
      notes: notes,
      placeImage: place.image,
      images: [],
      x: place.x,
      y: place.y,
      category: place.category
    }];
    setDetail(newDetail);
  }

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

  // 날짜 배열 생성
  const dates = generateDateArray(detail.startDate, detail.endDate);

  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const handleDateClick = (dates) => {
    setSelectedDate(dates);
  };

  const copyTrip = () => {
    if(confirm("여행 계획을 내 여행에 생성하시겠습니까?")){
      const storedTrips = JSON.parse(localStorage.getItem("trips"));
      let newDetail = {...detail};
      // 이미지 배열을 빈 배열로 변경
      for (const date in newDetail.dailyItinerary) {
        newDetail.dailyItinerary[date].forEach(location => {
          location.images = [];
        });
      }
      newDetail = {...newDetail, title: `[가져온 여행] ${newDetail.title}`, id: (storedTrips.length+1), AuthorId: UserInfo.id, like: 0, post:  0 };
      const updatedTrips = [ ...storedTrips, newDetail];
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
      if(confirm("가져오기 완료! \n내 여행에서 확인하시겠습니까?"))
        navigate('/my-trip');
    }
  }

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
              <p>Loading route data...</p>
            )}
          </Box>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default BudgetPage;
