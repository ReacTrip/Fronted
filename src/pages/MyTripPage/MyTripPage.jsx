import React from 'react';
import { 
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '@/components/common/Navbar/Navbar';

const StyledContainer = styled(Container)({
  maxWidth: '1200px !important',
  padding: '0 20px',
});

const MyTripPage = () => {
  return (
    <StyledContainer>
      <Navbar />
    </StyledContainer>
  );
};

export default MyTripPage;
