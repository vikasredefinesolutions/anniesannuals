import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';
import React from 'react';

const DynamicThankYouPage: React.ComponentType<any> = dynamic(
  () => import(`../../${activeStoreName}/pages/thank-you`),
);

export default async function ThankYouPage() {
  return <DynamicThankYouPage />;
}
