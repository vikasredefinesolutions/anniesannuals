import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicOrderDetailPage = dynamic(
  () => import(`../../${activeStoreName}/pages/alerts-communications`),
);

export default function OrderDetails() {
  return <DynamicOrderDetailPage />;
}
