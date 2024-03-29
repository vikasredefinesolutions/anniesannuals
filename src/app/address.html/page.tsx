import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicAccountSectionAddressPage = dynamic(
  () => import(`../../${activeStoreName}/pages/address`),
);

export default function AddressPage() {
  return <DynamicAccountSectionAddressPage />;
}
