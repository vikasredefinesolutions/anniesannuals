import dynamic from 'next/dynamic';
import { activeStoreName } from '../../shared/configs';
import React from 'react';
import { Metadata } from 'next';
import { getStaticHeaderSubMenu } from '@/helper/staticfile.helper';

const DynamicUsdazonesPage: any = dynamic(
  () => import(`../../${activeStoreName}/pages/usdazones`),
);

export const metadata: Metadata = {
  title: 'Find My Zone | Annies Annuals',
  description: 'Find my USDA Zone',
};

export default async function UsdazonesPage() {
  const headerSubMenu = await getStaticHeaderSubMenu();

  return <DynamicUsdazonesPage headerSubMenu={headerSubMenu} />;
}
