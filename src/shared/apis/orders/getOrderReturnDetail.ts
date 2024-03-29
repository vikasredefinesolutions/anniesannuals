import { SendAsync } from '@/shared/utils/axios';

export const getOrderReturnDetail = async (
  orderNumber: number,
  shoppingCartId: number,
) => {
  const url = `/Order/gerorderreturndetails/${orderNumber}/${shoppingCartId}.json`;

  const res = await SendAsync<any>({
    url: url,
    method: 'GET',
  });
  return res;
};
