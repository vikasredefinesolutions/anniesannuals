import { fetchOrderHistoryList } from '@/shared/apis/orders/fetchOrderHistory';
import {
  ProductHistoryDetails,
  fetchOrderHistoryDetail,
} from '@/shared/apis/orders/fetchOrderHistoryDetail';
import { _Orders } from '@/shared/apis/orders/fetchOrderList';
import { getUserId } from '@/shared/utils/cookie.helper';
import useModel from '@/stores/annies/shared/hooks/use-model';
import { paths } from '@/utils/paths.constant';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';

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
}

interface _Helper {
  showOrdersArr: _Orders[] | [];
  statusBarCssController: (status: string) => string;
  selectedTabs:
    | 'All Orders'
    | 'In Progress'
    | 'Delivered'
    | 'Cancelled'
    | 'Returned';
  setSelectedTabs: React.Dispatch<
    React.SetStateAction<
      'All Orders' | 'In Progress' | 'Delivered' | 'Cancelled' | 'Returned'
    >
  >;
  isOpen: boolean;
  onRequestClose: () => void;
  selectedOrder: string;
}

const OrderDetailsController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [selectedTabs, setSelectedTabs] = useState<
    'All Orders' | 'In Progress' | 'Delivered' | 'Cancelled' | 'Returned'
  >('All Orders');
  const [showOrdersArr, setShowOrderArr] = useState<_Orders[] | []>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const { isOpen, onRequestClose } = useModel(false);
  const userId = getUserId();
  const router = useRouter();
  useEffect(() => {
    checkIfUserLoggedIn();
  }, []);

  const checkIfUserLoggedIn = () => {
    if (!userId) {
      router.push(paths.login);
    } else {
      getOrders();
    }
  };

  const getOrders = async () => {
    setStatus('loading');
    const orderArr = (await fetchOrderHistoryList(Number(userId))).map(
      (item) => ({
        ...item,
        subItems: [] as ProductHistoryDetails[],
      }),
    );
    let promises = orderArr.map((item) => {
      return fetchOrderHistoryDetail(Number(userId), item.orderNumber);
    });
    await Promise.allSettled(promises).then((allOrderSubItems) => {
      allOrderSubItems.map((value, index) => {
        if (value.status === 'fulfilled') {
          orderArr[index].subItems = value?.value;
        }
      });
    });
    setShowOrderArr(orderArr);
    setStatus('ready');
  };

  const statusBarCssController = (status: string) => {
    if (status == 'Processing' || status == 'Refund in progress') {
      return `w-auto inline-block px-[15px] py-[5px] rounded-[5px] text-default-text font-[600] bg-tertiary !text-quaternary`;
    } else if (
      status == 'Delivered' ||
      status == 'Shipped' ||
      status == 'EXPORTED'
    ) {
      return `w-auto inline-block px-[15px] py-[5px] rounded-[5px] text-default-text font-[600] bg-[#EDFFFA] !text-default`;
    } else if (status == 'Refund Completed' || status == 'Cancelled') {
      return `w-auto inline-block px-[15px] py-[5px] rounded-[5px] text-default-text font-[600] bg-[#F2F2F2] !text-[#B3B3B3]`;
    } else {
      return `w-auto inline-block px-[15px] py-[5px] rounded-[5px] text-default-text font-[600] bg-tertiary !text-quaternary`;
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
      showOrdersArr,
      statusBarCssController,
      selectedTabs,
      setSelectedTabs,
      isOpen,
      onRequestClose,
      selectedOrder,
    });
  }

  return null;
};

export default OrderDetailsController;
