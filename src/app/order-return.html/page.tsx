import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicOrderReturnPage = dynamic(
  () => import(`../../${activeStoreName}/pages/order-return`),
);

export default function OrderReturn() {
  return <DynamicOrderReturnPage />;
}
