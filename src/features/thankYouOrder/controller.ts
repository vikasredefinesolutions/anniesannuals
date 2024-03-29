'use client';
import { clearCart } from '@/app/redux/slices/cartSlice';
import { showLoader } from '@/app/redux/slices/commonSlice';
import {
  IProductOrderDetail,
  _OrderDetails,
  getOrderByOrderNumber,
} from '@/shared/apis/orders/getOrderByOrderNumber';
import { getTempUserId, getUserId } from '@/shared/utils/cookie.helper';
import { PixelTracker } from '@/shared/utils/facebookPixel';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import storeDetails from '@/staticData/storeDetails.json';
import { paths } from '@/utils/paths.constant';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomFields } from '../cart/cartItemController/type';
interface _ThanYouHelpers {
  orderNumber: string | null;
  orderDetails: _OrderDetails | null;
  checkCommonName: (customField: CustomFields[]) => string;
}

type _Props = {
  cases: {
    loading: () => ReactElement<any, any>;
    ready: (helpers: _ThanYouHelpers) => ReactElement<any, any>;
  };
};

const ThankYouOrderController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>(
    'loading',
  );
  const router = useRouter();
  const [orderDetails, setOrderDetails] = useState<_OrderDetails | null>(null);
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const dispatch = useDispatch();
  const userId = getUserId();
  const tempId = getTempUserId();

  useEffect(() => {
    dispatch(clearCart());
    fetchOrderDetails();
  }, []);
  const TempId = searchParams.get('temp') || 'null';
  const empId = searchParams.get('emp') || 'null';
  const showThankyoupage1 = (orderDetail: IProductOrderDetail) => {
    if (TempId != 'null' && TempId != '0') {
      return +TempId! !== orderDetail.customerID;
    } else if (empId != 'null') {
      return orderDetail!?.employeeID !== +empId!;
    } else {
      return +userId! !== orderDetail!?.customerID;
    }
  };

  const fetchOrderDetails = async () => {
    try {
      if (orderNumber && (userId || tempId)) {
        const orderDetail = await getOrderByOrderNumber(orderNumber);
        if (showThankyoupage1(orderDetail.orderDetails)) {
          router.push(paths.home);
        }

        let filterProducts = orderDetail?.shoppingCartViewModels.reduce(
          (acc: any, curr: any) => {
            return {
              productIds: [...acc.productIds, curr.productId],
              productNames: [...acc.productNames, curr.productName],
              productPrices: acc.productPrices + curr.totalPrice,
            };
          },
          { productIds: [], productNames: [], productPrices: 0 },
        );

        const eventPayload = {
          storeId: storeDetails?.storeId,
          customerId: userId || tempId,
          orderId: orderDetail?.orderDetails?.id,
          orderedShoppingCartItems: orderDetail?.shoppingCartViewModels.map(
            (item) => ({
              productId: item.productId,
              productName: item.productName,
              colorVariants: item.attributeOptionValue || '',
              price: item.totalPrice || 0,
              quantity: item.totalQty,
            }),
          ),
        };
        const pixelPayload = {
          value: filterProducts?.productPrices,
          currency: 'USD',
          content_name: 'Thank You Page',
          content_type: 'product',
          content_ids: filterProducts?.productIds,
          num_items: orderDetail.shoppingCartViewModels.length,
        };
        PixelTracker('track', 'Purchase', pixelPayload);
        GoogleAnalyticsTracker('GoogleGetPurchaseJsonScript', eventPayload);

        setOrderDetails(orderDetail);
        setStatus('ready');
      } else {
        router.push(paths.home);
      }
    } catch (err) {
      throw new Error(`Something went wrong ${err}`);
    } finally {
      dispatch(showLoader(false));
    }
  };

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

  // const paymentMethodVerify = (orderDetail: _OrderDetails | null) => {
  //   if ( ) {

  //   }
  //   return ' ';
  // };

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'ready') {
    return cases.ready({
      orderNumber,
      orderDetails,
      checkCommonName,
    });
  }
};

export default ThankYouOrderController;
