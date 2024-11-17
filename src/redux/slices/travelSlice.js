import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myTrips: [], // 빈 배열로 초기화
};


const travelSlice = createSlice({
  name: 'travels',
  initialState,
  reducers: {
    addTrip: (state, action) => {
      state.myTrips.push(action.payload);
    },
  },
});

export const { addTrip } = travelSlice.actions;
export default travelSlice.reducer;
