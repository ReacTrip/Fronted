import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link,
  IconButton,
  InputAdornment,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Email, Lock, Person, Visibility, VisibilityOff } from '@mui/icons-material';
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

const SignupBox = styled(Box)(({ theme }) => ({
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

const SignupButton = styled(Button)({
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

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validatePassword = () => {
    return formData.password.length >= 8 && 
           /[A-Z]/.test(formData.password) && 
           /[0-9]/.test(formData.password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      setError('비밀번호는 8자 이상이며, 대문자와 숫자를 포함해야 합니다.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (MOCK_USERS.some(user => user.email === formData.email)) {
      setError('이미 사용 중인 이메일입니다.');
      return;
    }

    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
    navigate('/auth/login');
  };

  return (
    <PageContainer>
      <StyledContainer>
        <SignupBox>
          <LeftSection>
            <Logo src="/src/assets/images/Timmerman.png" alt="Logo" />
            <Typography variant="h4" fontWeight="700" textAlign="center" mb={3}>
              Join Us!
            </Typography>
            <Typography textAlign="center" fontSize="16px" mb={4}>
              새로운 여행의 시작,<br />
              리액트립에서 특별한 순간을 만나보세요.
            </Typography>
          </LeftSection>

          <RightSection>
            <Typography variant="h5" fontWeight="700" mb={4}>
              회원가입
            </Typography>

            <form onSubmit={handleSubmit}>
              <StyledTextField
                fullWidth
                name="name"
                placeholder="이름을 입력해주세요"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#9e9e9e' }} />
                    </InputAdornment>
                  ),
                }}
              />

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
                helperText="8자 이상, 대문자와 숫자 포함"
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

<StyledTextField
                fullWidth
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="비밀번호를 다시 입력해주세요"
                value={formData.confirmPassword}
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
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <SignupButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 2 }}
              >
                회원가입
              </SignupButton>

              <Box textAlign="center">
                <Typography color="text.secondary" display="inline">
                  이미 계정이 있으신가요? 
                </Typography>
                <Link 
                  href="/auth/login"
                  underline="none"
                  sx={{ 
                    ml: 1,
                    color: '#0061ff',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  로그인
                </Link>
              </Box>
            </form>
          </RightSection>
        </SignupBox>
      </StyledContainer>
    </PageContainer>
  );
};

export default SignupPage;