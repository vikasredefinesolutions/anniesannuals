import { access, readFile, writeFile } from 'fs/promises';
import { getMergedStoreDetails } from '../services/store';
import { tAdminConfigs } from '@/helper/staticfile.helper';
import { getAdminConfig } from '@/shared/apis/common/getAdminConfig';
import { tStoreDetailsFile } from '@/helper/staticfile.helper';

export async function updateStoreDetails(
  data: Omit<tStoreDetailsFile, 'storeId'> | null = null,
): Promise<tStoreDetailsFile> {
  const domain = process.env.NEXT_PUBLIC_EXTRACTED_DOMAIN;

  try {
    let response: Omit<tStoreDetailsFile, 'storeId'> | null = data;

    if (!response || !response?.id) {
      if (!domain) throw new Error('Domain not found');
      response = await getMergedStoreDetails({ url: domain });
    }
    //
    if (!response) throw new Error('Error fetching store details');
    if (!response?.id || response?.id === 0) {
      throw new Error('Missing Store ID in store details');
    }
    //
    const storeDetails: tStoreDetailsFile = {
      storeId: response.id,
      ...response,
    };
    //
    await writeFile(
      process.cwd() + '/src/staticData/storeDetails.json',
      JSON.stringify(storeDetails, null, 2),
    );
    //
    return storeDetails;
  } catch (error: any) {
    throw new Error(error?.message || 'Issue while fetching store details');
  }
}

export async function updateAdminConfigs(
  storeId: number,
  type: 'GardenId',
): Promise<tAdminConfigs> {
  const adminConfigs = await getAdminConfig(storeId, type);
  if (!adminConfigs) throw new Error('Error fetching admin configs: ' + type);
  return { gardenID: +adminConfigs.gardenID };
}

export async function readJsonFile(filePath: string) {
  const fileExist = await access(filePath)
    .then(() => true)
    .catch(() => false);

  const cmsJsonFile = fileExist ? await readFile(filePath, 'utf-8') : '{}';

  const cmsJsonData = JSON.parse(cmsJsonFile.toString());

  return {
    data: cmsJsonData,
    success: fileExist,
  };
}
