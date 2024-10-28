import React from 'react';
import styled from 'styled-components';
import logoImage from '@/assets/images/Timmerman.png';

// Styled Components
const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`;

const Logo = styled.div`
  img {
    max-height: 200px;
    width: auto;
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style-type: none;
  }

  li {
    margin-left: 20px;
    cursor: pointer;
  }
`;

const MainContent = styled.main`
  text-align: left;

  h1 {
    font-size: 48px;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    color: #666;
    margin-bottom: 30px;
  }
`;

const StartButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const PreviewSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const PreviewBox = styled.div`
  width: 48%;
  height: 300px;
  background-color: #f0f0f0;
  border-radius: 10px;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  font-size: 14px;
  color: #666;
`;

const MainPage = () => {
  const navItems = ['여행지', '내 여행', '고객지원', '이용방법', '로그인'];

  return (
    <PageContainer>
      <Header>
        <Logo>
          <img src={logoImage} alt="Reactrip 로고" />
        </Logo>
        <Nav>
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Nav>
      </Header>
      
      <MainContent>
        <h1>
          기존에 경험하지 못한<br />
          새로운 여행 플래너
        </h1>
        <p>고민만 하던 여행 계획을 Reactrip를 통해 몇 분 만에 스케줄링 해보세요.</p>
        <StartButton>여행 계획 세우기</StartButton>
        
        <PreviewSection>
          <PreviewBox className="list-preview" />
          <PreviewBox className="map-preview" />
        </PreviewSection>
      </MainContent>

      <Footer>
        <p>AI로 생성된 일정 수 205,860</p>
        <p>여행지 수 96</p>
      </Footer>
    </PageContainer>
  );
};

export default MainPage;
