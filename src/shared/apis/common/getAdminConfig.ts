import { SendAsync } from '@/shared/utils/axios';

export const getAdminConfig = async (
  storeId: number,
  name: 'GardenId',
): Promise<{ gardenID: number }> => {
  try {
    const payload = {
      storeId,
      name,
    };
    const url = `/AppConfig/getappconfig.json`;
    const res = await SendAsync<{
      gardenID: string;
    }>({
      url,
      method: 'POST',
      data: payload,
    });

    if (!res?.gardenID) throw 'GardenId missing in Admin Configs API.';

    return {
      gardenID: +res.gardenID,
    };
  } catch (error: any) {
    throw error?.message || 'Error fetching Admin configs';
  }
};
