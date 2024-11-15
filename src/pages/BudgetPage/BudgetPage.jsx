import React, { useState, useRef } from "react";
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
  SvgIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '@/components/common/Navbar/Navbar';
import KoreaMap from '@/components/map/KoreaMap_copy';
import { previewData } from '@/data/tripData.js'
import EastIcon from '@mui/icons-material/East';
import TodayIcon from '@mui/icons-material/Today';
import HotelIcon from '@mui/icons-material/Hotel';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


// 삭제 버튼 스타일 정의
const DeleteButton = styled(Button)({
  position: 'absolute',
  top: 30,
  right: 16,
  color: 'red',
  borderColor: 'red',
  backgroundColor: 'white',
  borderRadius: '16px',
  padding: '2px 8px',
  fontSize: '0.75rem',
  minWidth: 'auto',
  height: '24px',
  '&:hover': {
    backgroundColor: 'red',
    color: 'white',
    borderColor: 'red',
  },
});

//날짜 선택 버튼 
const DateButton = styled(Button)({
  color: "#fff",
  fontSize: "1.2rem", // 폰트 크기 조정
  padding: "1px 1px", // 패딩 조정
  minWidth: "120px", // 최소 너비 설정

});

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

const TitleBox = styled(Box)({
  position: "relative",
  width: "100%",
  height: "400px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  color: "#fff",
  borderRadius: '10px',
  padding: "50px",
})



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



const StyledContainer = styled(Container)({
  maxWidth: '1400px !important',
  padding: '0 20px',
});

// 이미지와 계획명 나타내는 컴포넌트
const ImageWithTextOverlay = ({ startDate, endDate, mainImage, title }) => {

  const startDateKr = new Date(startDate).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  const endDateKr = new Date(endDate).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });

  return (
    <TitleBox
      sx={{ backgroundImage: `url(${mainImage})`, }}
    >

      <Typography variant="h3" component="div">
        {title}
      </Typography>
      <Typography variant="body1" component="div" sx={{ mt: 1 }}>
        <SvgIcon component={TodayIcon} sx={{ verticalAlign: "middle" }} /> {startDateKr} <SvgIcon component={EastIcon} sx={{ verticalAlign: "middle" }} /> {endDateKr}
      </Typography>
    </TitleBox>

  );
};

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
        {dates.map((date) => (
          <Grid item key={date}>
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

//여행 계획 하나 단위
const PlanDetail = (props) => {
  return (
    <div  //드래그가 가능하기위해 div로 감싸줌
      onDragStart={props.onDragStart}
      onDragEnter={props.onDragEnter}
      onDragOver={props.onDragOver}
      onDragEnd={props.onDragEnd}
      draggable="true" // 이 속성이 있어야 컴포넌트가 드래그 가능해집니다.
      style={{ position: 'relative' }}
    >
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item >
          <LineBox>
            <HotelIcon sx={{ color: 'white', fontSize: 20 }} /> {/* 아이콘 색상과 크기 */}
          </LineBox>
        </Grid>
        <Grid item xs>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 2, display: 'flex', alignItems: 'center' }}>
            <img
              src={props.placeImage} // 여기에 실제 이미지 경로를 넣으세요.
              alt="송도수산물유통센터"
              style={{ width: '40%', borderRadius: '8px', marginRight: '16px' }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}> {/* 수직 정렬을 위해 flexDirection을 column으로 설정 */}
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {props.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                버릇시장 & 재래시장 | 소요 시간: 1시간 미만
              </Typography>
            </Box>
          </Box>
        </Grid>
        {/* 삭제 버튼 */}
        <DeleteButton
          onClick={props.onDelete}
          variant="outlined"
        >
          삭제
        </DeleteButton>
      </Grid>
    </div>
  );
}

//선택된 날짜의 데이터를 나타내주는 컴포넌트
const PlanDate = ({ datePlan, date, onDrop }) => {
  console.log(datePlan);

  const dragItem = useRef();
  const dragOverItem = useRef();

  const [list, setList] = useState(datePlan);

  const dragStart = idx => {
    dragItem.current = idx;
  };

  const dragEnter = idx => {
    dragOverItem.current = idx;
  };

  const drop = () => {
    onDrop(date, dragItem.current, dragOverItem.current);
    // 드래그 참조 초기화
    dragItem.current = null;
    dragOverItem.current = null;
  }

  return (
    <>
      <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0 }}>
            {new Date(date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
          </Typography>
          <Typography variant="h5" sx={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: 2 }}>
            장소 추가하기
          </Typography>
        </Box>
        {/* 작성자이면 보이게 설정. 아니면 안보이게 */}
        {true ? <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#333' } }}>
          수정
        </Button> : ''}
      </Box>
      {/* 여행 계획이 있으면 계획을 표시하고, 없으면 안내 문구 표시 */}
      {datePlan !== undefined ? (
        <Box sx={{ padding: 3, maxWidth: 1400, margin: 'auto' }}>
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
            {datePlan.map((plan, idx) => <PlanDetail key={idx} {...plan} onDragStart={() => dragStart(idx)} onDragEnter={() => dragEnter(idx)} onDragOver={e => e.preventDefault()} onDragEnd={drop} />)}
          </Box>

          {/* Add Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
            <Button variant="outlined" startIcon={<AddIcon />}>
              추가
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Typography sx={{ textAlign: 'center', color: 'grey.500', mt: 5 }}>
            계획을 추가해보세요
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
            <Button variant="outlined" startIcon={<AddIcon />}>
              추가
            </Button>
          </Box>
        </>
      )}
    </>
  );
}


//페이지 컴포넌트
const BudgetPage = () => {

  const location = useLocation();
  const [detail, setDetail] = useState(location.state?.detail || {});// `detail`에 전달된 데이터가 없을 때를 대비한 안전 처리
  console.log(detail);

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


  // 날짜 배열 생성
  const dates = generateDateArray(detail.startDate, detail.endDate);

  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const handleDateClick = (dates) => {
    setSelectedDate(dates);
  };

  return (
    <StyledContainer>
      <Navbar />
      <Grid container>
        {/* 왼쪽 영역 */}
        <Grid item xs={8} sx={{ padding: "0 16px 16px" }}>
          <ImageWithTextOverlay startDate={detail.startDate} endDate={detail.endDate} mainImage={detail.mainImage} title={detail.title} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mt: 3 }}>
            여행 일정
          </Typography>
          <Divider sx={{ margin: '20px 0' }} />
          <DateSelector dates={dates} onDateClick={handleDateClick} selectedDate={selectedDate} />
          <Divider sx={{ margin: '20px 0' }} />
          <PlanDate datePlan={detail.dailyItinerary[selectedDate]} date={selectedDate} onDrop={drop} />
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
