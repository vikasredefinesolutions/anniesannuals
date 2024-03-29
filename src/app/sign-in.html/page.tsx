import dynamic from 'next/dynamic';
import { activeStoreName } from '../../shared/configs';
import React from 'react';
import { Metadata } from 'next';
import { getStaticPageMetaDataForHomePage } from '@/helper/staticfile.helper';

const DynamicSignInPage: any = dynamic(
  () => import(`../../${activeStoreName}/pages/SignIn`),
);

export async function generateMetadata(): Promise<Metadata> {
  const pageMetaData = await getStaticPageMetaDataForHomePage();
  return {
    title: pageMetaData?.meta_Title || pageMetaData?.name,
    description: pageMetaData?.meta_Description,
    openGraph: {
      title: 'Sign-In',
      description: 'Sign-In',
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}`,
      siteName: 'Annies Annuals',
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function SignInPage() {
  return <DynamicSignInPage />;
}
