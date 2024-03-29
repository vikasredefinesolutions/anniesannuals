import { apiRoutes } from '@/api/apiRoutes';
import axiosClient from '@/api/axiosClient/axiosClient';

export const getSubscribeDetailsForAlertCommunications = async (payload: {
  customerId: number;
  storeId: number;
}) => {
  try {
    const url = `${apiRoutes.getSubscribedetailsByCustomerId}/${payload.customerId}/${payload.storeId}.json`;
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
