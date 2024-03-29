import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicContactUs = dynamic(
  () => import(`../../${activeStoreName}/pages/contactUs`),
);

export default function Checkout() {
  return <DynamicContactUs />;
}
