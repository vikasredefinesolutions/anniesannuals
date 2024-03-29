import { getStaticPageMetaDataForHomePage } from '@/helper/staticfile.helper';
import { Metadata, NextPage } from 'next';
import React from 'react';
import {
  cmsBreadCrumbsArray,
  serveDataFromStaticFile,
} from './[...slug]/slug.helper';
import CmsHtml from '@/components/cmsComponents/CmsHtml';
import { fetchPageComponents, fetchPageType } from '@/api/services/home';
import PageNotFound from '@/shared/Components/PageNotFound';
import dynamic from 'next/dynamic';
import { serverLocalState } from '@/serverLocalState';
const Home2 = dynamic(() => import(`@/stores/annies/pages/Home`), {});

export async function generateMetadata(): Promise<Metadata> {
  const pageMetaData = await getStaticPageMetaDataForHomePage();
  const mediaBaseUrl =
    process.env.NEXT_PUBLIC_MEDIA_URL ||
    process.env.NEXT_PUBLIC_EXTRA_MEDIA_URL_DETAIL_MAIN ||
    process.env.NEXT_PUBLIC_REDEFINE_MEDIA ||
    '';

  return {
    title: pageMetaData?.meta_Title || pageMetaData?.name,
    description: pageMetaData?.meta_Description || pageMetaData?.name,
    openGraph: {
      title:
        pageMetaData?.openGraphTitle ||
        pageMetaData?.meta_Title ||
        pageMetaData?.name,
      description:
        pageMetaData?.openGraphDescription ||
        pageMetaData?.meta_Description ||
        pageMetaData?.name,
      url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}`,
      siteName: 'Annies Annuals',
      images: [
        {
          url: `${mediaBaseUrl}${pageMetaData?.openGraphImagePath}`,
          width: 800,
          height: 600,
        },
        {
          url: `${mediaBaseUrl}${pageMetaData?.openGraphImagePath}`,
          width: 1800,
          height: 1600,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

const HomePage: NextPage = async () => {
  const mainSlug = '/';
  const pageMetaData = await getStaticPageMetaDataForHomePage();
  serverLocalState.set({
    key: 'mainSlug',
    value: 'Home',
  });

  if (pageMetaData.type == 'Topic') {
    const pageData = await serveDataFromStaticFile(mainSlug);
    const breadCrumbs = cmsBreadCrumbsArray(pageMetaData);

    if (pageData.exist) {
      return (
        <CmsHtml
          htmlComponents={pageData.components}
          breadCrumbs={breadCrumbs}
          mainSlug={mainSlug}
        />
      );
    }

    try {
      const components = await fetchPageComponents({
        pageId: pageMetaData?.id,
        type: 'cache',
      });

      return <Home2 pageData={{ components }} isDigitalCatalogVisible />;
    } catch (error) {
      return <PageNotFound type={'Something went wrong'} />;
    }
  }

  return <PageNotFound type={'Something went wrong'} />;
};

export default HomePage;
