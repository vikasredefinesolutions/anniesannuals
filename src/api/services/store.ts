import { apiRoutes } from '../apiRoutes';
import axiosClient from '../axiosClient/axiosClient';

export const getMergedStoreDetails = async (payload: { url: string }) => {
  try {
    const response = await axiosClient.post(
      apiRoutes.mergedStoreDetails,
      payload,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGardenSlideshow = async (payload: { storeId: number }) => {
  try {
    const url = `${apiRoutes.gardenSlideshow}/${payload.storeId}.json`;
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
