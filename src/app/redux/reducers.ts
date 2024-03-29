import { combineReducers } from '@reduxjs/toolkit';
import commonReducer from './slices/commonSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice';
import userReducer from './slices/userSlice';
import modalReducer from './slices/modalSlice';
import employeeReducer from './slices/employeeSlice';
import orderReturnReducer from './slices/returnOrderSlice';

const rootReducer = combineReducers({
  common: commonReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  user: userReducer,
  modal: modalReducer,
  employee: employeeReducer,
  orderReturn: orderReturnReducer,
});

export default rootReducer;

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;
