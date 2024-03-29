import { SendAsync } from '@/shared/utils/axios';

export type DeleteCartItemResponse = {
  success: boolean;
  data: Object;
  otherData: null;
  errors: Object;
};

export const deleteCartItem = async (
  cartItemId: number,
): Promise<DeleteCartItemResponse['data']> => {
  const url = `/Store/RemoveRegisterCart/${cartItemId}.json`;
  const res = await SendAsync<DeleteCartItemResponse['data']>({
    url: url,
    method: 'GET',
  });
  return res;
};
