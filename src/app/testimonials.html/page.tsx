import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicTestimonialsPage = dynamic(
  () => import(`../../${activeStoreName}/pages/testimonials`),
);

export default function Newsletters() {
  return <DynamicTestimonialsPage />;
}
