import { useAppSelector } from '@/app/redux/hooks';
import { addCartData, clearCart } from '@/app/redux/slices/cartSlice';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { setWishlistData } from '@/app/redux/slices/userSlice';
import {
  _CartItem,
  getCartDetails,
} from '@/shared/apis/cart/fetchCartProducts';
import { getWishlist } from '@/shared/apis/cart/getWishlistItems';
import { moveToWishlist } from '@/shared/apis/cart/moveToWishlist';
import { deleteCartItem } from '@/shared/apis/cart/removeCartProduct';
import {
  WishlistType,
  removeWishlist,
} from '@/shared/apis/cart/removeFromWishlist';
import { updateCartQuantity } from '@/shared/apis/cart/updateItemQuanity';
import { getTempUserId, getUserId } from '@/shared/utils/cookie.helper';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import storeDetail from '@/staticData/storeDetails.json';
import { getLocation, sendErrorMessage } from '@/utils/helpers';
import _debounce from 'lodash/debounce';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomFields } from './type';

export interface _CartItemReadyProps {
  removeItemHandler: (cartItemId: number) => void;
  quantity: Record<string, number>;
  price: number;
  priceUpdateHandler: (newPrice: string) => void;
  debounceFnForQuantity: (
    attributeOptionId: number,
    cartLogoPersonId: number,
    quanity: number,
    shoopingCartItemsId: number,
    keyName: string,
  ) => void;
  addToWishlist: (productId: number, name: string) => void;
  removeFromWishlist: (wishlistId: number) => void;
  wishListId: number;
  updateQuantity: (keyName: string, quantity: number) => void;
  checkCommonName: (customField: CustomFields[]) => string;
}

interface _Props {
  item: _CartItem;
  setCartStatus?: React.Dispatch<
    React.SetStateAction<'loading' | 'empty' | 'ready'>
  >;
  cases: {
    ready: (helpers: _CartItemReadyProps) => ReactElement<any, any>;
  };
}

const CartItemController: React.FC<_Props> = ({
  item,
  cases,
  setCartStatus,
}) => {
  const { wishlistData } = useAppSelector((state) => state.user);
  const [status, setStatus] = useState<string>('ready');
  const [quantity, setQuantity] = useState<Record<string, number>>({});
  const [wishListId, setWishListId] = useState<number>(0);
  const userId = getUserId();
  const tempId = getTempUserId();
  const { cartData } = useAppSelector((state) => state.cart);

  const dispatch = useDispatch();
  const [price, setPrice] = useState<number>(item.price);

  useEffect(() => {
    calculateQuantityObject();
  }, []);

  useEffect(() => {
    checkProductInWishlist();
  }, [wishlistData.length]);

  const checkCommonName = (customField: CustomFields[]) => {
    let commonName = customField.filter(
      (el: CustomFields) => el.label == 'COMMON NAME',
    )[0]?.value;

    if (commonName) {
      return commonName;
    } else {
      return '';
    }
  };

  const checkProductInWishlist = () => {
    wishlistData.forEach((wishlistItem: WishlistType) => {
      if (wishlistItem.productId === item.productId) {
        setWishListId(wishlistItem.id);
      } else {
        setWishListId(0);
      }
    });
  };

  const calculateQuantityObject = () => {
    let a: any = {};
    a['totalQty'] = item.totalQty;

    item.shoppingCartItemDetailsViewModel.forEach((view, index) => {
      a[view.attributeOptionValue] = view.qty;
    });
    setQuantity(a);
  };
  const debounceFnForQuantity = useCallback(
    _debounce(handleDebounceFnForQuantity, 1000),
    [],
  );

  const debounceFnForPrice = useCallback(
    _debounce(handleDebounceFnForPrice, 1000),
    [],
  );

  const updateQuantity = (keyName: string, newQuantity: number) => {
    setQuantity({ ...quantity, [keyName]: newQuantity });
  };

  function handleDebounceFnForPrice(price: number) {
    //apicall will be here for updating the cart
    // const userId = getUserId();
    // if (!quantity) return alert('Quantity must be greater than 0');
    // const payload = {
    //   addToCartModel: {
    //     customerId: userId,
    //     productId: item.productId,
    //     storeId: storeDetails.storeId, // need to make it dynamic
    //     ipAddress: getLocation().ip_address,
    //     isempLogin: false,
    //     isForm: false,
    //     shoppingCartItemModel: {
    //       price: price,
    //       quantity: quantity,
    //       // color image details don't get confused with name
    //       logoTitle: item.productName,
    //       logogImagePath: item.colorImage,
    //       // not to touch
    //       id: 0,
    //       weight: 0,
    //       productType: 0,
    //       discountPrice: 0,
    //       perQuantity: 0,
    //       appQuantity: 0,
    //       status: 0,
    //       discountPercentage: 0,
    //       productCustomizationId: 0,
    //       itemNotes: '',
    //       isEmployeeLoginPrice: true,
    //     },
    //   },
    // };
    // addToCart(payload)
    //   .then((res) => alert('Added to cart successfully'))
    //   .catch((error) => alert(error[Object.keys(error)[0]]));
  }

  const addToWishlist = async (productId: number, name: string) => {
    const data = await getLocation();

    const requestObject = {
      storeproductWishListModel: {
        id: 0,
        name: name,
        quantity: 1,
        color: '',
        price: price,
        recStatus: 'A',
        rowVersion: '',
        productId: productId ? productId : 0,
        ipAddress: data.ip_address,
        customerId: +userId || +tempId,
        macAddress: '00-00-00-00-00-00',
        location: `${data?.city}, ${data?.region}, ${data?.country}, ${data?.postal_code}`,
      },
    };
    try {
      await moveToWishlist(requestObject);
      fetchWishlistData();
    } catch (error) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description: sendErrorMessage(error),
          isAlertModalOpen: true,
        }),
      );
    }
  };

  const fetchWishlistData = async () => {
    const wishlistData = await getWishlist(+userId);

    dispatch(setWishlistData(wishlistData));
  };
  const removeFromWishlist = async (wishlistId: number) => {
    try {
      const removed = await removeWishlist(wishlistId);
      if (removed) {
        setWishListId(0);
        fetchWishlistData();
      }
    } catch (error) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description: sendErrorMessage(error),
          isAlertModalOpen: true,
        }),
      );
    }
  };

  async function handleDebounceFnForQuantity(
    attributeOptionId: number,
    cartLogoPersonId: number,
    quanity: number,
    shoopingCartItemsId: number,
    keyName: string,
  ) {
    let prevQuantity = quantity[keyName];
    //apicall will be here for updating the cart
    const payload = {
      updateCartLinePersonModel: {
        cartLogoPersonId: cartLogoPersonId,
        quantity: quanity === 0 ? 1 : quanity,
        attributeOptionId: attributeOptionId,
        shoopingCartItemsId: shoopingCartItemsId,
      },
    };

    dispatch(showLoader(true));
    try {
      const updatedCartQty = await updateCartQuantity(payload);

      if (quanity === 0) {
        setQuantity({ ...quantity, [keyName]: 1 });
      }
      if (updatedCartQty) {
        const cartRespose = await getCartDetails(+userId || +tempId, false);
        dispatch(showLoader(false));
        if (cartRespose.length > 0) {
          dispatch(addCartData(cartRespose));
        }
      }
    } catch (error) {
      // setQuantity(prevQuantity);
      dispatch(showLoader(false));
      dispatch(
        openAlertModal({
          title: 'Error',
          description: sendErrorMessage(error),
          isAlertModalOpen: true,
        }),
      );
    }
  }

  const removeCartItem = (cartItemId: number) => {
    dispatch(showLoader(true));
    deleteCartItem(cartItemId)
      .then((res) => {
        if (res) {
          const removedProduct = cartData?.find(
            (item) => item?.shoppingCartItemsId === cartItemId,
          );
          const payload = {
            storeId: storeDetail.storeId,
            customerId: userId || 0,
            shoppingCartItemsModel: [
              {
                productId: removedProduct?.productId,
                productName: removedProduct?.productName,
                colorVariants: removedProduct?.attributeOptionValue,
                price: removedProduct?.totalPrice,
                quantity: removedProduct?.totalQty,
              },
            ],
          };
          GoogleAnalyticsTracker('GoogleRemoveFromCartScript', payload);
          getCartDetails(+userId || +tempId, false).then((res) => {
            if (res.length > 0) {
              dispatch(addCartData(res));
            } else {
              dispatch(clearCart());
              if (setCartStatus) setCartStatus('empty');
            }
            dispatch(showLoader(false));
          });
        }
      })
      .catch((err) => {
        dispatch(showLoader(false));
        dispatch(
          openAlertModal({
            title: 'Error',
            description: err,
            isAlertModalOpen: true,
          }),
        );
      });
  };

  const removeItemHandler = (cartItemId: number) => {
    dispatch(
      openAlertModal({
        title: 'Are you sure you want to remove',
        description: '',
        isAlertModalOpen: true,
        isShowButton: true,
        onConfirm: () => removeCartItem(cartItemId),
      }),
    );
  };

  const priceUpdateHandler = (newPrice: string) => {
    setPrice(+newPrice);
    debounceFnForPrice(+newPrice);
  };

  if (status === 'ready') {
    return cases.ready({
      removeItemHandler,
      priceUpdateHandler,
      quantity,
      debounceFnForQuantity,
      addToWishlist,
      removeFromWishlist,
      price,
      wishListId,
      updateQuantity,
      checkCommonName,
    });
  }

  return null;
};

export default CartItemController;
