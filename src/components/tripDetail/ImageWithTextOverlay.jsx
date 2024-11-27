import {
    Typography,
    Box,
    SvgIcon,
  } from '@mui/material';
  import { styled } from '@mui/material/styles';
  import TodayIcon from '@mui/icons-material/Today';
  import EastIcon from '@mui/icons-material/East';



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
export default ImageWithTextOverlay;