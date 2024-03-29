import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';
import { getOrderByOrderNumber } from '@/shared/apis/orders/getOrderByOrderNumber';
import { IOrderProps } from '@/app/track-your-package/[orderNumber]/page';

const DynamicInvoicePage: React.ComponentType<IOrderProps> = dynamic(
  () => import(`../../../${activeStoreName}/pages/invoice`),
);

export default async function ProductListing({
  params,
}: {
  params: { orderNumber: string };
}) {
  const orderNumber = params.orderNumber;
  const orderDetails = await getOrderByOrderNumber(orderNumber);

  return (
    <DynamicInvoicePage orderNumber={orderNumber} orderDetails={orderDetails} />
  );
}
