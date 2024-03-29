import { fetchOrderHistoryList } from '@/shared/apis/orders/fetchOrderHistory';
import { fetchOrderHistoryDetail } from '@/shared/apis/orders/fetchOrderHistoryDetail';
import { activeStoreName } from '@/shared/configs';
import { getUserId } from '@/utils/cookie.helper';
import dynamic from 'next/dynamic';

export interface IOrderProps {
  orderNumber: string;
  orderDetails: any;
  productList: any;
}

const DynamicOrderDetailPage: React.ComponentType<any> = dynamic(
  () => import(`../../../${activeStoreName}/pages/order-history-details`),
);

export default async function OrderDetails({
  params,
}: {
  params: { orderNumber: string };
}) {
  const orderNumber = params.orderNumber;
  const userId = getUserId();
  const orderHistoryList = await fetchOrderHistoryList(Number(userId));
  const orderDetails = orderHistoryList.find(
    (order) => order.orderNumber === Number(orderNumber),
  );
  const subItems = await fetchOrderHistoryDetail(
    Number(userId),
    Number(orderNumber),
  );

  return (
    <DynamicOrderDetailPage
      orderNumber={orderNumber}
      orderDetails={orderDetails}
      productList={subItems}
    />
  );
}
