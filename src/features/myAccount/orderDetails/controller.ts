import { useAppSelector } from '@/app/redux/hooks';
import { addCartData } from '@/app/redux/slices/cartSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { addToCart } from '@/shared/apis/cart/addToCart';
import {
  _CartItem,
  getCartDetails,
} from '@/shared/apis/cart/fetchCartProducts';
import { _Orders, fetchOrderList } from '@/shared/apis/orders/fetchOrderList';
import { getUserId } from '@/shared/utils/cookie.helper';
import { GoogleAnalyticsTracker } from '@/shared/utils/googleAnalytics';
import storeDetails from '@/staticData/storeDetails.json';
import useModel from '@/stores/annies/shared/hooks/use-model';
import { getLocation } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (helper: _Helper) => ReactElement<any, any>;
  };
}

interface orderType {
  totalOrder: _Orders[] | [];
  inProgress: _Orders[] | [];
  delivered: _Orders[] | [];
  cancelled: _Orders[] | [];
  returned: _Orders[] | [];
  refunded: _Orders[] | [];
}

interface _Helper {
  showOrdersArr: _Orders[] | [];
  ordersList: orderType;
  statusBarCssController: (status: string) => string;
  selectedTabs:
    | 'All Orders'
    | 'In Progress'
    | 'Delivered'
    | 'Cancelled'
    | 'Returned'
    | 'Refunded';
  setSelectedTabs: React.Dispatch<
    React.SetStateAction<
      | 'All Orders'
      | 'In Progress'
      | 'Delivered'
      | 'Cancelled'
      | 'Returned'
      | 'Refunded'
    >
  >;
  selectedTenure: number;
  setSelectedTenure: React.Dispatch<React.SetStateAction<number>>;
  setOrdersArray: any;
  isOpen: boolean;
  openModel: () => void;
  onRequestClose: () => void;
  searchOrders: (ordersArray: _Orders[] | []) => void;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  removeSearch: () => void;
  handleAddToCart: any;
  buttonConditionFunction: (orderArr: _CartItem[]) => string;
  selectedOrder: string;
  setSelectedOrder: React.Dispatch<React.SetStateAction<string>>;
  isEmployeeLoggedIn: boolean;
}

const OrderDetailsController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [ordersList, setOrdersList] = useState<orderType>({
    totalOrder: [],
    inProgress: [],
    delivered: [],
    cancelled: [],
    returned: [],
    refunded: [],
  });
  const [selectedTabs, setSelectedTabs] = useState<
    | 'All Orders'
    | 'In Progress'
    | 'Delivered'
    | 'Cancelled'
    | 'Returned'
    | 'Refunded'
  >('All Orders');
  const isEmployeeLoggedIn = useAppSelector((state) => state.employee.loggedIn);
  const dispatch = useDispatch();
  const [showOrdersArr, setShowOrderArr] = useState<_Orders[] | []>([]);
  const [selectedTenure, setSelectedTenure] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const { isOpen, openModel, onRequestClose } = useModel(false);
  const userId = getUserId();
  const router = useRouter();
  useEffect(() => {
    checkIfUserLoggedIn();
  }, []);

  useEffect(() => {
    getOrders();
    setOrdersArray(selectedTabs);
  }, [selectedTenure]);

  useEffect(() => {
    setOrdersArray(selectedTabs);
  }, [selectedTabs]);

  const checkIfUserLoggedIn = () => {
    if (!userId) {
      router.push(paths.login);
    } else {
      getOrders();
    }
  };

  const getOrders = async () => {
    setStatus('loading');
    const orderArr = await fetchOrderList(
      storeDetails.storeId,
      userId,
      selectedTenure,
    );
    sortFunctions(orderArr, false);
    setStatus('ready');
  };

  const sortFunctions = (orderArr: any, searchFlag: boolean) => {
    let prevOrder: _Orders[] = [];
    let cancelledOrder: _Orders[] = [];
    let deliveredOrder: _Orders[] = [];
    let ReturnedOrder: _Orders[] = [];
    let refundedOrder: _Orders[] = [];
    orderArr.items.map((res: _Orders) => {
      res.shoppingCartViewModels.map((item: _CartItem, index) => {
        if (item.status === 'Processing') {
          const index = prevOrder.findIndex(
            (ele) => ele.orderNumber === res.orderNumber,
          );

          if (index !== -1) {
            prevOrder[index].shoppingCartViewModels = [
              ...prevOrder[index].shoppingCartViewModels,
              item,
            ];
          } else {
            prevOrder = [
              ...prevOrder,
              {
                ...res,
                shoppingCartViewModels: [item],
              },
            ];
          }
          // setOrdersList(prev =>  ({ ...prev, inProgress: a }));
        } else if (item.status == 'Cancelled') {
          const index = cancelledOrder.findIndex(
            (ele) => ele.orderNumber === res.orderNumber,
          );

          if (index !== -1) {
            cancelledOrder[index].shoppingCartViewModels = [
              ...cancelledOrder[index].shoppingCartViewModels,
              item,
            ];
          } else {
            cancelledOrder = [
              ...cancelledOrder,
              {
                ...res,
                shoppingCartViewModels: [item],
              },
            ];
          }
        } else if (item.status == 'Returned') {
          const index = ReturnedOrder.findIndex(
            (ele) => ele.orderNumber === res.orderNumber,
          );

          if (index !== -1) {
            ReturnedOrder[index].shoppingCartViewModels = [
              ...ReturnedOrder[index].shoppingCartViewModels,
              item,
            ];
          } else {
            ReturnedOrder = [
              ...ReturnedOrder,
              {
                ...res,
                shoppingCartViewModels: [item],
              },
            ];
          }
        } else if (item.status == 'Delivered') {
          const index = deliveredOrder.findIndex(
            (ele) => ele.orderNumber === res.orderNumber,
          );

          if (index !== -1) {
            deliveredOrder[index].shoppingCartViewModels = [
              ...deliveredOrder[index].shoppingCartViewModels,
              item,
            ];
          } else {
            deliveredOrder = [
              ...deliveredOrder,
              {
                ...res,
                shoppingCartViewModels: [item],
              },
            ];
          }
        } else if (
          item.status == 'Cancelled & Refunded' ||
          item.status == 'Partially Refunded'
        ) {
          const index = refundedOrder.findIndex(
            (ele) => ele.orderNumber === res.orderNumber,
          );

          if (index !== -1) {
            refundedOrder[index].shoppingCartViewModels = [
              ...refundedOrder[index].shoppingCartViewModels,
              item,
            ];
          } else {
            refundedOrder = [
              ...refundedOrder,
              {
                ...res,
                shoppingCartViewModels: [item],
              },
            ];
          }
        }
        setOrdersList({
          ...ordersList,
          totalOrder: orderArr.items,
          inProgress: prevOrder,
          cancelled: cancelledOrder,
          delivered: deliveredOrder,
          returned: ReturnedOrder,
          refunded: refundedOrder,
        });
        if (searchFlag) {
          setOrdersArray(
            selectedTabs,
            orderArr.items,
            prevOrder,
            deliveredOrder,
            cancelledOrder,
            ReturnedOrder,
            refundedOrder,
          );
        } else {
          setShowOrderArr(orderArr.items);
        }
      });
    });
  };

  const searchOrders = async (ordersArray: _Orders[] | []) => {
    if (!searchText.trim()) {
      dispatch(
        openAlertModal({
          title: '',
          description: 'Please enter a text to search',
          isAlertModalOpen: true,
        }),
      );
      return;
    }

    const orderArr = await fetchOrderList(
      storeDetails.storeId,
      userId,
      selectedTenure,
      searchText.trim(),
    );

    if (orderArr.items.length === 0) {
      setShowOrderArr([]);
    } else sortFunctions(orderArr, true);
  };

  const removeSearch = () => {
    getOrders();
    setSelectedTabs('All Orders');
  };

  const statusBarCssController = (status: string) => {
    if (status == 'Processing' || status == 'Refund in progress') {
      return `w-auto inline-block px-[15px] py-[5px] rounded-[5px] text-default-text font-[600] bg-tertiary !text-quaternary`;
    } else if (status == 'Delivered' || status == 'Shipped') {
      return `w-auto inline-block px-[15px] py-[5px] rounded-[5px] text-default-text font-[600] bg-[#EDFFFA] !text-default`;
    } else if (status == 'Refund Completed' || status == 'Cancelled') {
      return `w-auto inline-block px-[15px] py-[5px] rounded-[5px] text-default-text font-[600] bg-[#F2F2F2] !text-[#B3B3B3]`;
    } else {
      return `w-auto inline-block px-[15px] py-[5px] rounded-[5px] text-default-text font-[600] bg-tertiary !text-quaternary`;
    }
  };

  const setOrdersArray = (
    tabSelected:
      | 'All Orders'
      | 'In Progress'
      | 'Delivered'
      | 'Cancelled'
      | 'Returned'
      | 'Refunded',
    totalOrder?: _Orders[],
    inProgress?: _Orders[],
    delivered?: _Orders[],
    cancelled?: _Orders[],
    returned?: _Orders[],
    refunded?: _Orders[],
  ) => {
    if (tabSelected == 'All Orders') {
      setShowOrderArr(totalOrder ? totalOrder : ordersList.totalOrder);
    } else if (tabSelected == 'In Progress') {
      setShowOrderArr(inProgress ? inProgress : ordersList.inProgress);
    } else if (tabSelected == 'Delivered') {
      setShowOrderArr(delivered ? delivered : ordersList.delivered);
    } else if (tabSelected == 'Cancelled') {
      setShowOrderArr(cancelled ? cancelled : ordersList.cancelled);
    } else if (tabSelected == 'Returned') {
      setShowOrderArr(returned ? returned : ordersList.returned);
    } else if (tabSelected == 'Refunded') {
      setShowOrderArr(refunded ? refunded : ordersList.refunded);
    }
  };

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
      //TODO: need to add modal later
      dispatch(
        openAlertModal({
          title: 'Error',
          description: error[Object.keys(error)[0]],
          isAlertModalOpen: true,
        }),
      );
    }
  };

  const buttonConditionFunction = (orderArr: _CartItem[]) => {
    if (
      orderArr[0]?.status === 'New' ||
      orderArr[0]?.status === 'Processing' ||
      orderArr[0]?.status === 'Hold' ||
      orderArr[0]?.status === 'Pending' ||
      orderArr[0]?.status === 'Partially Shipped' ||
      orderArr[0]?.status === 'Shipped'
    ) {
      return 'Cancel';
    } else if (orderArr[0]?.status === 'Delivered') {
      return 'Return';
    } else {
      return '';
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
      showOrdersArr,
      ordersList,
      statusBarCssController,
      selectedTabs,
      setSelectedTabs,
      setOrdersArray,
      isOpen,
      openModel,
      onRequestClose,
      selectedTenure,
      setSelectedTenure,
      searchOrders,
      setSearchText,
      removeSearch,
      handleAddToCart,
      buttonConditionFunction,
      selectedOrder,
      setSelectedOrder,
      isEmployeeLoggedIn,
    });
  }

  return null;
};

export default OrderDetailsController;
