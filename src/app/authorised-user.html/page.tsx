import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicAccountSectionAddressPage = dynamic(
  () => import(`../../${activeStoreName}/pages/authorised-user`),
);

export default function ProductListing() {
  return <DynamicAccountSectionAddressPage />;
}
