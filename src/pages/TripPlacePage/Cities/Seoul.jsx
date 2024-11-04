import React from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';

const Container = styled.div`
  padding: 20px;
`;

const Seoul = () => {
  return (
    <Container>
      <Navbar />
      <h1>서울</h1>
    </Container>
  );
};

export default Seoul;