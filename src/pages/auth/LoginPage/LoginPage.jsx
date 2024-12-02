import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link,
  IconButton,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { MOCK_USERS } from '@/data/userData';

const PageContainer = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
});

const StyledContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
});

const LoginBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '900px',
  display: 'flex',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const LeftSection = styled(Box)(({ theme }) => ({
  flex: '1',
  padding: '60px 40px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #0061ff 0%, #60efff 100%)',
  color: '#fff',
  [theme.breakpoints.down('md')]: {
    padding: '40px 20px',
  },
}));

const RightSection = styled(Box)(({ theme }) => ({
  flex: '1',
  padding: '60px 40px',
  backgroundColor: '#fff',
  [theme.breakpoints.down('md')]: {
    padding: '40px 20px',
  },
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#0061ff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#0061ff',
    },
  },
});

const LoginButton = styled(Button)({
  borderRadius: '10px',
  padding: '12px',
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'none',
  background: 'linear-gradient(135deg, #0061ff 0%, #60efff 100%)',
  '&:hover': {
    background: 'linear-gradient(135deg, #0052d9 0%, #50d9ff 100%)',
  },
});

const Logo = styled('img')({
  width: '300px',  
  height: 'auto',  
  marginBottom: '40px', 
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = MOCK_USERS.find(
      user => user.email === formData.email && user.password === formData.password
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } else {
      setError('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <PageContainer>
      <StyledContainer>
        <LoginBox>
          <LeftSection>
            <Logo src="/src/assets/images/Timmerman.png" alt="Logo" />
            <Typography variant="h4" fontWeight="700" textAlign="center" mb={3}>
              Welcome Back!
            </Typography>
            <Typography textAlign="center" fontSize="16px" mb={4}>
              새로운 여행의 시작,<br />
              리액트립에서 특별한 순간을 만나보세요.
            </Typography>
          </LeftSection>

          <RightSection>
            <Typography variant="h5" fontWeight="700" mb={4}>
              로그인
            </Typography>

            <form onSubmit={handleSubmit}>
              <StyledTextField
                fullWidth
                name="email"
                placeholder="이메일을 입력해주세요"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#9e9e9e' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#9e9e9e' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {error && (
                <Typography color="error" textAlign="center" mt={2}>
                  {error}
                </Typography>
              )}

              <LoginButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 2 }}
              >
                로그인
              </LoginButton>

              <Box textAlign="center">
                <Typography color="text.secondary" display="inline">
                  계정이 없으신가요? 
                </Typography>
                <Link 
                  href="/auth/signup"
                  underline="none"
                  sx={{ 
                    ml: 1,
                    color: '#0061ff',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  회원가입
                </Link>
              </Box>
            </form>
          </RightSection>
        </LoginBox>
      </StyledContainer>
    </PageContainer>
  );
};

export default LoginPage;