import axiosClient from '@/api/axiosClient/axiosClient';
import { apiRoutes } from '../apiRoutes';

export interface _Brand {
  catalogdetails: any;
  id: number;
  brandName: string;
  seName: string;
  brandColorImageUrl: string;
  brandCollectionUrl: string;
  brandBlackColorImageUrl: string;
  isBrandOnline: boolean;
}

export interface _t_Brands {
  dataType: 'BRANDS';
  brands: _Brand[] | null;
}
export interface _GetPageType {
  id: number;
  name: string;
  type:
    | 'SearchPage'
    | 'Topic'
    | 'Category'
    | 'Product'
    | 'ShopByGarden'
    | '301'
    | 'NewsLetter';
  meta_Title: string;
  meta_Description: string;
  meta_Keywords: string;
  storeId: number;
  slug: string;
  description: null;
  isbreadcrumbShow: null;
  openGraphImagePath: string;
  openGraphTitle: string;
  openGraphDescription: string;
  facebookImagePath: string;
  facebookOpenGraphTitle: string;
  facebookOpenGraphDescription: string;
  twitterImagePath: string;
  twitterOpenGraphTitle: string;
  twitterOpenGraphDescription: string;
  linkedinImagePath: string;
  linkedinOpenGraphTitle: string;
  linkedinOpenGraphDescription: string;
  pinterestImagePath: string;
  pinterestOpenGraphTitle: string;
  pinterestOpenGraphDescription: string;
  customCollectionUrl: string;
  landingPage: string;
  facetFilterUrl: string;
}

export interface _fetchPageTypePayload {
  storeId: number;
  slug: string;
}

export const fetchPageType = async (
  payload: _fetchPageTypePayload,
): Promise<_GetPageType> => {
  try {
    const response = await axiosClient.post(
      apiRoutes.fetchPageMetadata,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPageComponents = async (payload: any) => {
  try {
    const response = await axiosClient.post(
      apiRoutes.fetchPageComponents,
      payload,
    );

    if (!response.data?.length)
      throw new Error(`No components found for Topic: ${payload?.id}`);

    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.message || 'Facing issue while fetching page components.',
    );
  }
};

export const getCmsComponents = async (payload: { id: Number }) => {
  try {
    const url = `${apiRoutes.fetchCmsComponents}/${payload.id}.json`;
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBannerDetails = async (payload: {
  id: Number;
  sename: string;
}) => {
  try {
    const url = `${apiRoutes.fetchBannerDetails}?isbrand=false&storeid=${payload.id}&sename=${payload.sename}`;
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getShopByType = async (payload: any) => {
  try {
    const response = await axiosClient.post(apiRoutes.shopByType, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNewCrops = async (payload: {
  storeId: number;
  countForFetchItems: number;
  customerId: number;
}) => {
  try {
    const url = `${apiRoutes.getNewCrops}/${payload.storeId}/${payload.countForFetchItems}/${payload.customerId}.json`;
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFeaturedProductitemsByTagnameandsename = async (
  payload: any,
) => {
  try {
    const response = await axiosClient.post(
      apiRoutes.getFeaturedProductitemsByTagnameandsename,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNewsletterArchive = async (payload: { storeId: number }) => {
  try {
    const url = `${apiRoutes.getNewsletterArchive}/${payload.storeId}.json`;
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getNewsLetterDetails = async (payload: {
  id: number;
  storeId: number;
}) => {
  try {
    const url = `${apiRoutes.getNewsLetterDetails}/${payload.id}/${payload.storeId}.json`;
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTestimonialByStoreid = async (payload: { storeId: number }) => {
  try {
    const url = `${apiRoutes.getTestimonialByStoreid}/${payload.storeId}.json`;
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllBrands = async ({
  storeId,
}: {
  storeId: number;
}): Promise<_t_Brands | null> => {
  try {
    const url = `${apiRoutes.fetchAllBrands}/${storeId}.json`;
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UploadImage = async ({
  folderPath,
  files,
}: {
  folderPath: string;
  files: File;
}): Promise<string | null> => {
  try {
    const url = `${apiRoutes.uploadImage}?folderPath=${folderPath}`;
    const response = await axiosClient.post(url, files);
    return response.data;
  } catch (error) {
    throw error;
  }
};
