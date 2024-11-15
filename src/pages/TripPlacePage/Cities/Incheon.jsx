import React from 'react';
import styled from 'styled-components';
import Navbar from '@/components/common/Navbar/Navbar';

const Container = styled.div`
  padding: 20px;
`;

const Incheon = () => {
  return (
    <Container>
      <Navbar />
      <h1>인천</h1>
    </Container>
  );
};

export default Incheon;
