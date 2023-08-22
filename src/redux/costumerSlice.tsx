import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: any = null;

export const costumersSlice = createSlice({
  name: 'costumer',
  initialState,
  reducers: {
    updateCostumersListAction: (state, action: PayloadAction<any>) => {
      return state = action.payload;
    }, 
    deleteCostumerFromListAction: (state, action: PayloadAction<any>) => {
      return state.filter((customer: any) => customer.id !== action.payload.id);
    }
  },
});

export const { updateCostumersListAction, deleteCostumerFromListAction } = costumersSlice.actions;
export default costumersSlice.reducer;
