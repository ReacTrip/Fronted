import { createSlice } from '@reduxjs/toolkit';

const travelSlice = createSlice({
  name: 'travels',
  initialState: {
    myTravels: [], // 내 여행 데이터
    allTravels: [], // 모든 사용자 여행 데이터
  },
  reducers: {
    addTravel: (state, action) => {
      state.myTravels.push(action.payload); // 내 여행 추가
    },
    publishTravel: (state, action) => {
      state.allTravels.push(action.payload); // 모든 사용자 여행 목록에 추가
    },
  },
});

export const { addTravel, publishTravel } = travelSlice.actions;
export default travelSlice.reducer;
