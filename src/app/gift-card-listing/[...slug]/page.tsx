import { activeStoreName } from '@/shared/configs';
import dynamic from 'next/dynamic';
import React from 'react';

const DynamicGiftCardDetailsPage = dynamic(
  () => import(`../../../${activeStoreName}/pages/gift-cards-details`),
);

export default function GiftCard() {
  return <DynamicGiftCardDetailsPage />;
}
