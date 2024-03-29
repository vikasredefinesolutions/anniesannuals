import {
  IGrowingZone,
} from '@/shared/apis/common/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CommonSlice = {
  isLoading: boolean;
  growingZone: IGrowingZone;
};

const initialState: CommonSlice = {
  isLoading: false,
  growingZone: {
    zoneName: '',
    stateCode: '',
    stateName: '',
    zipCode: '',
    cityName: '',
    storeId: 0,
    zoneImageUrl:''
  },
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setGrowingZone: (state, action: PayloadAction<IGrowingZone>) => {
      state.growingZone = action.payload;
    },
  },
});

export const { showLoader, setGrowingZone } = commonSlice.actions;
export default commonSlice.reducer;
