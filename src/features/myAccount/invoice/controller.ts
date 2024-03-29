import OrderDetails from '@/app/order-return-details/page';
import { addToCart } from '@/shared/apis/cart/addToCart';
import {
  IUserCookie,
  getUserDetails,
  getUserId,
} from '@/shared/utils/cookie.helper';
import React, { ReactElement, useState } from 'react';
import storeDetails from '@/staticData/storeDetails.json';
import {
  _CartItem,
  getCartDetails,
} from '@/shared/apis/cart/fetchCartProducts';
import { getLocation } from '@/utils/helpers';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import { useRouter } from 'next/navigation';
import { paths } from '@/utils/paths.constant';
import { useDispatch } from 'react-redux';
import { addCartData } from '@/app/redux/slices/cartSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';

interface _ReadyProps {
  userData: IUserCookie | null;
  handleAddToCart: any;
  onClickPrint: () => void;
}
interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (_ReadyProps: _ReadyProps) => ReactElement<any, any>;
  };
}

const InvoiceController: React.FC<_Props> = (_Props) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const router = useRouter();
  const userData = getUserDetails();
  const dispatch = useDispatch();
  const userId = getUserId();
  const { cases } = _Props;

  const handleAddToCart = async (product: _CartItem) => {
    try {
      const payload = {
        addToCartModel: {
          customerId: userId,
          productId: product?.productId,
          storeId: storeDetails?.storeId,
          ipAddress: getLocation().ip_address,

          shoppingCartItemModel: {
            price: product?.price,
            quantity: product?.totalQty,
            // color image details don't get confused with name
            logoTitle: '',
            logogImagePath: product?.attributeOptionValue
              ? product?.attributeOptionValue
              : product?.colorImage,
            // not to touch
            id: 0,
            weight: 0,
            productType: 0,
            discountPrice: 0,
            perQuantity: 0,
            appQuantity: 0,
            status: 0,
            discountPercentage: 0,
            productCustomizationId: 0,
            itemNotes: '',
            isEmployeeLoginPrice: false,
          },
          shoppingCartItemsDetailModels: !product?.attributeOptionId
            ? []
            : [
                {
                  attributeOptionName: 'Color',
                  attributeOptionValue: product?.attributeOptionValue!,
                  attributeOptionId: product?.attributeOptionId!,
                },
              ],
          cartLogoPersonModel: !product?.attributeOptionId
            ? []
            : [
                {
                  id: 0,
                  attributeOptionId: product?.attributeOptionId!,
                  attributeOptionValue: product?.attributeOptionValue!,
                  code: '',
                  price: product?.price!,
                  quantity: product.totalQty,
                  estimateDate: new Date(),
                  isEmployeeLoginPrice: 0,
                },
              ],
          // Static

          isempLogin: false,
          isForm: false,
        },
      };
      const data = await addToCart(payload);
      const cartGaPayload = {
        storeId: storeDetails?.storeId,
        customerId: userId || 0,
        value: product.totalPrice,
        coupon: '',
        shoppingCartItemsModel: [
          {
            productId: product?.productId,
            productName: product?.productName,
            colorVariants: product.attributeOptionId || '',
            price: product.totalPrice,
            quantity: product.totalQty,
          },
        ],
      };

      GoogleAnalyticsTracker('GoogleAddToCartScript', cartGaPayload);
      dispatch(
        openAlertModal({
          title: 'Success',
          description: 'Added to cart successfully',
          isAlertModalOpen: true,
        }),
      );
      getCartDetails(+userId, false)
        .then((res) => {
          if (res && res.length > 0) {
            dispatch(addCartData(res));
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

      router.push(paths.cart);
    } catch (error: any) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description: error[Object.keys(error)[0]],
          isAlertModalOpen: true,
        }),
      );
    }
  };

  const onClickPrint = () => {
    // const content = document.getElementById('printsection')?.innerHTML;
    // const iframe = document.createElement('iframe');
    // document.body.appendChild(iframe);
    // const cssPath = '@/assets/styles/main.css';
    // iframe.contentDocument?.open();
    // iframe.contentDocument?.write(
    //   `<html><head><link rel="stylesheet" href=${cssPath}><body>${content}</body></head></html>`,
    // );
    // iframe.contentDocument?.close();
    // iframe.contentWindow?.focus();
    // iframe.contentWindow?.print();
    // document.body.removeChild(iframe);
  };

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready({ userData, handleAddToCart, onClickPrint });
  }

  return null;
};

export default InvoiceController;
