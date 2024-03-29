import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicAccountSectionAddressPage = dynamic(
  () => import(`../../${activeStoreName}/pages/accountSettings`),
);

export default function AccountSettings() {
  return <DynamicAccountSectionAddressPage />;
}
