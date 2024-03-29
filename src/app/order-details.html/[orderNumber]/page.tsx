import { IOrderProps } from '@/app/track-your-package/[orderNumber]/page';
import { getOrderByOrderNumber } from '@/shared/apis/orders/getOrderByOrderNumber';
import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicOrderDetailPage: React.ComponentType<IOrderProps> = dynamic(
  () => import(`../../../${activeStoreName}/pages/order-details`),
);

export default async function OrderDetails({
  params,
}: {
  params: { orderNumber: string };
}) {
  const orderNumber = params.orderNumber;
  const orderDetails = await getOrderByOrderNumber(orderNumber);

  return (
    <DynamicOrderDetailPage
      orderNumber={orderNumber}
      orderDetails={orderDetails}
    />
  );
}
