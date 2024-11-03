import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box,
  Dialog,
  DialogContent,
  styled as muiStyled 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '@/assets/images/Timmerman.png';

// ... 기존 styled components 유지

const AlertDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    borderRadius: '10px',
    padding: '20px',
    minWidth: '300px'
  }
});

const Navbar = () => {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  
  // localStorage에서 user 정보를 확인하여 로그인 상태 체크
  const isLoggedIn = !!localStorage.getItem('user');

  const handleMyTripClick = () => {
    if (!isLoggedIn) {
      setOpenAlert(true);
      return;
    }
    navigate('/my-trip');
  };

  const navItems = [
    { text: '여행지', path: '/trip-place' },
    { text: '내 여행', onClick: handleMyTripClick },
    { text: '스마트 체크리스트', path: '/support' },
    { text: '여행 취향 테스트', path: '/guide' },
    { text: '로그인', path: '/auth/login' }
  ];

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <LogoLink to="/">
            <LogoImage src={logoImage} alt="Reactrip 로고" />
          </LogoLink>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navItems.map((item, index) => (
              <NavButton
                key={index}
                component={item.path ? Link : 'button'}
                to={item.path}
                onClick={item.onClick}
                isLogin={item.text === '로그인'}
                variant={item.text === '로그인' ? 'contained' : 'text'}
                disableRipple={true}
              >
                {item.text}
              </NavButton>
            ))}
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* 로그인 필요 알림 다이얼로그 */}
      <AlertDialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
      >
        <DialogContent sx={{ 
          textAlign: 'center',
          color: '#333',
          fontSize: '16px'
        }}>
          로그인을 해야 이용할 수 있는 기능입니다.
        </DialogContent>
      </AlertDialog>
    </>
  );
};

export default Navbar;