import { SendAsync } from '@/shared/utils/axios';

export const cancelOrderByOrderNumber = async (orderNumber: number) => {
  const url = `/Order/updatecancelorderstatus.json`;

  let payload = {
    orderId: orderNumber,
    isCancelStatus: true,
    ipAddress: '192.168.1.1',
    macAddress: '00-00-00-00-00-00',
    location: 't',
  };

  const res = await SendAsync<string>({
    url: url,
    method: 'POST',
    data: payload,
  });
  return res;
};
