import { _GetPageType, fetchPageType } from '../services/home';
import { writeFile } from 'fs/promises';

export const updateHomePageMetaData = async (
  storeId: number,
): Promise<_GetPageType> => {
  try {
    const pageMetaData = await fetchPageType({
      storeId: storeId,
      slug: '/',
    });

    if (!pageMetaData || !pageMetaData?.id)
      throw new Error('No Data found on Home-Page MetaData API.');

    await writeFile(
      process.cwd() + '/src/staticData/homePage/pageMetaData.json',
      JSON.stringify(pageMetaData, null, 2),
    );

    return pageMetaData;
  } catch (error: any) {
    throw new Error(
      error?.message || 'Issue while fetching Home-Page MetaData.',
    );
  }
};
