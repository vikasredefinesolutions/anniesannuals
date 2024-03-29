import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicDashboardPage = dynamic(
  () => import(`../../${activeStoreName}/pages/dashboard`),
);

export default function Checkout() {
  return <DynamicDashboardPage />;
}
