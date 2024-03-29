import { WishlistType } from '@/shared/apis/cart/removeFromWishlist';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserSlice = {
  loginUserId: number | null;
  loginUserDetails: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
    isRegistered: boolean | number;
  };
  wishlistData: WishlistType[];
};
const initialState: UserSlice = {
  loginUserId: null,

  loginUserDetails: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isRegistered: false,
  },
  wishlistData: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginUserId: (state, action) => {
      state.loginUserId = action.payload;
    },
    setLoginUserDetails: (state, action) => {
      state.loginUserDetails = action.payload;
    },
    setWishlistData: (state, action: PayloadAction<WishlistType[]>) => {
      state.wishlistData = action.payload;
    },
  },
});

export const { setLoginUserId, setLoginUserDetails, setWishlistData } =
  userSlice.actions;
export default userSlice.reducer;
