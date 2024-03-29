import axiosClient from '@/api/axiosClient/axiosClient';
import { apiRoutes } from '../apiRoutes';

export const fetchCategoryList = async () => {
  try{
    const response = await axiosClient.get(
      apiRoutes.fetchCategoryList,
    );
    return response.data;
  } catch (error) {
    throw error
  }
}