import { SendAsync } from '@/shared/utils/axios';

export const confirmReturn = async (payload: any) => {
  const url = `/Order/confirmreturn.json`;

  let requestPayload = {
    returnConfirmModel: payload,
  };

  const res = await SendAsync<any>({
    url: url,
    method: 'POST',
    data: requestPayload,
  });
  return res;
};
