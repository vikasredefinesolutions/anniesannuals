import { getFeaturedProductitemsByTagnameandsename } from '@/api/services/home';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import {
  addCartData,
  updateCartQuantity,
  updateCouponDetails,
  updateOrderTotal,
} from '@/app/redux/slices/cartSlice';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';
import { addPromoCode } from '@/shared/apis/cart/addPromoCode';
import {
  _CartItem,
  getCartDetails,
} from '@/shared/apis/cart/fetchCartProducts';
import { ICmsStoreThemeConfig } from '@/shared/types/cmsThemeConfig';
import {
  USER_ID,
  getStoreId,
  getTempUserId,
  getUserId,
} from '@/shared/utils/cookie.helper';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import { ShowCategoryValue } from '@/types/home';
import { getCookie } from 'cookies-next';
import React, { ReactElement, useEffect, useState } from 'react';

export interface _CartSummaryProps {
  applyDiscountCouponHandler: (
    avilableInLocalStorage: boolean,
    discountCoupon?: string,
  ) => void;
  removeCouponCodeHandler: (avilableInLocalStorage: boolean) => void;
  couponChangeHandler: (couponName: string) => void;
  coupon: string;
  couponCode: string;
  showDiscountInput: boolean;
  setShowDiscountInput: React.Dispatch<React.SetStateAction<boolean>>;
  openBrandDescription: boolean;
  setOpenBrandDescription: React.Dispatch<React.SetStateAction<boolean>>;
  showPromotionalText: boolean;
  setShowPromotionalText: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface _ReadyProps extends _CartSummaryProps {
  cartData: _CartItem[];
  buyItWithProductData: ShowCategoryValue[];
  savedForLater: ShowCategoryValue[];
  isEmployeeLoggedIn: boolean;
  setStatus: React.Dispatch<
    React.SetStateAction<'loading' | 'empty' | 'ready'>
  >;
}

interface _Props {
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (_ReadyProps: _ReadyProps) => ReactElement<any, any>;
  };
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}

const CartController: React.FC<_Props> = ({
  cases,
  cmsStoreThemeConfigsViewModel,
}) => {
  const { wishlistData } = useAppSelector((state) => state.user);

  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>(
    'loading',
  );
  const storeId = getStoreId();

  const [buyItWithProductData, setBuyItWithProductData] = useState([]);
  const [savedForLater, setSavedForLater] = useState<any>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [showDiscountInput, setShowDiscountInput] = useState<boolean>(false);
  const [openBrandDescription, setOpenBrandDescription] =
    useState<boolean>(false);
  const [showPromotionalText, setShowPromotionalText] =
    useState<boolean>(false);
  const { coupon } = useAppSelector((state) => state.cart.couponDetails);

  const dispatch = useAppDispatch();
  const { cartData } = useAppSelector((state) => state.cart);

  const userId = getUserId();
  const tempId = getTempUserId();
  const isEmployeeLoggedIn = false;

  const getShippigChargeAndCartData = async (buyItWithSeName: string) => {
    if (buyItWithSeName) {
      await getFeaturedProductitemsByTagnameandsename({
        sename: buyItWithSeName,
        type: 'manual',
        storeId: storeId || 5,
        maximumItemsForFetch: 5,
        tagName: 'string',
      })
        .then((response) => {
          if (response) {
            const buyItWithData = response.map((item: any) => ({
              ...item,
              image: item?.imageUrl,
              name: item?.productName,
              seName: item?.productSEName,
            }));
            setBuyItWithProductData(buyItWithData);
          }
        })
        .catch((err) => {
          dispatch(
            openAlertModal({
              title: 'Error',
              description: err,
              isAlertModalOpen: true,
            }),
          );
        });
    }

    // if (shippingChargeType && growingZone.zipCode) {
    //   const payload = {
    //     shippingMethodModel: {
    //       city: growingZone.cityName,
    //       state: growingZone.stateName,
    //       country: 'United States',
    //       zipCode: growingZone.zipCode,
    //       customerID: +userId,
    //       storeId: storeId,
    //       ordertotalwithoutshipppingcharge: orderTotal,
    //       shippingType: shippingChargeType,
    //     },
    //   };
    //   await GetShippingmethod(payload).then((res) => {
    //     dispatch(addShippingChargeList(res));
    //   });
    // }

    // await getShippingChargeList(storeId || 5).then((res) => {
    //   setShippingChargeList(res);
    //   dispatch(addShippingChargeList(res));
    // });

    await getCartDetails(+userId || +tempId, false)
      .then((res) => {
        if (res && res.length > 0) {
          const payload = {
            storeId: storeId || 5,
            customerId: userId || 0,
            value: '',
            coupon: '',
            shoppingCartItemsModel: res?.map((item) => ({
              productId: item.productId,
              productName: item?.productName,
              colorVariants: item?.attributeOptionValue,
              price: item.totalPrice,
              quantity: item.totalQty,
            })),
          };

          GoogleAnalyticsTracker('GoogleViewCartScript', payload);

          dispatch(addCartData(res));
          calculateSummary(res);
          setStatus('ready');
        } else {
          setStatus('empty');
        }
      })
      .catch((err) => {
        dispatch(
          openAlertModal({
            title: 'Error',
            description: err,
            isAlertModalOpen: true,
          }),
        );
      });
  };

  const calculateSummary = (item: _CartItem[]) => {
    let orderSubTotal = 0,
      orderTotal = 0,
      discount = 0,
      length = 0,
      shippingCharge = 0;

    const customerId = getCookie(USER_ID);
    item.forEach((item) => {
      length = length + item.totalQty;
      orderSubTotal = orderSubTotal + item.totalPrice;
    });

    dispatch(updateCartQuantity({ quantity: length }));

    // ShippingChargeList.forEach((res) => {
    //   if (
    //     orderSubTotal >= res.orderTotalMin &&
    //     orderSubTotal <= res.orderTotalMax
    //   ) {
    //     shippingCharge = res.charge;
    //   }
    // });

    orderTotal = orderSubTotal + shippingCharge;
    dispatch(
      updateOrderTotal({
        orderSubTotal: orderSubTotal,
        shippingCharge: shippingCharge,
        tax: 0,
        orderTotal: shippingCharge + orderSubTotal,
      }),
    );
    const discountCoupon = localStorage.getItem('discountCoupon');
    if (discountCoupon) {
      applyDiscountCouponHandler(true, discountCoupon);
    }
  };

  const applyDiscountCouponHandler = async (
    avilableInLocalStorage: boolean,
    discountCoupon?: string,
  ) => {
    dispatch(showLoader(true));
    const couponObject = {
      promotionsModel: {
        customerId: +userId || +tempId,
        couponCode: discountCoupon || couponCode,
        storeId: storeId || 5, // need to make it dynamic
        taxCost: 0,
        shippingCost: 0,
      },
    };

    await addPromoCode(couponObject)
      .then((res) => {
        if ('discountAmount' in res) {
          setCouponInLocalStorage(res.couponCode);

          handleIfCouponIsValid(res, avilableInLocalStorage);
          return;
        }
        handleIfCouponIsNotValid(res, avilableInLocalStorage);
      })
      .catch((errors) =>
        handleIfCouponIsNotValid(errors, avilableInLocalStorage),
      )
      .finally(() => dispatch(showLoader(false)));
  };

  const handleIfCouponIsValid = (
    details: {
      couponCode: string;
      percentage: string;
      discountAmount: string;
      isFreeShipping: boolean;
      taxCost: string;
      shiipingCost: string;
    },
    avilableInLocalStorage: boolean,
  ) => {
    dispatch(
      updateCouponDetails({
        coupon: details.couponCode,
        amount: details.discountAmount,
        percentage: details.percentage,
        todo: 'ADD',
      }),
    );
    if (!avilableInLocalStorage) {
      dispatch(
        openAlertModal({
          title: 'Success',
          description: 'Coupon Applied Successfully',
          isAlertModalOpen: true,
        }),
      );
    }

    setCouponCode('');
  };

  const handleIfCouponIsNotValid = (
    errors: { [key: string]: string },
    avilableInLocalStorage: boolean,
  ) => {
    if (errors) {
      const objToArr = Object?.values(errors);
      if (objToArr.length === 0) return;
      // cart_promoCode('REMOVE_PROMO_CODE');

      if ('promotionsModel.CustomerId' in errors) {
        if (!avilableInLocalStorage) {
          dispatch(
            openAlertModal({
              title: 'Error',
              description: objToArr[0],
              isAlertModalOpen: true,
            }),
          );
        }

        setTimeout(() => {
          setCouponCode('');
        }, 1500);
        return;
      }
      // if No errors matched
      if (!avilableInLocalStorage) {
        setTimeout(() => {
          dispatch(
            openAlertModal({
              title: 'Error',
              description: objToArr[0],
              isAlertModalOpen: true,
            }),
          );
        }, 1500);
      }
      setTimeout(() => {
        setCouponCode('');
      }, 2500);
      if (avilableInLocalStorage) {
        removeCouponCodeHandler(avilableInLocalStorage);
      }
    }
  };

  const removeCouponCodeHandler = (avilableInLocalStorage: boolean) => {
    localStorage.removeItem('discountCoupon');
    dispatch(
      updateCouponDetails({
        coupon: '',
        amount: '0',
        percentage: '0',
        todo: 'REMOVE',
      }),
    );

    if (!avilableInLocalStorage) {
      dispatch(
        openAlertModal({
          title: 'Success',
          description: 'Removed Coupon Successfully',
          isAlertModalOpen: true,
        }),
      );
    }
  };
  const setCouponInLocalStorage = (couponCode: string) => {
    localStorage.setItem('discountCoupon', couponCode);
  };

  const couponChangeHandler = (couponName: string) => {
    setCouponCode(couponName);
  };

  useEffect(() => {
    let buyItWithSeName = '';
    if (cmsStoreThemeConfigsViewModel) {
      const cartPageConfigData = cmsStoreThemeConfigsViewModel.find(
        (configItem: ICmsStoreThemeConfig) =>
          configItem.config_name === 'cartPage',
      );

      if (cartPageConfigData?.config_value) {
        const cartPageConfigValue = JSON.parse(
          cartPageConfigData?.config_value,
        );
        buyItWithSeName = cartPageConfigValue.buy_it_with.join(',');
      }
    }

    getShippigChargeAndCartData(buyItWithSeName);
  }, []);

  useEffect(() => {
    if (wishlistData.length > 0) {
      const savedForLaterData = wishlistData.map((item) => ({
        ...item,
        image: item?.colorLogoUrl,
        name: item?.productName,
        msrp: item?.price,
      }));
      setSavedForLater(savedForLaterData);
    }
  }, [wishlistData]);

  useEffect(() => {
    if (cartData.length > 0) {
      calculateSummary(cartData);
    }
  }, [cartData]);

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready({
      cartData,
      isEmployeeLoggedIn,
      removeCouponCodeHandler,
      applyDiscountCouponHandler,
      couponChangeHandler,
      coupon,
      couponCode,
      setShowDiscountInput,
      showDiscountInput,
      setOpenBrandDescription,
      openBrandDescription,
      setShowPromotionalText,
      showPromotionalText,
      buyItWithProductData,
      savedForLater,
      setStatus,
    });
  }

  return null;
};

export default CartController;
