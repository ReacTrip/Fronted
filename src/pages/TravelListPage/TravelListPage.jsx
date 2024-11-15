import React from 'react';
import { useSelector } from 'react-redux';

const TravelListPage = () => {
  // Redux 상태에서 allTravels 가져오기
  const allTravels = useSelector((state) => state.travels?.allTravels || []);

  return (
    <div>
      <h1>모든 여행 목록</h1>
      {allTravels.length === 0 ? (
        <p>등록된 여행이 없습니다.</p>
      ) : (
        <ul>
          {allTravels.map((travel) => (
            <li key={travel.id}>
              <h2>{travel.title}</h2>
              <p>작성자: {travel.AuthorId}</p>
              <p>
                여행 기간: {travel.startDate} ~ {travel.endDate}
              </p>
              <p>{travel.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TravelListPage;
