// src/pages/auth/SignupPage/SignupPage.jsx
import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  Paper,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { MOCK_USERS } from '@/data/userData';

const StyledContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  padding: '20px',
});

const StyledPaper = styled(Paper)({
  padding: '40px',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  borderRadius: '15px',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
});

const Form = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
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

    // 기본적인 유효성 검사
    if (!validatePassword()) {
      setError('비밀번호는 8자 이상이며, 대문자와 숫자를 포함해야 합니다.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 이메일 중복 체크
    if (MOCK_USERS.some(user => user.email === formData.email)) {
      setError('이미 사용 중인 이메일입니다.');
      return;
    }

    // 실제로는 여기서 회원가입 API 호출
    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
    navigate('/auth/login');
  };

  return (
    <StyledContainer>
      <StyledPaper>
        <Typography 
          variant="h5" 
          component="h1"
          sx={{ 
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center' 
          }}
        >
          회원가입
        </Typography>

        <Form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="이름"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            required
          />

          <TextField
            fullWidth
            label="이메일"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            required
          />

          <TextField
            fullWidth
            label="비밀번호"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            required
            helperText="8자 이상, 대문자와 숫자 포함"
          />

          <TextField
            fullWidth
            label="비밀번호 확인"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            variant="outlined"
            required
          />

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#000',
              py: 1.5,
              '&:hover': {
                bgcolor: '#333',
              },
            }}
          >
            가입하기
          </Button>
        </Form>

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Typography color="text.secondary">
            이미 계정이 있으신가요?
          </Typography>
          <Link 
            href="/auth/login" 
            underline="hover"
            sx={{ 
              color: '#000',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            로그인
          </Link>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default SignupPage;