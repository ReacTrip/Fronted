import React, { useEffect, useState } from 'react';
import {
    Typography,
    Box,
    SvgIcon,
    IconButton,
    TextField,
  } from '@mui/material';
  import { styled } from '@mui/material/styles';
  import TodayIcon from '@mui/icons-material/Today';
  import EastIcon from '@mui/icons-material/East';
  import FavoriteIcon from '@mui/icons-material/Favorite';
  import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
  import EditIcon from '@mui/icons-material/Edit';



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
const ImageWithTextOverlay = ({ startDate, endDate, mainImage, title, isLike, onChangeLike, onChangeTitle }) => {

    const startDateKr = new Date(startDate).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
    const endDateKr = new Date(endDate).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });

    const [isLiked, setIsLiked] = useState(isLike);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(title);
    const toggleLike = () => {
      !isLiked ? onChangeLike(1) : onChangeLike(0);
      console.log(isLiked);
      setIsLiked(!isLiked);
    };

    const handleEditToggle = () => {
      setIsEditing(true);
    };
  
    const handleEditComplete = () => {
        setIsEditing(false);
    };

    useEffect(()=>{
      onChangeTitle(currentTitle);
    },[currentTitle]);
  
    return (
      <TitleBox
        sx={{ backgroundImage: `url(${mainImage})`, }}
      >
        <IconButton
        onClick={toggleLike}
        sx={{
          position: 'absolute',
          top: 16, // 상단에서 16px 떨어짐
          right: 16, // 오른쪽에서 16px 떨어짐
          color: isLiked ? 'red' : 'white', // 좋아요 여부에 따라 색상 변경
        }}
      >
        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <Box display="flex" alignItems="center">
        {isEditing ? (
          <TextField
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEditComplete()}
            onBlur={handleEditComplete} // 포커스가 벗어날 때 저장
            variant="outlined"
            size="small"
            sx={{ backgroundColor: 'white', borderRadius: '4px' }}
          />
        ) : (
          <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
            {currentTitle}
          </Typography>
        )}
        {!isEditing && (
          <IconButton onClick={handleEditToggle} sx={{ ml: 1, color: 'white' }}>
            <EditIcon />
          </IconButton>
        )}
      </Box>
        <Typography variant="body1" component="div" sx={{ mt: 1 }}>
          <SvgIcon component={TodayIcon} sx={{ verticalAlign: "middle" }} /> {startDateKr} <SvgIcon component={EastIcon} sx={{ verticalAlign: "middle" }} /> {endDateKr}
        </Typography>
      </TitleBox>
  
    );
  };
export default ImageWithTextOverlay;