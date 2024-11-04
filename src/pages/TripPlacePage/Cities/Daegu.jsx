import React from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';

const Container = styled.div`
  padding: 20px;
`;

const Daegu = () => {
  return (
    <Container>
      <Navbar />
      <h1>대구</h1>
    </Container>
  );
};

export default Daegu;
