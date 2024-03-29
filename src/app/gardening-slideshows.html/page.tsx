import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicGardenPage = dynamic(
  () => import(`../../${activeStoreName}/pages/gardening-slideshows`),
);

export default function GardenSlideShows() {
  return <DynamicGardenPage />;
}
