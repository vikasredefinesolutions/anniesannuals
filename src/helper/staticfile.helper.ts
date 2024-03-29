import { readFile } from 'fs/promises';
import storeDetails from '../staticData/storeDetails.json';
import adminConfigs from '../staticData/adminConfigs.json';
import homePageMetaData from '../staticData/homePage/pageMetaData.json';
import headerSubMenu from '../staticData/headerSubMenu.json';
import { updateStoreDetails } from '@/api/jsonServices/updateStoreDetails';
import { updateHeaderSubmenu } from '@/api/jsonServices/updateHeaderSubmenu';
import { getAdminConfig } from '@/shared/apis/common/getAdminConfig';
import { getPageType } from '@/shared/apis/store/getPageType';

export type tStoreDetailsFile = typeof storeDetails;
export type tHeaderSubMenuFile = typeof headerSubMenu;
export type tAdminConfigs = typeof adminConfigs;
export type tHomePageMetaData = typeof homePageMetaData;

export const getStaticHeaderSubMenu = async (): Promise<tHeaderSubMenuFile> => {
  const headerSubMenuFile = await readFile(
    process.cwd() + '/src/staticData/headerSubMenu.json',
    'utf-8',
  );

  if (!headerSubMenuFile) throw new Error('Header sub menu file not found');
  const headerSubMenu: tHeaderSubMenuFile = JSON.parse(headerSubMenuFile);
  if (!headerSubMenu) throw new Error('Header sub menu file not found');
  return headerSubMenu;
};

export const getStaticStoreDetails = async (): Promise<tStoreDetailsFile> => {
  const storeDetailsFile = await readFile(
    process.cwd() + '/src/staticData/storeDetails.json',
    'utf-8',
  );

  if (!storeDetailsFile) throw new Error('Store details file not found');
  let storeDetails: tStoreDetailsFile = JSON.parse(storeDetailsFile.toString());
  //
  if (!storeDetails?.storeId || storeDetails?.storeId === 0) {
    storeDetails = await updateStoreDetails();
    await updateHeaderSubmenu();
  }
  //
  return storeDetails;
};

export const getStaticAdminConfigs = async (): Promise<tAdminConfigs> => {
  const adminConfigsFile = await readFile(
    process.cwd() + '/src/staticData/adminConfigs.json',
    'utf-8',
  );

  if (!adminConfigsFile) throw new Error('Admin Config file not found');
  let adminConfigs: tAdminConfigs = JSON.parse(adminConfigsFile.toString());
  //
  if (!adminConfigs?.gardenID || adminConfigs?.gardenID === 0) {
    const storeDetails = await getStaticStoreDetails();
    adminConfigs = await getAdminConfig(storeDetails.storeId, 'GardenId');
  }
  //
  return adminConfigs;
};

export const getStaticPageMetaDataForHomePage =
  async (): Promise<tHomePageMetaData> => {
    const homePageMetaDataFile = await readFile(
      process.cwd() + '/src/staticData/homePage/pageMetaData.json',
      'utf-8',
    );

    if (!homePageMetaDataFile) throw new Error('Admin Config file not found');
    let pageMetaData: tHomePageMetaData = JSON.parse(
      homePageMetaDataFile.toString(),
    );
    //
    if (!pageMetaData?.id || pageMetaData?.id === 0) {
      const storeDetails = await getStaticStoreDetails();
      pageMetaData = await getPageType(storeDetails.storeId, '/');
    }
    //
    return pageMetaData;
  };
