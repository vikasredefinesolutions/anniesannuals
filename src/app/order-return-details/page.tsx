import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicOrderReturnDetailsPage = dynamic(
  () => import(`../../${activeStoreName}/pages/order-return-details`),
);

export default function OrderDetails() {
  return <DynamicOrderReturnDetailsPage />;
}
