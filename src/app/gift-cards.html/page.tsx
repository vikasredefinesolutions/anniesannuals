import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';

const DynamicGiftCardPage = dynamic(
  () => import(`../../${activeStoreName}/pages/gift-cards`),
);

export default function GiftCard() {
  return <DynamicGiftCardPage />;
}
