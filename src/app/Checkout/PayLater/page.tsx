import dynamic from 'next/dynamic';

import { activeStoreName } from '@/shared/configs';

const DynamicPaylaterPage = dynamic(
  () => import(`../../../${activeStoreName}/pages/paylater`),
);

export default function Paylater() {
  return <DynamicPaylaterPage />;
}
