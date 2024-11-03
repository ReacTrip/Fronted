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

// 네비게이션 버튼 커스터마이징
const NavButton = muiStyled(Button)(({ theme, isLogin }) => ({
  marginLeft: '35px',
  fontSize: '1.1rem',
  fontWeight: 500,
  padding: isLogin ? '8px 20px' : '5px 0',
  borderRadius: isLogin ? '20px' : 0,
  color: isLogin ? 'white' : theme.palette.text.primary,
  backgroundColor: isLogin ? theme.palette.primary.main : 'transparent',
  '&:hover': {
    backgroundColor: isLogin ? theme.palette.primary.dark : 'transparent',
    color: isLogin ? 'white' : theme.palette.primary.main,
    '&::after': !isLogin ? {
      width: '100%'
    } : {},
  },
  position: 'relative',
  '&::after': !isLogin ? {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '2px',
    bottom: 0,
    left: '50%',
    backgroundColor: theme.palette.primary.main,
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)'
  } : {},
}));

const Navbar = () => {
  const navItems = [
    { text: '여행지', path: '/trip-place' },
    { text: '내 여행', path: '/my-trip' },
    { text: '스마트 체크리스트', path: '/support' },
    { text: '여행 취향 테스트', path: '/guide' },
    { text: '로그인', path: '/auth/login' }
  ];

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <LogoLink to="/">
          <LogoImage src={logoImage} alt="Reactrip 로고" />
        </LogoLink>
        <Box sx={{ flexGrow: 1 }} /> {/* 빈 공간을 만들어 오른쪽 정렬 */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {navItems.map((item, index) => (
            <NavButton
              key={index}
              component={Link}
              to={item.path}
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
  );
};

export default Navbar;