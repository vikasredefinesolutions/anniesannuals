import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicNewslettersPage = dynamic(
  () => import(`../../${activeStoreName}/pages/newsletter-archive`),
);

export default function Newsletters() {
  return <DynamicNewslettersPage />;
}
