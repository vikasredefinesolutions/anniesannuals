import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicDeleteAccountPage = dynamic(
  () => import(`../../${activeStoreName}/pages/delete-account`),
);

export default function ProductListing() {
  return <DynamicDeleteAccountPage />;
}
