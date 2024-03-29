import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';
import { Metadata } from 'next';
import { getStaticPageMetaDataForHomePage } from '@/helper/staticfile.helper';

const DynamicSignUpPage = dynamic(
  () => import(`../../${activeStoreName}/pages/signUp`),
);

export async function generateMetadata(): Promise<Metadata> {
  const pageMetaData = await getStaticPageMetaDataForHomePage();
  return {
    title: pageMetaData?.meta_Title || pageMetaData?.name,
    description: pageMetaData?.meta_Description,
    openGraph: {
      title: 'Sign-Up',
      description: 'Sign-Up',
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}`,
      siteName: 'Annies Annuals',
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default function SignInPage() {
  return <DynamicSignUpPage />;
}
