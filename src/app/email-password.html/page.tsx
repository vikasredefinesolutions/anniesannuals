import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicEmailPasswordPage = dynamic(
  () => import(`../../${activeStoreName}/pages/email-password`),
);

export default function ProductListing() {
  return <DynamicEmailPasswordPage />;
}
