/* eslint-disable react-hooks/exhaustive-deps */

import {
  addCartData,
  addShippingChargeList,
  clearShippingInformation,
} from '@/app/redux/slices/cartSlice';

import { checkoutActions } from '@/app/redux/slices/checkoutSlice';

import { useAppSelector } from '@/app/redux/hooks';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import {
  getCartDetails
} from '@/shared/apis/cart/fetchCartProducts';
import { GetShippingmethod } from '@/shared/apis/cart/getShippingChargesList';
import { FetchCustomerStoreCredits } from '@/shared/apis/storeCredits/fetchCustomerCredit';
import {
  getShippingType,
  getStoreId,
  getTempUserId,
  getUserId,
} from '@/shared/utils/cookie.helper';
import { PixelTracker } from '@/shared/utils/facebookPixel';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import storeDetails from '@/staticData/storeDetails.json';
import { sendErrorMessage } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface _Props {
  cases: {
    loading: () => ReactElement<any, any>;
    ready: (props: _ReadyProps) => ReactElement<any, any>;
  };
}

interface _ReadyProps {
  returnToCart: () => void;
}

const CheckoutController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>(
    'loading',
  );
  const userId = getUserId();
  const storeId = getStoreId();
  const { orderTotal } = useAppSelector((state) => state.cart);
  const { growingZone } = useAppSelector((state) => state.common);
  const tempId = getTempUserId();
  const dispatch = useDispatch();
  const shippingChargeType = getShippingType();
  const router = useRouter();
  const {
    update_GuestUserInformation,
    update_CheckoutAddress,
    clear_Checkout,
    update_PaymentDetails,
  } = checkoutActions;

  const getCartAndShippingChargeList = async () => {
    if (shippingChargeType && growingZone.zipCode && orderTotal && userId) {
      const payload = {
        shippingMethodModel: {
          city: growingZone.cityName,
          state: growingZone.stateName,
          country: 'United States',
          zipCode: growingZone.zipCode,
          customerID: +userId,
          storeId: storeId,
          ordertotalwithoutshipppingcharge: orderTotal,
          shippingType: shippingChargeType,
        },
      };

      await GetShippingmethod(payload).then((res) => {
        dispatch(addShippingChargeList(res));
      }).catch(err => {
        dispatch(
          openAlertModal({
            title: 'Error',
            description: err,
            isAlertModalOpen: true,
          }),
        )
      });
    }
    if (tempId) {
      dispatch(
        update_GuestUserInformation({ type: 'GuestUserCheckout', value: true }),
      );
    }
    await getCartDetails(+userId || +tempId, false)
      .then((res) => {
        if (res && res.length > 0) {
          let shoppingCartItemsModel = res?.map((item) => ({
            productId: item.productId,
            productName: item?.productName,
            colorVariants: item?.attributeOptionValue,
            price: item.totalPrice,
            quantity: item.totalQty,
          }));
          let filterProducts = res.reduce(
            (acc: any, curr: any) => {
              return {
                productIds: [...acc.productIds, curr.productId],
                productNames: [...acc.productNames, curr.productName],
                productPrices: acc.productPrices + curr.totalPrice,
              };
            },
            { productIds: [], productNames: [], productPrices: 0 },
          );

          const discountCoupon = localStorage.getItem('discountCoupon');
          const payload = {
            storeId: storeDetails?.storeId,
            value:
              res?.reduce((acc, curr) => (acc += curr?.totalPrice), 0) || '',
            coupon: discountCoupon || '',
            shoppingCartItemsModel: shoppingCartItemsModel,
          };
          const pixelPayload = {
            value: filterProducts?.productPrices,
            currency: 'USD',
            content_name: 'Checkout',
            content_category: 'snippets',
            content_ids: filterProducts?.productIds,
            num_ids: res.length,
          };
          PixelTracker('track', 'InitiateCheckout', pixelPayload);
          GoogleAnalyticsTracker('GoogleBeginCheckOutScript', payload);
          dispatch(addCartData(res));
          setStatus('ready');
        } else {
          router.push(paths.cart);
        }
      })
      .catch((err) => {
        sendErrorMessage(err);
        router.push(paths.cart);
      });
    let payload = {
      storeId: storeDetails.storeId,
      customerId: +userId || +tempId,
    };

    const creditRes = await FetchCustomerStoreCredits(payload);
    if (creditRes) {
      dispatch(
        update_PaymentDetails({
          method: 'SAVE_CREDITS',
          value: {
            giftCardWalletBalance: creditRes.giftCardWalletBalance,
            storeCredits: creditRes.storeCreditRefundBalance,
          },
        }),
      );
    }
  };

  const returnToCart = () => {
    router.push(paths.cart);
    dispatch(
      update_CheckoutAddress({
        type: 'CHECKOUT_ADDRESS_IS_SAVED',
        value: false,
      }),
    );
  };

  useEffect(() => {
    getCartAndShippingChargeList();

    return () => {
      dispatch(update_GuestUserInformation('CLEAN_UP'));
      dispatch(clear_Checkout());
      dispatch(clearShippingInformation());
    };
  }, []);

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'ready') {
    return cases.ready({
      returnToCart,
    });
  }

  return null;
};

export default CheckoutController;
