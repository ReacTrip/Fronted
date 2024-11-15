import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  Paper 
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

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
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
      // 실제로는 여기서 토큰 저장 등의 작업을 수행
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } else {
      setError('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
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
          Reactrip 로그인
        </Typography>

        <Form onSubmit={handleSubmit}>
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
          />

          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
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
            로그인
          </Button>
        </Form>

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Typography color="text.secondary">
            계정이 없으신가요?
          </Typography>
          <Link 
            href="/auth/signup" 
            underline="hover"
            sx={{ 
              color: '#000',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            회원가입
          </Link>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default LoginPage;