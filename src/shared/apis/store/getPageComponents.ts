import { SendAsync } from '@/shared/utils/axios';

export const getPageComponents = async (pageId: number, type: string) => {
  try {
    const payload = {
      pageId: pageId,
      type: type,
    };
    const url = `/CmsComponents/getpagecomponents.json`;
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
