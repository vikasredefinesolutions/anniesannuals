import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicOrderAndReturnsPage = dynamic(
  () => import(`../../${activeStoreName}/pages/order-history`),
);

export default function OrderAndReturn() {
  return <DynamicOrderAndReturnsPage />;
}
