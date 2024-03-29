import { fetchPageType } from '@/api/services/home';
import { getStaticStoreDetails } from '@/helper/staticfile.helper';
import PageNotFound from '@/shared/Components/PageNotFound';
import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

if (!process.env.NEXT_PUBLIC_MAIN_DOMAIN) throw new Error('Domain not found');

const PlantViews = async ({
  searchParams,
}: {
  searchParams?: { id?: string };
}) => {
  const { storeId } = await getStaticStoreDetails();

  const id = searchParams?.['id'] || '';
  if (!id) return <PageNotFound type='Not Found' />;

  const pageMetaData = await fetchPageType({
    storeId: storeId,
    slug: 'plants/view/?id=' + id,
  });
  if (pageMetaData.type === '301') {
    redirect(
      process.env.NEXT_PUBLIC_MAIN_DOMAIN + pageMetaData.slug,
      RedirectType.replace,
    );
  } else {
    return <PageNotFound type='Not Found' />;
  }
};

export default PlantViews;
