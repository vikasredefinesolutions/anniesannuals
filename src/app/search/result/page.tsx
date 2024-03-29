import {
  _GetSearchInput,
  getGlobalSearchInput,
} from '@/shared/apis/header/globalSearch';
import { activeStoreName } from '@/shared/configs';
import { getStoreId } from '@/shared/utils/cookie.helper';
import dynamic from 'next/dynamic';

interface _Props {
  productData: _GetSearchInput[] | null;
  text: string;
}
const DynamicSearchProductListing: React.ComponentType<_Props> = dynamic(
  () => import(`../../../${activeStoreName}/pages/searchProductListing`),
);

export default async function ResultSummary({
  searchParams: { q = '' },
}: {
  searchParams: { q: string };
}) {
  const storeId = getStoreId();
  const payload = {
    storeId: storeId,
    content: q,
    isFull: true,
    isDiscontinue: false,
    hoverCount: 20,
  };
  let data = null;

  try {
    data = await getGlobalSearchInput(payload);
  } catch (err) {
    console.log(err, 'Error');
  }

  return (
    <DynamicSearchProductListing productData={data} text={q} />
    /* Integrated Search Page for Klevu
    <div className='bg-[#FFF0ED]'>
      <div className='container-fluid md:container mx-auto'>
        <div className='container mx-auto relative'>
          <div className='text-left'>
            <h1 className='text-2xl-text my-[10px] mt-[30px] font-sub font-bold relative inline-block'>
              Search results for "{q}"
            </h1>
          </div>
          <div className='klevuLanding'></div>
        </div>
      </div>
    </div>
    */
  );
}
