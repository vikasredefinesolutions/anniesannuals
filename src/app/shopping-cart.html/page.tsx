import dynamic from 'next/dynamic';
import { activeStoreName } from '@/shared/configs';
import {
  getStaticStoreDetails,
  tStoreDetailsFile,
} from '@/helper/staticfile.helper';

const DynamicCartPage: React.ComponentType<{
  cmsStoreThemeConfigsViewModel: tStoreDetailsFile['cmsStoreThemeConfigsViewModel'];
}> = dynamic(() => import(`../../${activeStoreName}/pages/cart`));

export default async function Cart() {
  const storeDetails: tStoreDetailsFile = await getStaticStoreDetails();
  return (
    <DynamicCartPage
      cmsStoreThemeConfigsViewModel={
        storeDetails['cmsStoreThemeConfigsViewModel']
      }
    />
  );
}
