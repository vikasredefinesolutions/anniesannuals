import dynamic from 'next/dynamic';
import { activeStoreName } from '../../shared/configs';
import React from 'react';
import { Metadata } from 'next';

const DynamicUsdazonesPage: any = dynamic(
  () => import(`../../${activeStoreName}/pages/usdazones`),
);

export const metadata: Metadata = {
  title: 'Find My Zone | Annies Annuals',
  description: 'Find my USDA Zone',
};

export default async function UsdazonesPage() {
  return <DynamicUsdazonesPage />;
}
