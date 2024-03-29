import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicConfirmReturn = dynamic(
  () => import(`../../${activeStoreName}/pages/confirmReturn`),
);

export default function Checkout() {
  return <DynamicConfirmReturn />;
}
