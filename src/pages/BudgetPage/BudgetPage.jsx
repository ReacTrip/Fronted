import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '@/components/common/Navbar/Navbar';
import KakaoRouteMap from '@/components/map/KakaoRouteMap';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DateSelector from "../../components/tripDetail/DateSelector.jsx";
import ImageWithTextOverlay from "../../components/tripDetail/ImageWithTextOverlay.jsx";
import PlanDate from "../../components/tripDetail/PlanDate.jsx";
import UserInfo from "@/components/common/UserInfo"; // 사용자 정보
import {useTripDetail} from "../../hooks/usePlanPage.js"
import LoadingAnimation from '@/components/common/Animation/LoadingAnimation'; // Lottie 로딩 컴포넌트 가져오기


const StyledContainer = styled(Container)({
  maxWidth: '1200px !important',
  padding: '0 20px',
});



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
    postTrip,
    addDate,
    deleteDate,
    dates,
    selectedDate,
    handleDateClick,
    changeTitle
} = useTripDetail(location.state?.detail || {});

  const navigate = useNavigate();

  const [routeData, setRouteData] = useState({ routes: [], });  //이동경로api로 받아온 데이터.

  const isAuthor = (detail.AuthorId === UserInfo.id);  //작성자인지 확인

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  useEffect(() => {
    //detail이 변경될때 마다 자동 저장. 로컬스토리지에 자동으로 올리기 위함.
    //console.log("지금 저장");
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
    console.log(routeData);
  }



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
        totalLike: 0,
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
    const totalLike = like === 1 ? (detail.totalLike + 1) : (detail.totalLike - 1)
    const newDetail = {...detail, like, totalLike};
    setDetail(newDetail);
  }

  const changeImage = async (imageUrl, isLoading) => {
    setIsLoading(isLoading);
    
    if (imageUrl) {
      setDetail((prevDetail) => ({
        ...prevDetail,
        mainImage: imageUrl,
      }));
    }
  };
  

  return (
    <StyledContainer>
      {isLoading && <LoadingAnimation />} {/* 로딩 애니메이션 표시 */}
      <Navbar />
      <Grid container>
        {/* 왼쪽 영역 */}
        <Grid item xs={8} sx={{ padding: "0 16px 16px" }}>
        <ImageWithTextOverlay 
          startDate={detail.startDate} 
          endDate={detail.endDate} 
          mainImage={detail.mainImage} 
          title={detail.title} 
          isLike={detail.like} 
          onChangeLike={changeLike} 
          onChangeTitle={changeTitle} 
          onChangeImage={changeImage} // Pass the changeImage method
          isAuthor={isAuthor}
        />
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
          <DateSelector dates={dates} onDateClick={handleDateClick} selectedDate={selectedDate} onaddDate={addDate} isAuthor={isAuthor} onDeleteDate={deleteDate}/>
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
            {(routeData.routes.length > 0 && (detail.dailyItinerary[selectedDate] || []).length > 1) ? (
              <KakaoRouteMap routeData={routeData} placeNames={detail.dailyItinerary[selectedDate].map(item => item.name)}/>
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