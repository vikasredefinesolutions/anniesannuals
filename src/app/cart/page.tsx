import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicCartPage = dynamic(
  () => import(`../../${activeStoreName}/pages/cart`),
);

export default function Cart() {
  return <DynamicCartPage />;
}
