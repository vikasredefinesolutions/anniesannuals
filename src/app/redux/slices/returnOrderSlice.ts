import { createSlice } from '@reduxjs/toolkit';

export interface ReturnOrderSlice {
  cartId: number;
  qty: number;
}

interface OrderReturnCartSlice {
  returnOrederData: ReturnOrderSlice[] | [];
}

const initialState: OrderReturnCartSlice = {
  returnOrederData: [],
};

export const returnSlice = createSlice({
  name: 'orderReturn',
  initialState,
  reducers: {
    addReturnData: (state, action) => {
      state.returnOrederData = action.payload;
    },
  },
});

export const { addReturnData } = returnSlice.actions;
export default returnSlice.reducer;
