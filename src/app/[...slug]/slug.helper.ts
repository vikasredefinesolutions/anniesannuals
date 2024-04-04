import { readJsonFile } from '@/api/jsonServices/updateStoreDetails';
import { getBannerDetails, getCmsComponents } from '@/api/services/home';
import filteredComponents from '@/components/filteredComponents';
import {
  ICategoriesByid,
  SORT,
  fetchCategoryByCategoryId,
  fetchProductLishWithGlobalSearch,
  fetchProductList,
  fetchProductListForPlantFinder,
} from '@/shared/apis/product/productList';
import { activeStoreName } from '@/shared/configs';
import { IListingProduct } from '@/shared/types/product';
import { getUserId } from '@/shared/utils/cookie.helper';
import { cookies } from 'next/headers';

export interface FilterFacetFieldsValues {
  filterFacetFieldValueId: number;
  filterFacetFieldValue: string;
  imagePath: string;
  productCount: number;
  sename: string;
}

export interface FilterFacetField {
  filterFacetFieldId: number;
  filterFacetFieldName: string;
  sename: string;
  filterFacetFieldsValues: FilterFacetFieldsValues[];
}

export interface IProductListResponse {
  storeCategoryProductCategoryListViewModel: [];
  storeBrandProductBrandViewModel: [];
  storeBrandProductColorViewModels: [];
  storeBrandProductSizeViewModels: [];
  storeBrandProductPriceRangeViewModels: [];
  storeBrandProductGenderViewModels: [];
  storeBrandProductProductTypeViewModels: [];
  storeFilterFacetFieldsViewModel: FilterFacetField[];
  getlAllProductList: IListingProduct[];
  childCategoryViewModels: [];
  categoryCustomFields: [];
  totalrecords: number;
  googleTagManagerResponseCommonData: Record<string, string>;
}

export const getZone = () => {
  const zone = cookies().get('growing_zone');
  if (zone) return JSON.parse(zone.value).zoneName;
  return '';
};

export const extractSlugName = (
  contextParam: string[],
): {
  sename: string;
  otherParams: string[] | null;
} => {
  if (contextParam) {
    let params = contextParam as string[];

    if (params && params.length > 0) {
      const lastElementIndex = params.length - 1;
      const sename = params[lastElementIndex].replace('.html', '');

      if (params.length === 1) {
        return {
          sename: sename,
          otherParams: null,
        };
      }

      return {
        sename: sename,
        otherParams: params,
      };
    }
  }

  return { sename: '/', otherParams: null };
};

export interface iSelectedFilter {
  filterFacetFieldValueId: number;
  filterFacetFieldValue: string;
  imagePath: string | null;
  productCount: number;
  sename: string;
  facetName: string;
  allowToRemoveFromChip: boolean;
}

// export const oldFormatFilter = (
//   checkedFilters: FilterFacetFieldsValues[],
//   productListResponse: IProductListResponse,
// ) => {
//   let selectedFilter: FilterFacetFieldsValues[] = [];

//   for (let element of checkedFilters) {
//     let filterFieldName = element?.name?.toLowerCase();
//     let filterType = productListResponse?.storeFilterFacetFieldsViewModel.find(
//       (e) => e?.sename?.toLowerCase() === filterFieldName,
//     );
//     let selected = filterType?.filterFacetFieldsValues
//       ?.filter((e) => e.sename === element.value)
//       .map((e) => {
//         return { ...e, name: element.name };
//       });
//     if (selected && selected?.length > 0) {
//       selectedFilter.push(...selected);
//     }
//   }

//   return selectedFilter;
// };

export const serveDataFromStaticFile = async (mainSlug: string) => {
  const filePath =
    process.cwd() + `/src/${activeStoreName}/cmsData/${mainSlug}.json`;

  const jsonFileData = await readJsonFile(filePath);
  if (!jsonFileData.data?.htmlContent) {
    return {
      exist: false,
      html: null,
    };
  }

  return {
    exist: jsonFileData.success,
    components: jsonFileData.data?.htmlContent,
  };
};

export const breadCrumbsData = (categories: ICategoriesByid | null) => {
  let breadCrumbs = [];
  if (categories && categories.length > 0) {
    breadCrumbs.push({ name: 'Home', url: '/' });
    const _categories = categories[0];
    const catNames = _categories.name.split(' > ');
    const catSeNames = _categories.sename.split(' > ');
    catNames.forEach((cate: string, index: number) => {
      breadCrumbs.push({
        name: cate,
        url: catSeNames[index].trim().includes('search/result')
          ? `/${catSeNames[index].trim()}`
          : `/${catSeNames[index].trim()}.html`,
      });
    });
  }
  return breadCrumbs;
};

export const cmsBreadCrumbsArray = (pageMetaData: any) => {
  const showBreadcrumb: string = pageMetaData?.isbreadcrumbShow;

  if (showBreadcrumb && showBreadcrumb?.toLocaleUpperCase() == 'Y') {
    return [
      { name: 'Home', url: '/' },
      {
        name: pageMetaData.name || '',
        url: `/${pageMetaData.slug}.html`,
      },
    ];
  }

  return [];
};

export const fetchCMSComponents = async (id: number, callThisAPI: boolean) => {
  if (!callThisAPI) return null;

  const components = await getCmsComponents({
    id: id,
  });

  return filteredComponents({
    visibleComponents: components,
  });
};

export interface FilterOption {
  name: string;
  value: string[];
}

const addCookieZoneConditionally = (
  ignoreZone: boolean,
): [{ name: 'zone'; value: string[] }] | [] => {
  if (ignoreZone) return [];
  const zone = getZone();

  return [
    {
      name: 'zone',
      value: [zone],
    },
  ];
};

const getProducts = async ({
  storeId,
  pageId,
  startIndex,
  endIndex,
  filterFacets,
  sortBy,
  searchText,
  plantFinder,
}: {
  storeId: number;
  pageId: number;
  pageType: string;
  filterFacets: any;
  startIndex: number;
  endIndex: number;
  sortBy: SORT;
  searchText: string | undefined;
  pageSeName: string;
  plantFinder: boolean;
}) => {
  if (searchText) {
    return await fetchProductLishWithGlobalSearch({
      storeID: storeId,
      customerId: getUserId(),
      pageStartindex: startIndex,
      pageEndindex: endIndex,
      filterOptionforfaceteds: filterFacets,
      sortby: sortBy,
      searchText: searchText,
    });
  }

  if (plantFinder) {
    return await fetchProductListForPlantFinder({
      storeID: storeId,
      categoryIds: [0],
      customerId: getUserId(),
      pageStartindex: startIndex,
      pageEndindex: endIndex,
      filterOptionforfaceteds: filterFacets,
      sortby: sortBy,
    });
  }
  return await fetchProductList({
    storeID: storeId,
    categoryIds: [pageId],
    customerId: getUserId(),
    pageStartindex: startIndex,
    pageEndindex: endIndex,
    filterOptionforfaceteds: filterFacets,
    sortby: sortBy,
  });
};

export const productListingPromise = async ({
  storeId,
  pageId,
  filterFacets,
  startIndex,
  endIndex,
  pageType,
  pageSeName,
  sortBy,
  searchText,
  plantFinder,
}: {
  storeId: number;
  pageId: number;
  pageType: string;
  filterFacets: any;
  startIndex: number;
  endIndex: number;
  sortBy: SORT;
  pageSeName: string;
  searchText: string | undefined;
  plantFinder: boolean;
}) => {
  let productListResponse: IProductListResponse | null = null;
  let categories: ICategoriesByid | null = null;
  let bannerData: any = null;
  let cmsData: any = null;

  return await Promise.allSettled([
    getProducts({
      storeId: storeId,
      pageId: pageId,
      startIndex: startIndex,
      endIndex: endIndex,
      filterFacets: filterFacets,
      sortBy: sortBy,
      searchText: searchText,
      pageSeName: pageSeName,
      pageType: pageType,
      plantFinder: plantFinder,
    }),
    fetchCategoryByCategoryId(pageId, storeId),
    fetchCMSComponents(pageId, pageType === 'Category'),
    getBannerDetails({
      id: storeId,
      sename: pageSeName,
    }),
  ]).then((values) => {
    if (values[0].status === 'fulfilled') {
      productListResponse = values[0].value || null;
    }

    if (values[1].status === 'fulfilled') {
      categories = values[1].value;
    }

    if (values[2].status === 'fulfilled') {
      cmsData = values[2].value;
    }

    if (values[3].status === 'fulfilled') {
      bannerData = values[3].value;
    }

    return {
      productListResponse,
      categories,
      cmsData,
      bannerData,
    };
  });
};
