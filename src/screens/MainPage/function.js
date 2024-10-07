import React from 'react';
import './style.css';

function MainPage() {
  return (
    <div className="main-page">
      <header>
        <div className="logo">MYRO</div>
        <nav>
          <ul>
            <li>여행지</li>
            <li>내 여행</li>
            <li>고객지원</li>
            <li>이용방법</li>
            <li>로그인</li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>기존에 경험하지 못한<br />새로운 여행 플래너</h1>
        <p>고민만 하던 여행 계획을 마이로를 통해 몇 분 만에 스케줄링 해보세요.</p>
        <button className="start-button">마이로 시작하기</button>
        <div className="preview">
          <div className="list-preview"></div>
          <div className="map-preview"></div>
        </div>
      </main>
      <footer>
        <p>AI로 생성된 일정 수 205,860</p>
        <p>여행지 수 96</p>
      </footer>
    </div>
  );
}

export default MainPage;