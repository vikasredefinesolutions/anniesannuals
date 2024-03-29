import { getStaticStoreDetails } from '@/helper/staticfile.helper';
import { ClearCategoryCache } from '@/shared/apis/cache/cache.service';

export async function updateHomePageDetails() {
  const { id: storeID } = await getStaticStoreDetails();
  try {
    //Clear cache before updating CMS components JSON
    await ClearCategoryCache({ storeid: storeID, categoryid: 0 });
    return true;
  } catch (error: any) {
    throw new Error(error?.message || 'Issue while fetching Home Page details');
  }
}
