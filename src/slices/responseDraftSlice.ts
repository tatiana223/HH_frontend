import { createSlice } from '@reduxjs/toolkit';

interface ResponseState {
  response_id?: number;
  count: number | undefined;
}

const initialState: ResponseState = {
  response_id: NaN,
  count: NaN,
};

const responseDraftSlice = createSlice({
  name: 'responseDraft',
  initialState,
  reducers: {
    setResponseId: (state, action) => {
        state.response_id = action.payload;
      },
      setCount: (state, action) => {
        state.count = action.payload;
      },
  },
  },
);

export const {setResponseId, setCount} = responseDraftSlice.actions;
export default responseDraftSlice.reducer;