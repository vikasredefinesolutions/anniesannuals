import { SendAsync } from '@/shared/utils/axios';

export const updateCartByNewUserId = async (
  oldCustomerId: number,
  newCustomerId: number,
) => {
  const url = `/Store/MoveRegisterCart/${newCustomerId}/${oldCustomerId}.json`;
  const res = await SendAsync({
    url: url,
    method: 'GET',
  });
  return res;
};
