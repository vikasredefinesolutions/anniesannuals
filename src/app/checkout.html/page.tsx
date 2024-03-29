import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicCheckoutPage = dynamic(
  () => import(`../../${activeStoreName}/pages/checkout`),
);

export default function Checkout() {
  return <DynamicCheckoutPage />;
}
