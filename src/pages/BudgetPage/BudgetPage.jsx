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
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '@/components/common/Navbar/Navbar';
import KoreaMap from '@/components/map/KoreaMap_copy';
import {previewData} from '@/data/tripData.js'


import trip1 from '@/assets/images/main/trip1.png'; 

//시작날짜와 끝 날짜로 날짜 배열 생성해주는 함수
const generateDateArray = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateArray = [];

  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    const formattedDate = date.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식으로 변환
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
          9월17일 -{'>'} 9월 20일
        </Typography>
        </Box>
    
  );
};

//날짜 선택 컴포넌트
const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const [startDate, endDate] = previewData[0].date.split(" - "); // 시작 날짜와 종료 날짜를 가져옴
  
  // 날짜 배열 생성
  const dates = generateDateArray(startDate, endDate);


  const handleDateClick = (dates) => {
    setSelectedDate(dates);
  };

  return (
    <Box sx={{ margin: 3 }}>
      <Grid container spacing={5} justifyContent="center">
        {/* 날짜 버튼 */}
        {dates.map((date) => (
          <Grid item key={date}>
            <Button
              variant="contained"
              onClick={() => handleDateClick(date)}
              sx={{
                bgcolor: selectedDate === date ? "primary.main" : "grey.400",
                color: "#fff",
                fontSize: "1.5rem", // 폰트 크기 조정
                padding: "10px 20px", // 패딩 조정
                minWidth: "150px", // 최소 너비 설정
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
      {selectedDate && (
        <Box sx={{ marginTop: 3, textAlign: 'center' }}>
          <Typography variant="h6">
            {`Selected Date: ${selectedDate}`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};



//페이지 컴포넌트
const BudgetPage = () => {
  return (
    <StyledContainer>
      <Navbar/>
    <Grid container>
      {/* 왼쪽 영역 */}
      <Grid item xs={8} sx={{ padding: "0 16px 16px" }}>
        <ImageWithTextOverlay/>
        <Typography variant="h5" component="div" sx={{mt : 4}}>
          여행 일정
        </Typography>
        <Divider sx={{ margin: '20px 0' }} />
        <DateSelector />
        <DateSelector />
        <DateSelector />
        <DateSelector />
        <DateSelector />
        <DateSelector />
        <DateSelector />
      </Grid>

      {/* 오른쪽 영역 */}
      <Grid item xs={4} sx={{
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
