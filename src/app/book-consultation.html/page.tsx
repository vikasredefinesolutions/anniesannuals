import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';
import { getCookie } from 'cookies-next';
import { USER_DETAILS } from '@/shared/utils/cookie.helper';

const DynamicBookConsultationPage = dynamic(
  () => import(`../../${activeStoreName}/pages/bookConsultation`),
);

export default function BookConsultation() {
  return <DynamicBookConsultationPage />;
}
