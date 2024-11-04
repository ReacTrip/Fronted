import React, { useState } from "react";
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
  SvgIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '@/components/common/Navbar/Navbar';
import KoreaMap from '@/components/map/KoreaMap_copy';
import {previewData} from '@/data/tripData.js'
import EastIcon from '@mui/icons-material/East';
import TodayIcon from '@mui/icons-material/Today';
import HotelIcon from '@mui/icons-material/Hotel';
import AddIcon from '@mui/icons-material/Add';





//시작날짜와 끝 날짜로 날짜 배열 생성해주는 함수
const generateDateArray = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateArray = [];

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    const formattedDate = date.toLocaleDateString("ko-KR", {
      month: "long", // 월을 '10월' 형식으로
      day: "numeric", // 일을 숫자로
    });
    dateArray.push(formattedDate);
  }

  return dateArray;
};



const StyledContainer = styled(Container)({
  maxWidth: '1400px !important',
  padding: '0 20px',
});

// 이미지와 계획명 나타내는 컴포넌트
const ImageWithTextOverlay = () => {
  return (
    <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "400px",
          backgroundImage: `url(${previewData[0].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          color: "#fff",
          borderRadius: '10px',
          padding: "50px",
        }}
      >
        
        <Typography variant="h3" component="div">
          Overlay Text
        </Typography>
        <Typography variant="body1" component="div" sx={{ mt: 1 }}>
        <SvgIcon component={TodayIcon} sx={{verticalAlign: "middle"}}/> 9월17일 <SvgIcon component={EastIcon} sx={{verticalAlign: "middle"}}/> 9월 20일
        </Typography>
        </Box>
    
  );
};

//날짜 선택 컴포넌트
const DateSelector = ({dates = [], onDateClick = f=>f, selectedDate}) => {

  // const [startDate, endDate] = previewData[0].date.split(" - "); // 시작 날짜와 종료 날짜를 가져옴
  
  // // 날짜 배열 생성
  // const dates = generateDateArray(startDate, endDate);

  // const [selectedDate, setSelectedDate] = useState(dates[0]);

  // const handleDateClick = (dates) => {
  //   setSelectedDate(dates);
  // };

  return (
    <Box sx={{ margin: 3 }}>
      <Grid container spacing={2} justifyContent="start">
        {/* 날짜 버튼 */}
        {dates.map((date) => (
          <Grid item key={date}>
            <Button
              variant="contained"
              onClick={() => onDateClick(date)}
              sx={{
                bgcolor: selectedDate === date ? "primary.main" : "grey.400",
                color: "#fff",
                fontSize: "1.2rem", // 폰트 크기 조정
                padding: "1px 1px", // 패딩 조정
                minWidth: "120px", // 최소 너비 설정
                "&:hover": {
                  bgcolor: selectedDate === date ? "primary.dark" : "grey.500",
                },
              }}
            >
              {date}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* 선택된 날짜 데이터 표시 */}
      {/* {selectedDate && (
        <Box sx={{ marginTop: 3, textAlign: 'center' }}>
          <Typography variant="h6">
            {`Selected Date: ${selectedDate}`}
          </Typography>
        </Box>
      )} */}
    </Box>
  );
};

//여행 계획 하나 단위
const PlanDetail = () => {
  return(
    <Grid container spacing={2} alignItems="center" sx={{ mb: 2}}>
        <Grid item >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white', // 흰색 외곽선
                  position: 'relative'
                }}
              >
                <HotelIcon sx={{ color: 'white', fontSize: 20 }} /> {/* 아이콘 색상과 크기 */}
              </Box>
        </Grid>
        <Grid item xs>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 2, display: 'flex', alignItems: 'center'}}>
            <img
              src={previewData[0].image} // 여기에 실제 이미지 경로를 넣으세요.
              alt="송도수산물유통센터"
              style={{ width: '40%', borderRadius: '8px', marginRight: '16px' }}
            />
             <Box sx={{ display: 'flex', flexDirection: 'column' }}> {/* 수직 정렬을 위해 flexDirection을 column으로 설정 */}
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                신안군 송도수산물유통센터
              </Typography>
              <Typography variant="body2" color="text.secondary">
                버릇시장 & 재래시장 | 소요 시간: 1시간 미만
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}


//페이지 컴포넌트
const BudgetPage = () => {
  const [startDate, endDate] = previewData[0].date.split(" - "); // 시작 날짜와 종료 날짜를 가져옴
  
  // 날짜 배열 생성
  const dates = generateDateArray(startDate, endDate);

  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const handleDateClick = (dates) => {
    setSelectedDate(dates);
  };

  return (
    <StyledContainer>
      <Navbar/>
    <Grid container>
      {/* 왼쪽 영역 */}
      <Grid item xs={8} sx={{ padding: "0 16px 16px" }}>
        <ImageWithTextOverlay/>
        <Typography variant="h5" component="div" sx={{fontWeight : 'bold',  mt : 3}}>
          여행 일정
        </Typography>
        <Divider sx={{ margin: '20px 0' }} />
        <DateSelector dates={dates} onDateClick={handleDateClick} selectedDate={selectedDate}/>
        <Divider sx={{ margin: '20px 0' }} />
        <Box sx={{ marginTop: 3, display:'flex' , justifyContent:'flex-start' }}>
          <Typography variant="h5"  sx={{ fontWeight: 'bold', mb: 2 }}>
            {selectedDate}
          </Typography>
          <Typography variant="h5" sx={{textDecoration: 'underline', cursor: 'pointer', marginLeft: 2}}
      >
        장소 추가하기
      </Typography>
        </Box>
        {/* 여행 계획*/}
        <Box sx={{ padding: 3, maxWidth: 1400, margin: 'auto'}}>
         {/* Vertical Line Container */}
      <Box sx={{ position: 'relative' }}>
        {/* Vertical Line */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '14px', // 아이콘 중심에 맞추기 위한 위치 조정
            width: '2px',
            bgcolor: 'grey.300',
          }}
        />
      
      <PlanDetail />
      <PlanDetail />
      <PlanDetail />
      </Box>
      {/* Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button variant="outlined" startIcon={<AddIcon />}>
          추가
        </Button>
        </Box>
      </Box>
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
          <KoreaMap />
        </Box>
      </Grid>
    </Grid>
    </StyledContainer>
  );
};

export default BudgetPage;
