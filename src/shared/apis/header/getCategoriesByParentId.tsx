import { SendAsync } from '@/shared/utils/axios';

export const fetchCategoriesById = async (
  topicId: number,
  storeId: number,
): Promise<iCategoriesById[]> => {
  const response = await SendAsync<iCategoriesById[]>({
    url: `Category/getcategorysbyparentid/${topicId}/${storeId}.json`,
    method: 'GET',
  });

  return response;
};

interface iCategoriesById {
  id: number;
  categoryName: string;
  seName: string;
  customSEName: string;
  displayOrder: number;
  isPopular: boolean;
  categoryCustomFields: any[];
  categoryImagePath: string;
  altTag: string;
  titleTag: string;
}
