import React from 'react';
import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';

const DynamicThankYouPage: React.ComponentType<any> = dynamic(
  () => import(`../../${activeStoreName}/pages/thank-you-order`),
);

export default async function ThankYouPage() {
  return <DynamicThankYouPage />;
}
