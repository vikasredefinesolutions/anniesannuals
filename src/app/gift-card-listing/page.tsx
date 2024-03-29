import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicGiftCardListingPage = dynamic(
  () => import(`../../${activeStoreName}/pages/gift-cards-listing`),
);

export default function GiftCard() {
  return <DynamicGiftCardListingPage />;
}
