import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicOrderFreeCatalog = dynamic(
  () => import(`../../${activeStoreName}/pages/orderFreeCatalog`),
);

export default function OrderFreeCatalog() {
  return <DynamicOrderFreeCatalog />;
}
