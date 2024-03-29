// import { CallAPI } from '@helpers/common.helper';

import { SendAsync } from '@/shared/utils/axios';

export type _CacheAPIs = 'ClearCategoryCache' | 'ClearBrandCache';

export interface _CacheApiServices {
  service: 'cacheAPIs';
  api: _CacheAPIs;
}

export const ClearBrandCache = async (params: {
  storeid: number;
  brandid: number | null;
}): Promise<boolean | null> => {
  const url = `Brand/clearbrandcatch/${params.storeid}/${params.brandid}.json`;

  const response = await SendAsync<boolean>({
    url: url,
    method: 'GET',
  });

  return response;
};

export const ClearCategoryCache = async (params: {
  storeid: number;
  categoryid: number | null;
}): Promise<boolean | null> => {
  const url = `Category/clearcategorycatch/${params.storeid}/${params.categoryid}.json`;

  const response = await SendAsync<boolean>({
    url: url,
    method: 'GET',
  });

  return response;
};
