import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';
import { getUserId } from '@/shared/utils/cookie.helper';

const DynamicMyReviewPage = dynamic(
  () => import(`../../${activeStoreName}/pages/myReviews`),
);

export default async function Checkout() {
  return <DynamicMyReviewPage />;
}
