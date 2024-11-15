import React from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';

const Container = styled.div`
  padding: 20px;
`;

const Busan = () => {
  return (
    <Container>
      <Navbar />
      <h1>부산</h1>
    </Container>
  );
};

export default Busan;
