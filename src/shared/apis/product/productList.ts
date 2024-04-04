import { IProductListResponse } from '@/app/[...slug]/slug.helper';
import { SendAsync } from '@/shared/utils/axios';

export enum SORT {
  lowPrice = 1,
  highPrice = 2,
  AtoZ = 3,
  ZtoA = 4,
  highlyRated = 5,
  lowRated = 6,
  popular = 0,
}

interface IProductListPayload {
  storeID: number;
  categoryIds?: number[];
  customerId: number;
  pageStartindex: number;
  pageEndindex: number;
  filterOptionforfaceteds: {
    name: string;
    value: string[];
  }[];
  sortby: SORT;
}

interface Product {
  id: string;
  name: string;
  msrp: number;
  getProductImageOptionList: {
    imageName: string;
  }[];
  productRatingAverage: number;
  productReviewsCount: number;
  iswishlist: boolean;
  productTagViewModel: {};
}

export type ICategoriesByid = {
  id: number;
  name: string;
  sename: string;
}[];

export const fetchProductList = async (payload: IProductListPayload) => {
  try {
    const url = `/StoreProductFilter/GetFilterByCategoryByCatcheFilter.json`;
    const productList = await SendAsync<IProductListResponse>({
      url,
      method: 'POST',
      data: payload,
    });

    return productList;
  } catch (error) {
    console.log(error, 'error');
  }
};

interface IProductListGlobalSearchPayload {
  storeID: number;
  customerId: number;
  pageStartindex: number;
  pageEndindex: number;
  filterOptionforfaceteds: { name: string; value: string[] }[];
  sortby: SORT;
  searchText: string;
}

export const fetchProductLishWithGlobalSearch = async (
  payload: IProductListGlobalSearchPayload,
) => {
  try {
    const url = `/StoreProductFilter/GetFilterByGlobalSearchByCatcheFilter.json`;
    const productList = await SendAsync<IProductListResponse>({
      url,
      method: 'POST',
      data: payload,
    });

    return productList;
  } catch (error) {
    console.log(error, 'error');
  }
};

export const fetchProductListForPlantFinder = async (
  payload: IProductListPayload,
) => {
  try {
    const url = `/StoreProductFilter/GetFilterByCategoryByCatcheFilterAll.json`;
    const productList = await SendAsync<IProductListResponse>({
      url,
      method: 'POST',
      data: payload,
    });
    return productList;
  } catch (error) {
    console.log(error, 'error');
  }
};

export const fetchCategoryByCategoryId = async (
  catId: number,
  storeId: number,
): Promise<ICategoriesByid> => {
  const url = `/Category/getcategorypathbycategoryid/${storeId}/${catId}.json`;
  const res = await SendAsync<ICategoriesByid>({
    url,
    method: 'GET',
  });

  return res;
};

export const FetchCategoryByproductId = async (
  productId: number,
  storeId: number | null,
): Promise<ICategoriesByid> => {
  const url = `/Category/getcategorysbyproductid/${storeId}/${productId}.json`;
  const res = await SendAsync<ICategoriesByid>({
    url,
    method: 'GET',
  });
  return res;
};
