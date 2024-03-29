import {
  _CartItem,
  getCartDetails,
} from '@/shared/apis/cart/fetchCartProducts';
import {
  _OrderDetails,
  getOrderByOrderNumber,
} from '@/shared/apis/orders/getOrderByOrderNumber';
import { getUserId } from '@/shared/utils/cookie.helper';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import { getLocation } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import { useRouter, useSearchParams } from 'next/navigation';
import storeDetails from '@/staticData/storeDetails.json';
import React, { ReactElement, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { addToCart } from '@/shared/apis/cart/addToCart';
import { addCartData } from '@/app/redux/slices/cartSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { cancelOrderByOrderNumber } from '@/shared/apis/orders/cancelOrder';
import { cancelOrderItems } from '@/shared/apis/orders/cancelOrderItems';
import { addReturnData } from '@/app/redux/slices/returnOrderSlice';

interface IHelpers {
  checkedCheckBox: any;
  setCheckedCheckBox: React.Dispatch<React.SetStateAction<_CartItem[] | []>>;
  orderDetails: _OrderDetails | null;
  cancellOrderFunction: (
    orderItems: _CartItem[] | [],
    deleteOrderApiSelector: boolean,
    orderNumber?: string,
  ) => void;
  handleAddToCart: (product: _CartItem[] | []) => void;
  actionType: string | null;
  setOrderDetails: React.Dispatch<React.SetStateAction<_OrderDetails | null>>;
  cartIdQty: ICartIdQty[];
  setCartIdQty: React.Dispatch<React.SetStateAction<ICartIdQty[] | []>>;
}
interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (IHelpers: IHelpers) => ReactElement<any, any>;
  };
}

export interface ICartIdQty {
  cartId: number;
  qty: number;
}

const OrderAndReturnController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [orderDetails, setOrderDetails] = useState<_OrderDetails | null>(null);
  const [checkedCheckBox, setCheckedCheckBox] = useState<_CartItem[] | []>([]);
  const [cartIdQty, setCartIdQty] = useState<ICartIdQty[] | []>([]);
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const actionType = searchParams.get('type');
  const isEmployeeLoggedIn = useAppSelector((state) => state.employee.loggedIn);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userId = getUserId();

  useEffect(() => {
    if (!userId) {
      router.push(paths.home);
    } else if (!isEmployeeLoggedIn && actionType == 'cancelled') {
      router.push(paths.home);
    } else {
      getOrderDetails();
    }
  }, []);

  const getOrderDetails = async () => {
    setStatus('loading');
    const details = await getOrderByOrderNumber(orderNumber!);
    setOrderDetails(details);
    setStatus('ready');
  };

  const cancellOrderFunction = async (
    orderItems: _CartItem[] | [],
    deleteOrderApiSelector: boolean,
    orderNumber?: string,
  ) => {
    setStatus('loading');

    const resultantArr = cartIdQty.filter((item) =>
      orderItems
        .map((item2) => item2.shoppingCartItemsId)
        .includes(item.cartId),
    );
    try {
      if (actionType == 'return') {
        dispatch(addReturnData(resultantArr));
        const cartItemIdQueryParam = encodeURIComponent(
          JSON.stringify(resultantArr),
        );

        router.push(`${paths.orderConfirmReturn}?orderNumber=${orderNumber}`);
      } else {
        if (deleteOrderApiSelector) {
          const deleteOrder = await cancelOrderByOrderNumber(+orderNumber!);
        } else {
          const cartIds = orderItems.map(
            (elem: _CartItem) => elem.shoppingCartItemsId,
          );
          const deleteOrderItem = await cancelOrderItems(cartIds);
        }
      }
    } catch (error) {
      console.log(error, '<---errors');
    } finally {
      setStatus('ready');
    }
  };

  const handleAddToCart = async (products: _CartItem[] | []) => {
    try {
      await Promise.all(
        products.map(async (product: _CartItem) => {
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
          console.log(payload, 'this is payload');
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
        }),
      );
    } catch (error: any) {
      //TODO: need to add modal later
      dispatch(
        openAlertModal({
          title: 'Error',
          description: error[Object.keys(error)[0]],
          isAlertModalOpen: true,
        }),
      );
    } finally {
      router.push(paths.cart);
    }
  };

  const handlePageChange = () => {
    return {};
  };

  const handleSort = () => {
    return {};
  };
  const handleInStock = () => {
    return {};
  };

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready({
      checkedCheckBox,
      setCheckedCheckBox,
      orderDetails,
      cancellOrderFunction,
      handleAddToCart,
      actionType,
      setOrderDetails,
      cartIdQty,
      setCartIdQty,
    });
  }

  return null;
};

export default OrderAndReturnController;
