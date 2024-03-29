import { SendAsync } from '@/shared/utils/axios';

export interface ProductHistoryDetails {
  productId: number;
  productName: string;
  cultivarName: string;
  ourSku: string;
  productImage: string;
  quantity: number;
  price: number;
  discountPrice: number;
}
export const fetchOrderHistoryDetail = async (
  customerId: number,
  orderId: number,
): Promise<ProductHistoryDetails[]> => {
  const url = `/Order/GetOrderDetailItemsByCustomerOrOrderId/${customerId}/${orderId}.json`;

  const res: ProductHistoryDetails[] = await SendAsync({
    url: url,
    method: 'GET',
  });

  return res;
};
