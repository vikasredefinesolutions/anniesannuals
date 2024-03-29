import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicEmailResetPasswordPage = dynamic(
  () => import(`../../${activeStoreName}/pages/reset-password`),
);

export default function ProductListing() {
  return <DynamicEmailResetPasswordPage />;
}
