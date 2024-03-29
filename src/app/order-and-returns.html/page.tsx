import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicOrderAndReturnsPage = dynamic(
  () => import(`../../${activeStoreName}/pages/order-return-details`),
);

export default function OrderAndReturn() {
  return <DynamicOrderAndReturnsPage />;
}
