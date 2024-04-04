import { _CartItem } from '@appShared/apis/cart/fetchCartProducts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartSlice = {
  cartData: _CartItem[];
  orderSubTotal: number;
  orderTotal: number;
  cartQuantity: number;
  shippingCharge: number;
  tax: number;
  shippingList: { name: string; price: number }[];
  selectedShipping: { name: string; price: number };
  totalShippingCost: number;
  couponDetails: {
    coupon: string;
    amount: string;
    percentage: string;
    todo: string;
  };
};

const initialState: CartSlice = {
  cartData: [],
  orderTotal: 0,
  orderSubTotal: 0,
  tax: 0,
  selectedShipping: { name: 'Free Shipping', price: 0 },
  totalShippingCost: 0,
  cartQuantity: 0,
  shippingCharge: 0,
  shippingList: [],
  couponDetails: {
    coupon: '',
    amount: '0',
    percentage: '0',
    todo: '',
  },
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartData: (state, action: PayloadAction<_CartItem[]>) => {
      state.cartData = action.payload;
    },
    updateOrderTotal: (
      state,
      action: PayloadAction<{
        orderSubTotal: number;
        shippingCharge: number;
        tax: number;
        orderTotal: number;
      }>,
    ) => {
      state.orderSubTotal = action.payload.orderSubTotal;
      state.shippingCharge = action.payload.shippingCharge;
      state.tax = action.payload.tax;
      state.orderTotal = action.payload.orderTotal;
    },
    updateCouponDetails: (
      state,
      action: PayloadAction<{
        coupon: string;
        amount: string;
        percentage: string;
        todo: 'ADD' | 'REMOVE';
      }>,
    ) => {
      if (action.payload.todo === 'ADD') {
        state.couponDetails.coupon = action.payload.coupon;
        state.couponDetails.percentage = action.payload.percentage;
        state.couponDetails.amount = action.payload.amount;
        let total = state.orderSubTotal + state.shippingCharge;

        if (parseInt(action.payload.amount) !== 0) {
          state.orderTotal = total - parseInt(action.payload.amount);
        } else if (parseInt(action.payload.percentage) !== 0) {
          state.orderTotal =
            total - total * (parseInt(action.payload.percentage) / 100);
        }
      } else {
        state.couponDetails.coupon = '';
        state.couponDetails.amount = '0';
        state.couponDetails.percentage = '0';
        state.orderTotal = state.orderSubTotal + state.shippingCharge;
      }
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{ quantity: number }>,
    ) => {
      state.cartQuantity = action.payload.quantity;
    },
    addShippingChargeList: (
      state,
      action: PayloadAction<{ name: string; price: number }[]>,
    ) => {
      const totalShippingCost = action.payload.reduce(
        (acc, curr) => acc + curr.price,
        0,
      );
      state.shippingList = action.payload;
      state.totalShippingCost = totalShippingCost;
      if (action.payload.length > 0) {
        state.selectedShipping = action.payload[0];
      }
    },
    changeShippingMethodInStore: (
      state,
      action: PayloadAction<{ totalShippingPrice: number }>,
    ) => {
      state.totalShippingCost = action.payload?.totalShippingPrice;
      state.orderTotal =
        state.orderSubTotal + state.tax + action.payload.totalShippingPrice;
    },
    clearShippingInformation: (state) => {
      state.selectedShipping = { name: 'Free Shipping', price: 0 };
      state.shippingList = [];
    },
    clearCart: (state) => {
      state.cartData = [];
      state.cartQuantity = 0;
      state.orderSubTotal = 0;
      state.orderTotal = 0;
      state.shippingCharge = 0;
      state.tax = 0;
      state.couponDetails = {
        coupon: '',
        amount: '0',
        percentage: '0',
        todo: '',
      };
    },
  },
});

export const {
  addCartData,
  updateOrderTotal,
  updateCouponDetails,
  clearCart,
  updateCartQuantity,
  addShippingChargeList,
  changeShippingMethodInStore,
  clearShippingInformation,
} = cartSlice.actions;
export default cartSlice.reducer;
