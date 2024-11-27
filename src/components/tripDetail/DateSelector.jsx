import React, { useState, useRef, useEffect } from "react";
import { styled } from '@mui/material/styles';


import {
  Box,
  Grid,
  Button
} from '@mui/material';


//날짜 선택 버튼 
const DateButton = styled(Button)({
  color: "#fff",
  fontSize: "1.2rem", // 폰트 크기 조정
  padding: "1px 1px", // 패딩 조정
  minWidth: "120px", // 최소 너비 설정

});

//날짜 선택 컴포넌트
const DateSelector = ({ dates = [], onDateClick = f => f, selectedDate }) => {

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
          {dates.map((date, idx) => (
            <Grid item key={idx}>
              <DateButton
                variant="contained"
                onClick={() => onDateClick(date)}
                sx={{
                  bgcolor: selectedDate === date ? "primary.main" : "grey.400",
                  "&:hover": {
                    bgcolor: selectedDate === date ? "primary.dark" : "grey.500",
                  }
                }}
              >
                {new Date(date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
              </DateButton>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  export default DateSelector;