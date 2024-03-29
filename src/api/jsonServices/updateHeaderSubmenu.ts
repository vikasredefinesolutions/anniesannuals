import { IHeaderMenuConfig } from '@/shared/types/cmsThemeConfig';
import {
  getStaticStoreDetails,
  tStoreDetailsFile,
} from '@/helper/staticfile.helper';
import { writeFile } from 'fs/promises';
import { fetchCategoriesById } from '@/shared/apis/header/getCategoriesByParentId';

const getNoneContent = async (
  item: tHeaderMainMenu,
): Promise<NoneSubMenuContent | null> => {
  if (item.category === 'topic') {
    return {
      type: Type.None,
      topicId: item.topic_Id,
      title: item.title || 'Topic',
      items: null,
      customCollectionUrl: item?.customCollectionUrl,
      seName: item?.se_Name,
    };
  }

  if (item.category === 'category') {
    return {
      type: Type.None,
      title: item.title || 'Category',
      topicId: item.topic_Id,
      items: null,
      customCollectionUrl: item?.customCollectionUrl,
      seName: item?.se_Name,
    };
  }

  return null;
};

const getDynamicContent = async (
  item: tHeaderMainMenu,
  storeId: number,
): Promise<DynamicSubMenuContent | null> => {
  if (item.category === 'category') {
    const response = await fetchCategoriesById(item.topic_Id, storeId);

    return {
      topicId: item.topic_Id,
      title: item.title || 'Category',
      customCollectionUrl: item?.customCollectionUrl,
      seName: item?.se_Name,
      items: response,
      type: Type.Dynamic,
    };
  }

  return null;
};

const getCustomContent = async (
  item: tHeaderMainMenu,
): Promise<CustomSubMenuContent | null> => {
  if (item.category === 'category') {
    return {
      title: item.title || 'Category',
      customCollectionUrl: item?.customCollectionUrl,
      seName: item?.se_Name,
      items: item.menu_Info,
      topicId: item.topic_Id,
      type: Type.Custom,
    };
  }
  if (item.category === 'topic') {
    return {
      title: item.title || 'Topic',
      customCollectionUrl: item?.customCollectionUrl,
      seName: item?.se_Name,
      topicId: item.topic_Id,
      items: item.menu_Info,
      type: Type.Custom,
    };
  }

  return null;
};

const decideAPIs = async (
  menuItems: tStoreDetailsFile['cmsMenuConfigViewModel'],
  storeId: number,
): Promise<Array<tHeaderSubMenu | null>> => {
  const subMenus: Array<tHeaderSubMenu | null> = [];
  const itemsToFetch = menuItems.map((item) => {
    if (item.type === 'custom') {
      return getCustomContent(item);
    }
    if (item.type === 'dynamic') {
      return getDynamicContent(item, storeId);
    }
    if (item.type === 'none') {
      return getNoneContent(item);
    }
  });
  await Promise.allSettled(itemsToFetch).then((values) => {
    values.map((value) => {
      if (value.status === 'fulfilled') {
        subMenus.push(value?.value || null);
      }
    });
  });

  return subMenus;
};

export async function updateHeaderSubmenu(): Promise<true | Error> {
  const domain = process.env.NEXT_PUBLIC_EXTRACTED_DOMAIN;

  if (!domain) throw new Error('Domain not found');
  const { cmsMenuConfigViewModel, storeId } = await getStaticStoreDetails();

  if (!storeId) throw new Error('StoreId not found');
  if (!cmsMenuConfigViewModel || !cmsMenuConfigViewModel.length)
    throw new Error('cmsMenuConfigViewModel not found');

  try {
    let subMenuItems = {};
    const menuAndItsContent = await decideAPIs(cmsMenuConfigViewModel, storeId);

    cmsMenuConfigViewModel.forEach(
      (menuItem: IHeaderMenuConfig, index: number) =>
        (subMenuItems = {
          ...subMenuItems,
          [menuItem.se_Name]: menuAndItsContent[index],
        }),
    );

    if (Object.keys(subMenuItems).length) {
      await writeFile(
        process.cwd() + '/src/staticData/headerSubMenu.json',
        JSON.stringify(subMenuItems, null, 2),
      );
      return true;
    }

    throw new Error('Error in updating header submenu file');
  } catch (error: any) {
    throw new Error(error?.message || 'Error in updating header submenu');
  }
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

enum Type {
  Dynamic = 'dynamic',
  None = 'none',
  Custom = 'custom',
}
export type tHeaderMainMenu = tStoreDetailsFile['cmsMenuConfigViewModel'][0];
export type tHeaderSubMenu =
  | DynamicSubMenuContent
  | NoneSubMenuContent
  | CustomSubMenuContent;
export type tHeaderSubMenus = Record<
  string,
  DynamicSubMenuContent | CustomSubMenuContent | NoneSubMenuContent
>;

export interface DynamicSubMenuContent {
  topicId: number;
  title: string;
  customCollectionUrl: string;
  seName: string;
  items: Array<{
    id: number;
    categoryName: string;
    seName: string;
    customSEName: string;
    displayOrder: number;
    isPopular: boolean;
    categoryCustomFields: any[];
    categoryImagePath: string;
    altTag: string;
    titleTag: string;
  }>;
  type: Type.Dynamic;
}

export interface NoneSubMenuContent {
  title: string;
  customCollectionUrl: string;
  seName: string;
  items: null;
  topicId: number;
  type: Type.None;
}

export interface CustomSubMenuContent {
  title: string;
  customCollectionUrl: string;
  seName: string;
  items: string;
  topicId: number;
  type: Type.Custom;
}
