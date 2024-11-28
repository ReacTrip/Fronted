import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  styled as muiStyled 
} from '@mui/material';
import styled from 'styled-components';
import logoImage from '@/assets/images/Timmerman.png';

// AppBar 커스터마이징
const StyledAppBar = muiStyled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  marginBottom: '50px',
}));

// 로고 스타일링
const LogoLink = styled(Link)`
  text-decoration: none;
  display: block;
  transform: translateY(-20px);
`;

const LogoImage = styled.img`
  max-height: 200px;
  width: auto;
  display: block;
`;

// 일반 네비게이션 버튼
const NavButtonBase = muiStyled(Button)(({ theme }) => ({
  marginLeft: '35px',
  fontSize: '1.1rem',
  fontWeight: 500,
  padding: '5px 0',
  borderRadius: 0,
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    '&::after': {
      width: '100%'
    },
  },
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '2px',
    bottom: 0,
    left: '50%',
    backgroundColor: theme.palette.primary.main,
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)'
  },
}));

// 로그인 버튼
const LoginButton = muiStyled(Button)(({ theme }) => ({
  marginLeft: '35px',
  fontSize: '1.1rem',
  fontWeight: 500,
  padding: '8px 20px',
  borderRadius: '20px',
  color: 'white',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Navbar = () => {
  const navItems = [
    { text: '여행지', path: '/trip-place', isLogin: false },
    { text: '내 여행', path: '/my-trip', isLogin: false },
    { text: '포토스팟 가이드', path: '/photo-spot', isLogin: false },
    { text: '여행 취향 테스트', path: '/interest-test', isLogin: false },
    { text: '로그인', path: '/auth/login', isLogin: true }
  ];

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <LogoLink to="/">
          <LogoImage src={logoImage} alt="Reactrip 로고" />
        </LogoLink>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {navItems.map((item, index) => (
            item.isLogin ? (
              <LoginButton
                key={index}
                component={Link}
                to={item.path}
                variant="contained"
                disableRipple={true}
              >
                {item.text}
              </LoginButton>
            ) : (
              <NavButtonBase
                key={index}
                component={Link}
                to={item.path}
                variant="text"
                disableRipple={true}
              >
                {item.text}
              </NavButtonBase>
            )
          ))}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;