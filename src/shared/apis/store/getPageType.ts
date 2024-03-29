import { SendAsync } from '@/shared/utils/axios';

export const getPageType = async (storeId: number, slug: string) => {
  try {
    const payload = {
      storeId: storeId,
      slug: slug,
    };
    const url = `/CmsTopicsPublish/getpagetypebyslug.json`;
    const res = await SendAsync<any>({
      url,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error) {
    return null;
  }
};
