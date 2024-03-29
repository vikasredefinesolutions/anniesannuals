import { SendAsync } from '@/shared/utils/axios';

export const cancelOrderItems = async (cartIds: number[]) => {
  const url = `/Order/cancelorderedshoppingcartitems.json`;

  let payload = {
    orderedShoppingCartItemsId: cartIds,
    isItemCancel: true,
    ipAddress: '192.168.1.1',
    macAddress: '00-00-00-00-00-00',
    location: '',
  };

  const res = await SendAsync<string>({
    url: url,
    method: 'POST',
    data: payload,
  });
  return res;
};
