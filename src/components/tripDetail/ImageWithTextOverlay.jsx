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
import SettingsIcon from '@mui/icons-material/Settings';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase/firebaseConfig';

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
});

const ImageWithTextOverlay = ({ startDate, endDate, mainImage, title, isLike, onChangeLike, onChangeTitle, onChangeImage = () => {}, isAuthor }) => {
  const startDateKr = new Date(startDate).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  const endDateKr = new Date(endDate).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });

  const [isLiked, setIsLiked] = useState(isLike);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);

  const toggleLike = () => {
    !isLiked ? onChangeLike(1) : onChangeLike(0);
    setIsLiked(!isLiked);
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // 로딩 상태를 부모 컴포넌트에 전달
      onChangeImage(null, true); // 로딩 시작을 알림
  
      const storageRef = ref(storage, `images/${file.name}`);
      try {
        // Firebase에 파일 업로드
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        onChangeImage(downloadURL, false); // 이미지 URL과 로딩 종료를 알림
      } catch (error) {
        console.error("Image upload failed:", error);
        onChangeImage(null, false); // 로딩 종료
      }
    }
  };

  useEffect(() => {
    onChangeTitle(currentTitle);
  }, [currentTitle]);

  return (
    <TitleBox
      sx={{ backgroundImage: `url(${mainImage})` }}
    >
      {/* 좋아요 버튼 */}
      <IconButton
        onClick={toggleLike}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: isLiked ? 'red' : 'white',
        }}
      >
        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      {/* 이미지 변경 버튼 */}
      {isAuthor && <IconButton
        component="label"
        sx={{
          position: 'absolute',
          top: 16,
          right: 56, // 좋아요 버튼과 간격
          color: 'white',
        }}
      >
        <SettingsIcon />
        {/* 파일 입력 */}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </IconButton>}

      {/* 제목 및 수정 기능 */}
      <Box display="flex" alignItems="center">
        {isEditing ? (
          <TextField
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEditComplete()}
            onBlur={handleEditComplete}
            variant="outlined"
            size="small"
            sx={{ backgroundColor: 'white', borderRadius: '4px' }}
          />
        ) : (
          <Typography variant="h3" component="div" sx={{ fontWeight: 'bold' }}>
            {currentTitle}
          </Typography>
        )}
        {(!isEditing && isAuthor) &&(
          <IconButton onClick={handleEditToggle} sx={{ ml: 1, color: 'white' }}>
            <EditIcon />
          </IconButton>
        )}
      </Box>

      {/* 날짜 표시 */}
      <Typography variant="body1" component="div" sx={{ mt: 1 }}>
        <SvgIcon component={TodayIcon} sx={{ verticalAlign: "middle" }} /> {startDateKr} <SvgIcon component={EastIcon} sx={{ verticalAlign: "middle" }} /> {endDateKr}
      </Typography>
    </TitleBox>
  );
};

export default ImageWithTextOverlay;
