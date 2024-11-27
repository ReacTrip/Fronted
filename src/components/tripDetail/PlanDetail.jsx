import React, { useState, useRef, useEffect } from "react";
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
import PlaceIcon from '@mui/icons-material/Place';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FestivalIcon from '@mui/icons-material/Festival';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { storage } from "@/firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Carousel from 'react-material-ui-carousel';



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
});


const TimeTypography = styled(Typography)(({ theme }) => ({
    marginLeft: '8px', // 아이콘과 텍스트 사이의 간격
    fontWeight: 'bold', // 글씨 굵게
    color: 'black', // 글씨 색상 (필요하면 변경 가능)
}));


//여행 계획 하나 단위
const PlanDetail = (props) => {

    const [open, setOpen] = useState(false); // 모달 열기/닫기 상태

    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [isComplete, setIsComplete] = useState(false); // 완료 상태

    const [currentIndex, setCurrentIndex] = useState(0); // 현재 Carousel 인덱스


    // 모달 열기
    const handleOpen = () => setOpen(true);

    // 모달 닫기
    const handleClose = () => { setOpen(false); setCurrentIndex(0); }

    const fileInputRef = useRef(null);

    // 파일 선택 핸들러
    const handleFileChange = async (event) => {
        const files = event.target.files; // 선택된 파일 배열
        if (files.length > 0) {
            setIsLoading(true); // 로딩 시작
            try {
                const urls = [];
                for (const file of files) {
                    const storageRef = ref(storage, `images/${file.name}`);
                    await uploadBytes(storageRef, file); // Firebase Storage로 파일 업로드
                    const url = await getDownloadURL(storageRef); // 업로드된 URL 가져오기
                    urls.push(url);
                }
                const newImages = props.images.concat(urls);
                props.onChangeImages(newImages); // 업로드 완료 후 부모 컴포넌트에 전달
            } catch (error) {
                console.error("파일 업로드 중 오류 발생:", error);
            } finally {
                setIsLoading(false); // 로딩 종료
                setIsComplete(true); // 완료 상태로 변경
                // 1초 후 완료 메시지 숨기기
                setTimeout(() => {
                    setIsComplete(false);
                }, 2500);
            }
        }
    };

    const onImageDelete = (index) => {
        const newImages = [...props.images].filter((val, idx) => idx !== index);
        props.onChangeImages(newImages);

        // 인덱스 조정: 삭제된 이미지가 마지막 이미지라면 이전 이미지로 이동
        if (index === currentIndex && newImages.length > 0) {
            setCurrentIndex(Math.max(0, index - 1));
        } else if (newImages.length === 0) {
            handleClose();
        }
    }

    // 버튼 클릭 시 파일 입력창 열기
    const handleClick = () => {
        fileInputRef.current.click(); // 숨겨진 파일 입력 트리거
    };

    return (
        <div  //드래그가 가능하기위해 div로 감싸줌
            onDragStart={props.onDragStart}
            onDragEnter={props.onDragEnter}
            onDragOver={props.onDragOver}
            onDragEnd={props.onDragEnd}
            draggable="true" // 이 속성이 있어야 컴포넌트가 드래그 가능함
            style={{ position: 'relative' }}
        >
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}> {/* PlaceIcon과 12:00을 한 행에 배치 */}
                        <LineBox>
                            {props.category === "festival" ? (
                                <FestivalIcon sx={{ color: 'white', fontSize: 20 }} />
                            ) : props.category === "restaurant" ? (
                                <RestaurantIcon sx={{ color: 'white', fontSize: 20 }} />
                            ) : (
                                <PlaceIcon sx={{ color: 'white', fontSize: 20 }} />
                            )}
                        </LineBox>
                        <TimeTypography variant="h6">
                            {props.time}
                        </TimeTypography>
                    </Box>
                </Grid>
                <Grid item xs>
                    <Box sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 2, display: 'flex', alignItems: 'center' }}>
                        <img
                            src={props.placeImage} // 여기에 실제 이미지 경로를 넣으세요.
                            alt={props.name}
                            style={{ width: '200px', height: '200px', borderRadius: '8px', marginRight: '16px', objectFit: 'cover' }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}> {/* 수직 정렬을 위해 flexDirection을 column으로 설정 */}
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {props.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {props.notes}
                            </Typography>
                        </Box>
                        {/* 오른쪽 하단에 추가 아이콘과 이미지 버튼 */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            {/* 추가 아이콘 버튼 */}
                            <div>
                                {/* 추가 아이콘 버튼 */}
                                <IconButton
                                    onClick={handleClick}
                                    sx={{
                                        backgroundColor: 'grey.300',
                                        width: 60,
                                        height: 60,
                                        borderRadius: 1,
                                        border: '1px solid #ddd',
                                    }}
                                >
                                    <AddIcon sx={{ color: 'grey.600', fontSize: 30 }} />
                                </IconButton>

                                {/* 숨겨진 파일 입력 */}
                                <input
                                    type="file"
                                    ref={fileInputRef} // 파일 입력 요소에 접근하기 위한 ref
                                    style={{ display: 'none' }} // 화면에 표시되지 않도록 숨김
                                    onChange={handleFileChange} // 파일 선택 시 업로드 처리
                                    accept="image/*"
                                    multiple // 여러 개의 파일 선택 허용
                                />
                            </div>

                            {/* 이미지 버튼 */}
                            {props.images.length > 0 && (
                                <Badge
                                    badgeContent={props.images.length}
                                    color="primary"
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            top: 0,
                                            right: 0,
                                            height: 20,
                                            minWidth: 20,
                                            borderRadius: '50%',
                                            backgroundColor: '#0066cc', // 배지 배경색
                                            color: 'white',
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            border: '2px solid white',
                                        },
                                    }}
                                >
                                    <IconButton
                                        onClick={handleOpen}
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 1,
                                            border: '1px solid #ddd',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundImage: `url(${props.images[0]})`,
                                        }}
                                    />
                                </Badge>
                            )}
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

            {/* 모달 */}
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%',
                            maxWidth: '600px',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 2,
                            borderRadius: 2,
                            overflow: 'hidden', // 이미지가 넘치지 않도록 설정
                        }}
                    >
                        {/* Carousel */}
                        <Carousel
                            navButtonsAlwaysVisible={true} // 이전/다음 버튼 항상 보이도록 설정
                            animation="slide" // 슬라이드 애니메이션
                            indicators={true} // 하단의 도트 표시 비활성화
                            cycleNavigation={false} // 무한 루프
                            autoPlay={false}
                            index={currentIndex} // 현재 활성화된 인덱스
                            onChange={(index) => setCurrentIndex(index)} // 인덱스 변경 추적
                        >
                            {props.images.map((image, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        position: 'relative', // 삭제 버튼 배치를 위해 relative 설정
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={`이미지 ${index + 1}`}
                                        style={{
                                            width: '700px',
                                            height: '700px',
                                            maxWidth: '100%', // 부모의 너비에 맞게 조정
                                            maxHeight: '100%', // 부모의 높이에 맞게 조정
                                            borderRadius: 8,
                                            objectFit: 'contain'
                                        }}
                                    />
                                    {/* 삭제 버튼 */}
                                    <IconButton
                                        onClick={() => onImageDelete(index)} // 이미지 삭제 이벤트
                                        sx={{
                                            position: 'absolute',
                                            top: 0, // 상단에 위치
                                            left: '50%', // 가로 중앙으로 이동
                                            transform: 'translateX(-50%)', // 정확히 중앙 정렬
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)', // 배경 투명도 설정
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                            },
                                        }}
                                    >
                                        <DeleteIcon sx={{ color: 'grey' }} />
                                    </IconButton>
                                </Box>
                            ))}
                        </Carousel>
                    </Box>
                </Fade>
            </Modal>
            {/* 이미지 업로드 로딩 스피너 */}
            {(isLoading || isComplete) && <Box
                sx={{
                    position: "fixed",
                    bottom: 0,
                    right: "20px",
                    width: "300px",
                    height: "100px",
                    bgcolor: "background.paper",
                    boxShadow: 3,
                    borderTopLeftRadius: "8px", // 좌측 상단 모서리
                    borderTopRightRadius: "8px", // 우측 상단 모서리
                    borderBottomLeftRadius: "0", // 좌측 하단 모서리
                    borderBottomRightRadius: "0", // 우측 하단 모서리
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    zIndex: 1200,
                }}
            >
                {isLoading ? (<><CircularProgress />
                    <Typography variant="body1" sx={{ fontWeight: "bold", color: "grey" }}>
                        이미지 업로드 중...
                    </Typography></>) : (
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        이미지 업로드 완료!
                    </Typography>
                )}
            </Box>}

        </div>
    );
}
export default PlanDetail;