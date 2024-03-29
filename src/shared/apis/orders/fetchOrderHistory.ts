import { SendAsync } from '@/shared/utils/axios';
import { _Orders } from './fetchOrderList';

export const fetchOrderHistoryList = async (
  customerId: number,
  orderId: number = 0,
): Promise<_Orders[]> => {
  const url = `/Order/GetOrderDetailByCustomerOrOrderId/${customerId}/${orderId}.json`;

  const res: _Orders[] = await SendAsync({
    url: url,
    method: 'GET',
  });

  return res;
};
