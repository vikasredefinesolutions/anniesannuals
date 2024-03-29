import { IModalDetails } from '@/shared/apis/common/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface modalSlice {
  modalDetails: IModalDetails;
}

const initialState: modalSlice = {
  modalDetails: {
    title: '',
    description: '',
    isAlertModalOpen: false,
    isShowButton: false,
    onConfirm: () => {}
  },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openAlertModal: (state, action: PayloadAction<IModalDetails>) => {
      state.modalDetails = action.payload;
    },
  },
});

export const { openAlertModal } = modalSlice.actions;
export default modalSlice.reducer;
