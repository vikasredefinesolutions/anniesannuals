import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicKlaviyoInfoPage = dynamic(
  () => import(`../../${activeStoreName}/pages/klaviyo-info`),
);

export default function AddressPage() {
  return <DynamicKlaviyoInfoPage />;
}
