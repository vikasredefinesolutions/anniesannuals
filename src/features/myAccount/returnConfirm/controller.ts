import { _CartItem } from '@/shared/apis/cart/fetchCartProducts';
import { confirmReturn } from '@/shared/apis/orders/conirmReturn';
import {
  IReturnItemsProps,
  IReturnItemsRes,
  getConfirmReturnDetails,
} from '@/shared/apis/orders/getConfirmReturnDetails';
import { getOrderByOrderNumber } from '@/shared/apis/orders/getOrderByOrderNumber';
import { getOrderReturnDetail } from '@/shared/apis/orders/getOrderReturnDetail';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { paths } from '@/utils/paths.constant';
import { ReturnOrderSlice } from '@/app/redux/slices/returnOrderSlice';
import { getUserId } from '@/shared/utils/cookie.helper';

interface IConfirmReturnProps {
  returnOrders: _CartItem[];
  refundSummary: IReturnItemsRes | null;
  setRefundSummary: React.Dispatch<
    React.SetStateAction<IReturnItemsRes | null>
  >;
  returnItems: IReturnItemsProps[] | [];
  setReturnItems: React.Dispatch<
    React.SetStateAction<IReturnItemsProps[] | []>
  >;
  confirmReturnOrder: (items: IReturnItemsProps[]) => void;
}

interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (IConfirmReturnProps: IConfirmReturnProps) => ReactElement<any, any>;
  };
}

const ConfirmReturnController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [returnOrders, setReturnOrders] = useState<_CartItem[] | []>([]);
  const [refundSummary, setRefundSummary] = useState<IReturnItemsRes | null>(
    null,
  );
  const dispatch = useAppDispatch();
  const [returnItems, setReturnItems] = useState<IReturnItemsProps[] | []>([]);
  const [cartId, setCartId] = useState<number>(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = getUserId();
  const { returnOrederData } = useAppSelector((state) => state.orderReturn);

  const orderNumber = searchParams.get('orderNumber');

  useEffect(() => {
    if (!userId) {
      router.push(`${paths.home}`);
    } else {
      if (returnOrederData.length >= 1) {
        getOrderDetails();
      } else {
        router.push(`${paths.orders}`);
      }
    }
  }, []);

  const getOrderDetails = async () => {
    try {
      setStatus('loading');
      const orderDetails = await getOrderByOrderNumber(orderNumber!);
      if (returnOrederData && orderNumber) {
        const selectedReturnCartItem: _CartItem[] = [];
        returnOrederData.map((cartId: ReturnOrderSlice) => {
          orderDetails.shoppingCartViewModels.find((cartItem: _CartItem) => {
            if (cartItem.shoppingCartItemsId === cartId.cartId) {
              cartItem.totalQty = cartId.qty;
              selectedReturnCartItem.push(cartItem);
            }
          });
        });

        setReturnOrders(selectedReturnCartItem);
        const orderReturnDetails = await getOrderReturnDetail(
          +orderNumber,
          +returnOrederData[0].cartId,
        );
        setCartId(orderReturnDetails?.cartId);

        let returnItemQuantities = selectedReturnCartItem.map(
          (item: _CartItem) => {
            return {
              shoppingCartItemID: item?.shoppingCartItemsId,
              quantity: item?.totalQty,
            };
          },
        );
        const confirmReturnDetails = await getConfirmReturnDetails(
          +orderNumber,
          cartId,
          returnItemQuantities,
        );
        setRefundSummary(confirmReturnDetails);
        setReturnItems(confirmReturnDetails?.returnItems);
      }
    } catch (err) {
      console.log(err, '<----Err is shown here');
    } finally {
      setStatus('ready');
    }
  };

  const confirmReturnOrder = async (items: IReturnItemsProps[]) => {
    try {
      items.map((item: IReturnItemsProps) => {
        if (!item.returnItemMessage) {
          dispatch(
            openAlertModal({
              title: 'Error',
              description: 'Please select reason for return',
              isAlertModalOpen: true,
            }),
          );

          throw new Error('Please select reason for return');
        }
      });
      let payload = { ...refundSummary, returnItems: items };
      console.log(payload);
      await confirmReturn(payload);
      dispatch(
        openAlertModal({
          title: 'Success',
          description: 'Item(s) returned successfully',
          isAlertModalOpen: true,
        }),
      );
      router.push(paths.orders);
    } catch (err) {
      console.log(err, '<-----Error occured here');
    } finally {
      setStatus('ready');
    }
  };

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready({
      returnOrders,
      refundSummary,
      setRefundSummary,
      returnItems,
      setReturnItems,
      confirmReturnOrder,
    });
  }

  return null;
};

export default ConfirmReturnController;
